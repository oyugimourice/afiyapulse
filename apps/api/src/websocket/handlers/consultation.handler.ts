import { Socket } from 'socket.io';
import consultationService from '../../services/consultation.service';
import logger from '../../config/logger';
import { ConsultationStatus } from '@afiyapulse/database';

interface AuthenticatedSocket extends Socket {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const handleConsultationEvents = (socket: AuthenticatedSocket, io: any) => {
  /**
   * Start consultation recording
   */
  socket.on('consultation:start', async (data: { consultationId: string }) => {
    try {
      const { consultationId } = data;

      // Verify consultation exists and user has access
      const consultation = await consultationService.getConsultation(
        consultationId,
        socket.user.id
      );

      if (consultation.status !== ConsultationStatus.IN_PROGRESS) {
        socket.emit('consultation:error', {
          message: 'Consultation is not in progress',
        });
        return;
      }

      // Join consultation room
      socket.join(`consultation:${consultationId}`);

      logger.info(
        `User ${socket.user.email} started consultation ${consultationId}`
      );

      // Notify all participants in the consultation room
      io.to(`consultation:${consultationId}`).emit('consultation:started', {
        consultationId,
        timestamp: new Date(),
        user: {
          id: socket.user.id,
          email: socket.user.email,
        },
      });
    } catch (error: any) {
      logger.error('Error starting consultation:', error);
      socket.emit('consultation:error', {
        message: error.message || 'Failed to start consultation',
      });
    }
  });

  /**
   * Stop consultation recording
   */
  socket.on('consultation:stop', async (data: { consultationId: string }) => {
    try {
      const { consultationId } = data;

      // Complete the consultation
      const consultation = await consultationService.completeConsultation(
        consultationId,
        socket.user.id
      );

      logger.info(
        `User ${socket.user.email} stopped consultation ${consultationId}`
      );

      // Notify all participants
      io.to(`consultation:${consultationId}`).emit('consultation:stopped', {
        consultationId,
        timestamp: new Date(),
        duration: consultation.duration,
        user: {
          id: socket.user.id,
          email: socket.user.email,
        },
      });

      // Leave consultation room
      socket.leave(`consultation:${consultationId}`);
    } catch (error: any) {
      logger.error('Error stopping consultation:', error);
      socket.emit('consultation:error', {
        message: error.message || 'Failed to stop consultation',
      });
    }
  });

  /**
   * Pause consultation recording
   */
  socket.on('consultation:pause', async (data: { consultationId: string }) => {
    try {
      const { consultationId } = data;

      logger.info(
        `User ${socket.user.email} paused consultation ${consultationId}`
      );

      // Notify all participants
      io.to(`consultation:${consultationId}`).emit('consultation:paused', {
        consultationId,
        timestamp: new Date(),
        user: {
          id: socket.user.id,
          email: socket.user.email,
        },
      });
    } catch (error: any) {
      logger.error('Error pausing consultation:', error);
      socket.emit('consultation:error', {
        message: error.message || 'Failed to pause consultation',
      });
    }
  });

  /**
   * Resume consultation recording
   */
  socket.on('consultation:resume', async (data: { consultationId: string }) => {
    try {
      const { consultationId } = data;

      logger.info(
        `User ${socket.user.email} resumed consultation ${consultationId}`
      );

      // Notify all participants
      io.to(`consultation:${consultationId}`).emit('consultation:resumed', {
        consultationId,
        timestamp: new Date(),
        user: {
          id: socket.user.id,
          email: socket.user.email,
        },
      });
    } catch (error: any) {
      logger.error('Error resuming consultation:', error);
      socket.emit('consultation:error', {
        message: error.message || 'Failed to resume consultation',
      });
    }
  });

  /**
   * Get consultation status
   */
  socket.on('consultation:status', async (data: { consultationId: string }) => {
    try {
      const { consultationId } = data;

      const consultation = await consultationService.getConsultation(
        consultationId,
        socket.user.id
      );

      socket.emit('consultation:status:response', {
        consultationId,
        status: consultation.status,
        startedAt: consultation.startedAt,
        endedAt: consultation.endedAt,
        duration: consultation.duration,
      });
    } catch (error: any) {
      logger.error('Error getting consultation status:', error);
      socket.emit('consultation:error', {
        message: error.message || 'Failed to get consultation status',
      });
    }
  });
};

// Made with Bob