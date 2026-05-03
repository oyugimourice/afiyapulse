import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@afiyapulse/database';
import { UserRole } from '@afiyapulse/database';
import { AppError } from '../middleware/error.middleware';
import redisClient from '../config/redis';
import logger from '../config/logger';
import emailService from './email.service';

export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN: string;
  private readonly JWT_REFRESH_EXPIRES_IN: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
    this.JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  }

  /**
   * Register a new user
   */
  async register(data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    specialty?: string;
    licenseNumber?: string;
  }) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Check if license number is already in use (if provided)
    if (data.licenseNumber) {
      const existingLicense = await prisma.user.findUnique({
        where: { licenseNumber: data.licenseNumber },
      });

      if (existingLicense) {
        throw new AppError('License number already in use', 400);
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        role: data.role,
        specialty: data.specialty,
        licenseNumber: data.licenseNumber,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        specialty: true,
        licenseNumber: true,
        createdAt: true,
      },
    });

    logger.info(`New user registered: ${user.email}`);

    // Send welcome email (async, don't wait)
    emailService.sendWelcomeEmail(user.email, {
      name: user.name,
      email: user.email,
    }).catch(error => {
      logger.error('Failed to send welcome email:', error);
    });

    return user;
  }

  /**
   * Login user
   */
  async login(email: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate tokens
    const accessToken = this.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = this.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token in Redis
    await this.storeRefreshToken(user.id, refreshToken);

    logger.info(`User logged in: ${user.email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        specialty: user.specialty,
        licenseNumber: user.licenseNumber,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, this.JWT_SECRET) as {
        id: string;
        email: string;
        role: UserRole;
      };

      // Check if refresh token exists in Redis
      const storedToken = await redisClient.get(`refresh_token:${decoded.id}`);

      if (!storedToken || storedToken !== refreshToken) {
        throw new AppError('Invalid refresh token', 401);
      }

      // Get user
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || !user.isActive) {
        throw new AppError('User not found or inactive', 401);
      }

      // Generate new tokens
      const newAccessToken = this.generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      const newRefreshToken = this.generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Update refresh token in Redis
      await this.storeRefreshToken(user.id, newRefreshToken);

      logger.info(`Token refreshed for user: ${user.email}`);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid refresh token', 401);
      }
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(userId: string) {
    // Remove refresh token from Redis
    await redisClient.del(`refresh_token:${userId}`);
    logger.info(`User logged out: ${userId}`);
  }

  /**
   * Generate access token
   */
  private generateAccessToken(payload: { id: string; email: string; role: UserRole }) {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }

  /**
   * Generate refresh token
   */
  private generateRefreshToken(payload: { id: string; email: string; role: UserRole }) {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_REFRESH_EXPIRES_IN,
    });
  }

  /**
   * Store refresh token in Redis
   */
  private async storeRefreshToken(userId: string, token: string) {
    // Store with 7 days expiration
    await redisClient.setEx(`refresh_token:${userId}`, 7 * 24 * 60 * 60, token);
  }

  /**
   * Verify password strength
   */
  validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export default new AuthService();

// Made with Bob
