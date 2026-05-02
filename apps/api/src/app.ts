import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Middleware
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { generalRateLimiter } from './middleware/rate-limit.middleware';

// Routes
import authRoutes from './routes/auth.routes';
import consultationRoutes from './routes/consultation.routes';
import patientRoutes from './routes/patient.routes';
import reviewRoutes from './routes/review.routes';

// WebSocket
import { initializeWebSocket } from './websocket/server';

// Logger
import logger from './config/logger';

export function createApp(): { app: Application; httpServer: any; io: SocketIOServer } {
  const app = express();
  const httpServer = createServer(app);

  // Initialize Socket.IO
  const io = initializeWebSocket(httpServer);

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
  app.use(generalRateLimiter);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/consultations', consultationRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/review', reviewRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Route not found',
    });
  });

  // Error handling middleware (must be last)
  app.use(errorHandler);

  // Graceful shutdown
  const gracefulShutdown = async () => {
    logger.info('Received shutdown signal, closing server gracefully...');

    httpServer.close(() => {
      logger.info('HTTP server closed');
    });

    io.close(() => {
      logger.info('WebSocket server closed');
    });

    // Close database connections
    const { prisma } = await import('@afiyapulse/database');
    await prisma.$disconnect();
    logger.info('Database connections closed');

    // Close Redis connection
    const { redisClient } = await import('./config/redis');
    await redisClient.quit();
    logger.info('Redis connection closed');

    process.exit(0);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);

  return { app, httpServer, io };
}

export default createApp;

// Made with Bob
