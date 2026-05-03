import { AuthService } from '../auth.service';
import { prisma } from '@afiyapulse/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import redisClient from '../../config/redis';

// Mock dependencies
jest.mock('@afiyapulse/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../config/redis', () => ({
  get: jest.fn(),
  setEx: jest.fn(),
  del: jest.fn(),
}));

// Test Helpers
const createMockUser = (overrides: Partial<any> = {}) => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'DOCTOR',
  passwordHash: 'hashedPassword',
  isActive: true,
  specialty: null,
  licenseNumber: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const MOCK_JWT_PAYLOAD = {
  id: '1',
  email: 'test@example.com',
  role: 'DOCTOR',
};

// Mock Setup Helpers
const mockPrismaUserFindUnique = (value: any) =>
  (prisma.user.findUnique as jest.Mock).mockResolvedValue(value);

const mockPrismaUserCreate = (value: any) =>
  (prisma.user.create as jest.Mock).mockResolvedValue(value);

const mockPrismaUserUpdate = (value: any) =>
  (prisma.user.update as jest.Mock).mockResolvedValue(value);

const mockBcryptHash = (value: string) =>
  (bcrypt.hash as jest.Mock).mockResolvedValue(value);

const mockBcryptCompare = (result: boolean) =>
  (bcrypt.compare as jest.Mock).mockResolvedValue(result);

const mockJwtSign = (token: string) =>
  (jwt.sign as jest.Mock).mockReturnValue(token);

const mockJwtVerify = (payload: any) =>
  (jwt.verify as jest.Mock).mockReturnValue(payload);

const mockJwtVerifyError = (errorName = 'JsonWebTokenError', message = 'Invalid token') => {
  (jwt.verify as jest.Mock).mockImplementation(() => {
    const error: any = new Error(message);
    error.name = errorName;
    throw error;
  });
};

const mockRedisGet = (value: string | null) =>
  (redisClient.get as jest.Mock).mockResolvedValue(value);

const mockRedisSetEx = () =>
  (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

const setupSuccessfulLoginMocks = (user = createMockUser()) => {
  mockPrismaUserFindUnique(user);
  mockBcryptCompare(true);
  mockJwtSign('mock-access-token');
  mockRedisSetEx();
  return user;
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const mockUser = createMockUser();

      mockPrismaUserFindUnique(null);
      mockBcryptHash('hashedPassword');
      mockPrismaUserCreate(mockUser);

      const result = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'DOCTOR',
      });

      expect(result.email).toBe('test@example.com');
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      const existingUser = createMockUser();
      mockPrismaUserFindUnique(existingUser);

      await expect(
        authService.register({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          role: 'DOCTOR',
        })
      ).rejects.toThrow('User with this email already exists');
    });

    it('should throw error if license number already in use', async () => {
      mockPrismaUserFindUnique(null);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(createMockUser({ licenseNumber: 'LIC123' }));

      await expect(
        authService.register({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          role: 'DOCTOR',
          licenseNumber: 'LIC123',
        })
      ).rejects.toThrow('License number already in use');
    });
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const mockUser = createMockUser();
      setupSuccessfulLoginMocks(mockUser);

      const result = await authService.login('test@example.com', 'password123');

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(redisClient.setEx).toHaveBeenCalled();
    });

    describe('error cases', () => {
      it('should throw error with invalid email', async () => {
        mockPrismaUserFindUnique(null);

        await expect(
          authService.login('nonexistent@example.com', 'password123')
        ).rejects.toThrow('Invalid email or password');
      });

      it('should throw error with invalid password', async () => {
        const mockUser = createMockUser();
        mockPrismaUserFindUnique(mockUser);
        mockBcryptCompare(false);

        await expect(
          authService.login('test@example.com', 'wrongpassword')
        ).rejects.toThrow('Invalid email or password');
      });

      it('should throw error if account is deactivated', async () => {
        const mockUser = createMockUser({ isActive: false });
        mockPrismaUserFindUnique(mockUser);

        await expect(
          authService.login('test@example.com', 'password123')
        ).rejects.toThrow('Account is deactivated');
      });
    });
  });

  describe('refreshToken', () => {
    it('should successfully refresh access token', async () => {
      const mockUser = createMockUser();

      mockJwtVerify(MOCK_JWT_PAYLOAD);
      mockRedisGet('valid-refresh-token');
      mockPrismaUserFindUnique(mockUser);
      mockJwtSign('new-access-token');
      mockRedisSetEx();

      const result = await authService.refreshToken('valid-refresh-token');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(jwt.verify).toHaveBeenCalledWith('valid-refresh-token', expect.any(String));
      expect(redisClient.get).toHaveBeenCalledWith('refresh_token:1');
    });

    describe('error cases', () => {
      it('should throw error for invalid refresh token', async () => {
        mockJwtVerifyError();

        await expect(
          authService.refreshToken('invalid-refresh-token')
        ).rejects.toThrow('Invalid refresh token');
      });

      it('should throw error if token not found in Redis', async () => {
        mockJwtVerify(MOCK_JWT_PAYLOAD);
        mockRedisGet(null);

        await expect(
          authService.refreshToken('valid-refresh-token')
        ).rejects.toThrow('Invalid refresh token');
      });

      it('should throw error if token mismatch in Redis', async () => {
        mockJwtVerify(MOCK_JWT_PAYLOAD);
        mockRedisGet('different-token');

        await expect(
          authService.refreshToken('valid-refresh-token')
        ).rejects.toThrow('Invalid refresh token');
      });

      it('should throw error if user not found', async () => {
        mockJwtVerify(MOCK_JWT_PAYLOAD);
        mockRedisGet('valid-refresh-token');
        mockPrismaUserFindUnique(null);

        await expect(
          authService.refreshToken('valid-refresh-token')
        ).rejects.toThrow('User not found or inactive');
      });

      it('should throw error if user is inactive', async () => {
        const inactiveUser = createMockUser({ isActive: false });
        mockJwtVerify(MOCK_JWT_PAYLOAD);
        mockRedisGet('valid-refresh-token');
        mockPrismaUserFindUnique(inactiveUser);

        await expect(
          authService.refreshToken('valid-refresh-token')
        ).rejects.toThrow('User not found or inactive');
      });
    });
  });

  describe('logout', () => {
    it('should successfully logout user', async () => {
      (redisClient.del as jest.Mock).mockResolvedValue(1);

      await authService.logout('1');

      expect(redisClient.del).toHaveBeenCalledWith('refresh_token:1');
    });
  });

  describe('validatePassword', () => {
    describe('valid passwords', () => {
      it('should accept strong password', () => {
        const result = authService.validatePassword('StrongP@ss123');

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe('invalid passwords', () => {
      const invalidPasswordCases = [
        ['short', 'Short1!', 'Password must be at least 8 characters long'],
        ['no uppercase', 'weakpass123!', 'Password must contain at least one uppercase letter'],
        ['no lowercase', 'WEAKPASS123!', 'Password must contain at least one lowercase letter'],
        ['no number', 'WeakPass!', 'Password must contain at least one number'],
        ['no special char', 'WeakPass123', 'Password must contain at least one special character'],
      ];

      test.each(invalidPasswordCases)(
        'should reject password with %s',
        (_, password, expectedError) => {
          const result = authService.validatePassword(password);

          expect(result.valid).toBe(false);
          expect(result.errors).toContain(expectedError);
        }
      );
    });
  });
});

// Made with Bob
