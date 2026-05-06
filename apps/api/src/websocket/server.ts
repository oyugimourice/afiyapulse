import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import logger from '../config/logger';
import { handleConsultationEvents } from './handlers/consultation.handler';
import { handleTranscriptEvents } from './handlers/transcript.handler';
import { handleAgentEvents } from './handlers/agent.handler';

// WebSocket server configuration constants
const WS_PING_TIMEOUT_MS = 60000; // 60 seconds - time to wait for pong response before closing connection
const WS_PING_INTERVAL_MS = 25000; // 25 seconds - interval between ping packets
const MAX_CONNECTIONS_PER_USER = 10; // Maximum concurrent connections per user

// Cache JWT_SECRET at module level for performance
const JWT_SECRET = process.env.JWT_SECRET;

// TypeScript interfaces
interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

interface AuthenticatedSocket extends Socket {
  user: JWTPayload;
}

// Connection tracking for rate limiting
const userConnections = new Map<string, number>();

export const initializeWebSocket = (httpServer: HTTPServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    },
    pingTimeout: WS_PING_TIMEOUT_MS,
    pingInterval: WS_PING_INTERVAL_MS,
  });

  initializeWebSocketServer(io);
  
  return io;
};

/**
 * Validates JWT payload structure
 */
const isValidJWTPayload = (payload: any): payload is JWTPayload => {
  return (
    payload &&
    typeof payload === 'object' &&
    typeof payload.id === 'string' &&
    typeof payload.email === 'string' &&
    typeof payload.role === 'string'
  );
};

/**
 * Creates authentication middleware with proper error handling
 */
const createAuthenticationMiddleware = (namespaceName: string) => {
  return (socket: Socket, next: (err?: Error) => void) => {
    try {
      // Extract token from auth or authorization header
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      if (!JWT_SECRET) {
        logger.error('JWT_SECRET not configured');
        return next(new Error('Server configuration error'));
      }

      // Verify and decode token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Validate payload structure
      if (!isValidJWTPayload(decoded)) {
        logger.error(`Invalid JWT payload structure in ${namespaceName}`);
        return next(new Error('Invalid token payload'));
      }

      // Attach user to socket
      (socket as AuthenticatedSocket).user = decoded;
      next();
    } catch (error) {
      // Categorize JWT errors for better debugging
      if (error instanceof TokenExpiredError) {
        logger.warn(`Expired token in ${namespaceName}: ${error.message}`);
        return next(new Error('Token expired'));
      }
      
      if (error instanceof JsonWebTokenError) {
        logger.warn(`Invalid token in ${namespaceName}: ${error.message}`);
        return next(new Error('Invalid token'));
      }

      logger.error(`WebSocket authentication error in ${namespaceName}:`, error);
      next(new Error('Authentication failed'));
    }
  };
};

/**
 * Validates connection and enforces rate limits
 */
const validateConnection = (socket: AuthenticatedSocket): boolean => {
  const userId = socket.user.id;
  const currentConnections = userConnections.get(userId) || 0;

  if (currentConnections >= MAX_CONNECTIONS_PER_USER) {
    logger.warn(
      `User ${socket.user.email} exceeded max connections (${MAX_CONNECTIONS_PER_USER})`
    );
    return false;
  }

  return true;
};

/**
 * Tracks user connection count
 */
const trackConnection = (socket: AuthenticatedSocket): void => {
  const userId = socket.user.id;
  const currentConnections = userConnections.get(userId) || 0;
  userConnections.set(userId, currentConnections + 1);
};

/**
 * Removes connection tracking on disconnect
 */
const untrackConnection = (socket: AuthenticatedSocket): void => {
  const userId = socket.user.id;
  const currentConnections = userConnections.get(userId) || 0;
  
  if (currentConnections <= 1) {
    userConnections.delete(userId);
  } else {
    userConnections.set(userId, currentConnections - 1);
  }
};

/**
 * Sets up user-specific room
 */
const setupUserRoom = (socket: AuthenticatedSocket): void => {
  socket.join(`user:${socket.user.id}`);
};

/**
 * Registers all event handlers for the socket
 */
const registerEventHandlers = (socket: AuthenticatedSocket, io: SocketIOServer): void => {
  handleConsultationEvents(socket, io);
  handleTranscriptEvents(socket, io);
  handleAgentEvents(socket, io);
};

/**
 * Sets up socket lifecycle handlers (disconnect, error)
 */
const setupSocketLifecycle = (
  socket: AuthenticatedSocket,
  namespaceName: string
): void => {
  // Handle disconnection
  socket.on('disconnect', () => {
    untrackConnection(socket);
    logger.info(
      `WebSocket client disconnected from ${namespaceName}: ${socket.user.email} (${socket.id})`
    );
  });

  // Handle errors
  socket.on('error', (error: Error) => {
    logger.error(
      `WebSocket error in ${namespaceName} for ${socket.user.email}:`,
      error
    );
  });
};

/**
 * Sends connection confirmation to client
 */
const sendConnectionConfirmation = (
  socket: AuthenticatedSocket,
  namespaceName: string
): void => {
  socket.emit('connected', {
    userId: socket.user.id,
    timestamp: new Date(),
    namespace: namespaceName,
  });
};

/**
 * Sets up namespace with authentication and connection handling
 */
const setupNamespaceAuthentication = (io: SocketIOServer, namespaceName: string) => {
  const namespace = io.of(namespaceName);
  
  // Apply authentication middleware
  namespace.use(createAuthenticationMiddleware(namespaceName));

  // Connection handler for namespace
  namespace.on('connection', (socket: Socket) => {
    const authenticatedSocket = socket as AuthenticatedSocket;
    
    // Validate connection limits
    if (!validateConnection(authenticatedSocket)) {
      authenticatedSocket.emit('error', {
        message: 'Maximum connections exceeded',
      });
      authenticatedSocket.disconnect(true);
      return;
    }

    // Track connection
    trackConnection(authenticatedSocket);

    logger.info(
      `WebSocket client connected to ${namespaceName}: ${authenticatedSocket.user.email} (${socket.id})`
    );

    // Setup connection
    setupUserRoom(authenticatedSocket);
    registerEventHandlers(authenticatedSocket, io);
    setupSocketLifecycle(authenticatedSocket, namespaceName);
    sendConnectionConfirmation(authenticatedSocket, namespaceName);
  });
};

export const initializeWebSocketServer = (io: SocketIOServer) => {
  // Setup default namespace
  setupNamespaceAuthentication(io, '/');
  
  // Setup consultation namespace
  setupNamespaceAuthentication(io, '/consultation');

  logger.info('WebSocket server initialized successfully with namespaces: /, /consultation');
};

// 
