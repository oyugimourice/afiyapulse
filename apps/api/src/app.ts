import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createServer, Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Middleware
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { rateLimiter } from './middleware/rate-limit.middleware';

// Routes
import authRoutes from './routes/auth.routes';
import consultationRoutes from './routes/consultation.routes';
import patientRoutes from './routes/patient.routes';
import reviewRoutes from './routes/review.routes';
import healthRoutes from './routes/health.routes';

// WebSocket
import { initializeWebSocket } from './websocket/server';

// Logger
import logger from './config/logger';

/**
 * Configure security and utility middleware
 */
function configureMiddleware(app: Application): void {
  // Security middleware
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    })
  );

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Compression middleware
  app.use(compression());

  // Request logging
  app.use(requestLogger);

  // Rate limiting
  app.use(rateLimiter);
}

/**
 * Configure application routes
 */
function configureRoutes(app: Application): void {
  // Health check routes (no rate limiting for health checks)
  app.use('/', healthRoutes);

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/consultations', consultationRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/review', reviewRoutes);
}

/**
 * Configure error handling middleware
 */
function configureErrorHandling(app: Application): void {
  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Route not found',
    });
  });

  // Error handling middleware (must be last)
  app.use(errorHandler);
}

/**
 * Create graceful shutdown handler with proper async sequencing
 */
function createGracefulShutdown(httpServer: Server, io: SocketIOServer): () => Promise<void> {
  return async (): Promise<void> => {
    logger.info('Received shutdown signal, closing server gracefully...');

    try {
      // Close HTTP server first
      await new Promise<void>((resolve, reject) => {
        httpServer.close((err) => {
          if (err) reject(err);
          else {
            logger.info('HTTP server closed');
            resolve();
          }
        });
      });

      // Close WebSocket server
      await new Promise<void>((resolve) => {
        io.close(() => {
          logger.info('WebSocket server closed');
          resolve();
        });
      });

      // Close database connections
      const { prisma } = await import('@afiyapulse/database');
      await prisma.$disconnect();
      logger.info('Database connections closed');

      // Close Redis connection
      const redisClient = (await import('./config/redis')).default;
      await redisClient.quit();
      logger.info('Redis connection closed');

      process.exit(0);
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  };
}

/**
 * Register shutdown signal handlers
 */
function registerShutdownHandlers(gracefulShutdown: () => Promise<void>): void {
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
}

/**
 * Create and configure Express application with HTTP and WebSocket servers
 */
export function createApp(): { app: Application; httpServer: Server; io: SocketIOServer } {
  const app = express();
  const httpServer = createServer(app);
  const io = initializeWebSocket(httpServer);

  configureMiddleware(app);
  configureRoutes(app);
  configureErrorHandling(app);

  const gracefulShutdown = createGracefulShutdown(httpServer, io);
  registerShutdownHandlers(gracefulShutdown);

  return { app, httpServer, io };
}

export default createApp;

// Made with Bob
