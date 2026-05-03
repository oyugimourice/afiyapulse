import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';

export interface WebSocketMessage {
  type: string;
  data: any;
}

export interface UseWebSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (type: string, data: any) => void;
  subscribe: (event: string, handler: (data: any) => void) => () => void;
}

export function useWebSocket(namespace: string = '/'): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;

    // Create socket connection
    const socket = io(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${namespace}`, {
      auth: {
        token: accessToken,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    });

    socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [accessToken, namespace]);

  // Send message
  const sendMessage = useCallback((type: string, data: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(type, data);
    } else {
      console.warn('WebSocket not connected. Message not sent:', type, data);
    }
  }, [isConnected]);

  // Subscribe to event
  const subscribe = useCallback((event: string, handler: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, handler);

      // Return unsubscribe function
      return () => {
        if (socketRef.current) {
          socketRef.current.off(event, handler);
        }
      };
    }

    return () => {};
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    subscribe,
  };
}

// Made with Bob
