import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import logger from '../config/logger';
import { handleConsultationEvents } from './handlers/consultation.handler';
import { handleTranscriptEvents } from './handlers/transcript.handler';
import { handleAgentEvents } from './handlers/agent.handler';

interface AuthenticatedSocket {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const initializeWebSocket = (httpServer: HTTPServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  initializeWebSocketServer(io);
  
  return io;
};

const setupNamespaceAuthentication = (io: SocketIOServer, namespaceName: string) => {
  const namespace = io.of(namespaceName);
  
  // Authentication middleware for namespace
  namespace.use((socket: any, next) => {
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
        role: string;
      };

      socket.user = decoded;
      next();
    } catch (error) {
      logger.error(`WebSocket authentication error in ${namespaceName}:`, error);
      next(new Error('Invalid authentication token'));
    }
  });

  // Connection handler for namespace
  namespace.on('connection', (socket: any) => {
    const authenticatedSocket = socket as typeof socket & AuthenticatedSocket;
    
    logger.info(
      `WebSocket client connected to ${namespaceName}: ${authenticatedSocket.user?.email} (${socket.id})`
    );

    // Join user-specific room
    socket.join(`user:${authenticatedSocket.user.id}`);

    // Register event handlers
    handleConsultationEvents(authenticatedSocket, io);
    handleTranscriptEvents(authenticatedSocket, io);
    handleAgentEvents(authenticatedSocket, io);

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(
        `WebSocket client disconnected from ${namespaceName}: ${authenticatedSocket.user?.email} (${socket.id})`
      );
    });

    // Handle errors
    socket.on('error', (error: Error) => {
      logger.error(
        `WebSocket error in ${namespaceName} for ${authenticatedSocket.user?.email}:`,
        error
      );
    });

    // Send connection confirmation
    socket.emit('connected', {
      userId: authenticatedSocket.user.id,
      timestamp: new Date(),
      namespace: namespaceName,
    });
  });
};

export const initializeWebSocketServer = (io: SocketIOServer) => {
  // Setup default namespace
  setupNamespaceAuthentication(io, '/');
  
  // Setup consultation namespace
  setupNamespaceAuthentication(io, '/consultation');

  logger.info('WebSocket server initialized successfully with namespaces: /, /consultation');
};

// Made with Bob
