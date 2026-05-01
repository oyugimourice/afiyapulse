import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import logger from '../config/logger';
import { UserRole } from '@afiyapulse/database';

interface AuthenticatedSocket extends SocketIOServer {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export const initializeWebSocketServer = (io: SocketIOServer) => {
  // Authentication middleware
  io.use((socket: any, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return next(new Error('JWT_SECRET not configured'));
      }

      const decoded = jwt.verify(token, jwtSecret) as {
        id: string;
        email: string;
        role: UserRole;
      };

      socket.user = decoded;
      next();
    } catch (error) {
      logger.error('WebSocket authentication error:', error);
      next(new Error('Invalid authentication token'));
    }
  });

  // Connection handler
  io.on('connection', (socket: any) => {
    logger.info(`WebSocket client connected: ${socket.user?.email} (${socket.id})`);

    // Join user-specific room
    socket.join(`user:${socket.user.id}`);

    // Handle consultation events
    socket.on('consultation:start', (data: any) => {
      logger.info(`Consultation started: ${data.consultationId}`);
      socket.join(`consultation:${data.consultationId}`);
      
      // TODO: Implement consultation start logic
      socket.emit('consultation:started', {
        consultationId: data.consultationId,
        timestamp: new Date(),
      });
    });

    socket.on('consultation:stop', (data: any) => {
      logger.info(`Consultation stopped: ${data.consultationId}`);
      
      // TODO: Implement consultation stop logic
      socket.emit('consultation:stopped', {
        consultationId: data.consultationId,
        timestamp: new Date(),
      });

      socket.leave(`consultation:${data.consultationId}`);
    });

    // Handle transcript events
    socket.on('transcript:update', (data: any) => {
      // TODO: Implement transcript update logic
      io.to(`consultation:${data.consultationId}`).emit('transcript:updated', data);
    });

    // Handle agent events
    socket.on('agent:status', (data: any) => {
      // TODO: Implement agent status logic
      io.to(`consultation:${data.consultationId}`).emit('agent:status:updated', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`WebSocket client disconnected: ${socket.user?.email} (${socket.id})`);
    });

    // Handle errors
    socket.on('error', (error: Error) => {
      logger.error(`WebSocket error for ${socket.user?.email}:`, error);
    });
  });

  logger.info('WebSocket server initialized successfully');
};

// Made with Bob
