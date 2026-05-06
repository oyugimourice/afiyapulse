import request from 'supertest';
import { createApp } from '../../app';
import { prisma } from '@afiyapulse/database';
import redisClient from '../../config/redis';
import bcrypt from 'bcryptjs';

describe('Auth Routes Integration Tests', () => {
  let app: any;
  let httpServer: any;

  beforeAll(async () => {
    const appInstance = createApp();
    app = appInstance.app;
    httpServer = appInstance.httpServer;
  });

  afterAll(async () => {
    // Cleanup test users
    await prisma.user.deleteMany({
      where: { email: { contains: 'auth.test' } },
    });
    await prisma.$disconnect();
    await redisClient.quit();
    httpServer.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new doctor', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'auth.test.doctor1@afiyapulse.com',
          password: 'SecurePass123!',
          name: 'Auth Test Doctor',
          role: 'DOCTOR',
          specialty: 'General Practice',
          licenseNumber: 'AUTH-TEST-001',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('auth.test.doctor1@afiyapulse.com');
      expect(response.body.user.role).toBe('DOCTOR');
      expect(response.body).not.toHaveProperty('passwordHash');
    });

    it('should register a new admin', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'auth.test.admin@afiyapulse.com',
          password: 'AdminPass123!',
          name: 'Auth Test Admin',
          role: 'ADMIN',
        });

      expect(response.status).toBe(201);
      expect(response.body.user.role).toBe('ADMIN');
    });

    it('should reject registration with weak password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'auth.test.weak@afiyapulse.com',
          password: 'weak',
          name: 'Test User',
          role: 'DOCTOR',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should reject duplicate email registration', async () => {
      const email = 'auth.test.duplicate@afiyapulse.com';
      
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send({
          email,
          password: 'SecurePass123!',
          name: 'First User',
          role: 'DOCTOR',
        });

      // Duplicate registration
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email,
          password: 'SecurePass123!',
          name: 'Second User',
          role: 'DOCTOR',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('already exists');
    });

    it('should reject invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'SecurePass123!',
          name: 'Test User',
          role: 'DOCTOR',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    const testEmail = 'auth.test.login@afiyapulse.com';
    const testPassword = 'LoginPass123!';

    beforeAll(async () => {
      // Create test user
      const passwordHash = await bcrypt.hash(testPassword, 10);
      await prisma.user.create({
        data: {
          email: testEmail,
          name: 'Login Test User',
          passwordHash,
          role: 'DOCTOR',
          isActive: true,
        },
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: testPassword,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(response.body.user.email).toBe(testEmail);
    });

    it('should reject login with invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@afiyapulse.com',
          password: testPassword,
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid');
    });

    it('should reject login with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: 'WrongPassword123!',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid');
    });

    it('should reject login for inactive account', async () => {
      const inactiveEmail = 'auth.test.inactive@afiyapulse.com';
      const passwordHash = await bcrypt.hash('Password123!', 10);
      
      await prisma.user.create({
        data: {
          email: inactiveEmail,
          name: 'Inactive User',
          passwordHash,
          role: 'DOCTOR',
          isActive: false,
        },
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: inactiveEmail,
          password: 'Password123!',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('deactivated');
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken: string;

    beforeAll(async () => {
      // Login to get refresh token
      const passwordHash = await bcrypt.hash('RefreshPass123!', 10);
      await prisma.user.create({
        data: {
          email: 'auth.test.refresh@afiyapulse.com',
          name: 'Refresh Test User',
          passwordHash,
          role: 'DOCTOR',
          isActive: true,
        },
      });

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'auth.test.refresh@afiyapulse.com',
          password: 'RefreshPass123!',
        });

      refreshToken = loginResponse.body.refreshToken;
    });

    it('should refresh access token with valid refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({
          refreshToken,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });

    it('should reject invalid refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({
          refreshToken: 'invalid-token',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/auth/logout', () => {
    let authToken: string;

    beforeAll(async () => {
      const passwordHash = await bcrypt.hash('LogoutPass123!', 10);
      await prisma.user.create({
        data: {
          email: 'auth.test.logout@afiyapulse.com',
          name: 'Logout Test User',
          passwordHash,
          role: 'DOCTOR',
          isActive: true,
        },
      });

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'auth.test.logout@afiyapulse.com',
          password: 'LogoutPass123!',
        });

      authToken = loginResponse.body.accessToken;
    });

    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });

    it('should reject logout without authentication', async () => {
      const response = await request(app)
        .post('/api/auth/logout');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/auth/me', () => {
    let authToken: string;
    let userId: string;

    beforeAll(async () => {
      const passwordHash = await bcrypt.hash('MePass123!', 10);
      const user = await prisma.user.create({
        data: {
          email: 'auth.test.me@afiyapulse.com',
          name: 'Me Test User',
          passwordHash,
          role: 'DOCTOR',
          isActive: true,
        },
      });
      userId = user.id;

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'auth.test.me@afiyapulse.com',
          password: 'MePass123!',
        });

      authToken = loginResponse.body.accessToken;
    });

    it('should get current user profile', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(userId);
      expect(response.body.email).toBe('auth.test.me@afiyapulse.com');
      expect(response.body).not.toHaveProperty('passwordHash');
    });

    it('should reject without authentication', async () => {
      const response = await request(app)
        .get('/api/auth/me');

      expect(response.status).toBe(401);
    });
  });
});

// 