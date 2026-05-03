import './config/env';
import logger from './config/logger';

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    const { createApp } = await import('./app');

    // Create Express app with HTTP and WebSocket servers
    const { app, httpServer, io } = createApp();

    // Start server
    httpServer.listen(PORT, () => {
      logger.info(`🚀 AfiyaPulse API Server started on port ${PORT}`);
      logger.info(`📡 WebSocket server ready`);
      logger.info(`🏥 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // Close server & exit process
      httpServer.close(() => process.exit(1));
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      // Close server & exit process
      httpServer.close(() => process.exit(1));
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Made with Bob
