import request from 'supertest';
import { createApp } from '../../app';
import { prisma } from '@afiyapulse/database';
import redisClient from '../../config/redis';

describe('Health Routes', () => {
  let app: any;
  let httpServer: any;

  beforeAll(() => {
    const appInstance = createApp();
    app = appInstance.app;
    httpServer = appInstance.httpServer;
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await redisClient.quit();
    httpServer.close();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('checks');
      expect(response.body.checks).toHaveProperty('database');
      expect(response.body.checks).toHaveProperty('redis');
    });

    it('should include response time', async () => {
      const response = await request(app).get('/health');

      expect(response.body).toHaveProperty('responseTime');
      expect(typeof response.body.responseTime).toBe('number');
      expect(response.body.responseTime).toBeGreaterThan(0);
    });
  });

  describe('GET /ready', () => {
    it('should return readiness status', async () => {
      const response = await request(app).get('/ready');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('ready');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /live', () => {
    it('should return liveness status', async () => {
      const response = await request(app).get('/live');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('alive');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /metrics', () => {
    it('should return application metrics', async () => {
      const response = await request(app).get('/metrics');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('cpu');
      expect(response.body.memory).toHaveProperty('rss');
      expect(response.body.memory).toHaveProperty('heapTotal');
      expect(response.body.memory).toHaveProperty('heapUsed');
    });

    it('should include database stats', async () => {
      const response = await request(app).get('/metrics');

      expect(response.body).toHaveProperty('database');
    });

    it('should include redis stats', async () => {
      const response = await request(app).get('/metrics');

      expect(response.body).toHaveProperty('redis');
    });
  });
});

// Made with Bob