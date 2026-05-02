import { Router } from 'express';
import { z } from 'zod';
import authService from '../services/auth.service';
import { authRateLimiter } from '../middleware/rate-limit.middleware';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { AppError } from '../middleware/error.middleware';

const router = Router();

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['DOCTOR', 'NURSE', 'ADMIN']),
  specialty: z.string().optional(),
  licenseNumber: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', authRateLimiter, async (req, res, next) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      throw new AppError(validation.error.errors[0]?.message || 'Invalid input', 400);
    }

    const user = await authService.register({
      email: validation.data.email,
      password: validation.data.password,
      name: validation.data.name,
      role: validation.data.role,
      specialty: validation.data.specialty,
      licenseNumber: validation.data.licenseNumber,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', authRateLimiter, async (req, res, next) => {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      throw new AppError(validation.error.errors[0]?.message || 'Invalid input', 400);
    }

    const result = await authService.login(validation.data.email, validation.data.password);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', async (req, res, next) => {
  try {
    const validation = refreshTokenSchema.safeParse(req.body);

    if (!validation.success) {
      throw new AppError(validation.error.errors[0]?.message || 'Invalid input', 400);
    }

    const tokens = await authService.refreshToken(validation.data.refreshToken);

    res.json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticate, async (req: AuthRequest, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    await authService.logout(req.user.id);

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get authenticated user info
 * @access  Private
 */
router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    res.json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
