import { Router, Request, Response } from 'express';
import { prisma } from '@afiyapulse/database';
import redisClient from '../config/redis';
import logger from '../config/logger';

const router = Router();

/**
 * Health check endpoint
 * Returns the health status of the application and its dependencies
 */
router.get('/health', async (req: Request, res: Response) => {
  const startTime = Date.now();
  
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: 'unknown',
      redis: 'unknown',
    },
    responseTime: 0,
  };

  try {
    // Check database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      health.checks.database = 'connected';
    } catch (error) {
      health.checks.database = 'disconnected';
      health.status = 'unhealthy';
      logger.error('Database health check failed:', error);
    }

    // Check Redis connection
    try {
      await redisClient.ping();
      health.checks.redis = 'connected';
    } catch (error) {
      health.checks.redis = 'disconnected';
      health.status = 'degraded';
      logger.error('Redis health check failed:', error);
    }

    health.responseTime = Date.now() - startTime;

    // Return appropriate status code
    const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503;
    
    res.status(statusCode).json(health);
  } catch (error) {
    logger.error('Health check error:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    });
  }
});

/**
 * Readiness probe endpoint
 * Returns 200 if the application is ready to accept traffic
 */
router.get('/ready', async (req: Request, res: Response) => {
  try {
    // Check if database is accessible
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'ready',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Readiness check failed:', error);
    res.status(503).json({
      status: 'not ready',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * Liveness probe endpoint
 * Returns 200 if the application is alive
 */
router.get('/live', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * Metrics endpoint (basic)
 * Returns basic application metrics
 */
router.get('/metrics', async (req: Request, res: Response) => {
  try {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    // Get database connection pool stats (if available)
    let dbStats = {};
    try {
      const result = await prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count FROM "User"
      `;
      dbStats = {
        totalUsers: Number(result[0]?.count || 0),
      };
    } catch (error) {
      logger.error('Failed to get database stats:', error);
    }

    // Get Redis stats
    let redisStats = {};
    try {
      const info = await redisClient.info();
      const lines = info.split('\r\n');
      const usedMemory = lines.find(line => line.startsWith('used_memory:'));
      const connectedClients = lines.find(line => line.startsWith('connected_clients:'));
      
      redisStats = {
        usedMemory: usedMemory?.split(':')[1] || 'unknown',
        connectedClients: connectedClients?.split(':')[1] || 'unknown',
      };
    } catch (error) {
      logger.error('Failed to get Redis stats:', error);
    }

    res.status(200).json({
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
      },
      cpu: {
        user: `${(cpuUsage.user / 1000000).toFixed(2)} seconds`,
        system: `${(cpuUsage.system / 1000000).toFixed(2)} seconds`,
      },
      database: dbStats,
      redis: redisStats,
    });
  } catch (error) {
    logger.error('Metrics endpoint error:', error);
    res.status(500).json({
      error: 'Failed to retrieve metrics',
    });
  }
});

export default router;

// Made with Bob