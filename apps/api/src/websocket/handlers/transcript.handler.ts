import { Socket } from 'socket.io';
import consultationService from '../../services/consultation.service';
import watsonService from '../../services/watson.service';
import logger from '../../config/logger';

interface AuthenticatedSocket extends Socket {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const handleTranscriptEvents = (socket: AuthenticatedSocket, io: any) => {
  /**
   * Handle real-time audio streaming for transcription
   */
  socket.on(
    'transcript:stream-audio',
    async (data: {
      consultationId: string;
      audioChunk: ArrayBuffer;
      chunkIndex: number;
    }) => {
      try {
        const { consultationId, audioChunk, chunkIndex } = data;

        // Verify consultation exists and user has access
        await consultationService.getConsultation(
          consultationId,
          socket.user.id
        );

        // Convert ArrayBuffer to Buffer
        const buffer = Buffer.from(audioChunk);

        // Transcribe audio chunk
        const transcriptions = await watsonService.transcribeAudio(
          buffer,
          'audio/webm'
        );

        // Save transcriptions to database
        for (const transcription of transcriptions) {
          const transcript = await consultationService.addTranscript({
            consultationId,
            text: transcription.text,
            speaker: (transcription.speaker as any) || 'SYSTEM',
            confidence: transcription.confidence,
          });

          // Broadcast transcript to all participants in the consultation room
          io.to(`consultation:${consultationId}`).emit('transcript:updated', {
            consultationId,
            transcript,
            chunkIndex,
          });
        }

        // Acknowledge receipt
        socket.emit('transcript:chunk-processed', {
          consultationId,
          chunkIndex,
          transcriptCount: transcriptions.length,
        });
      } catch (error: any) {
        logger.error('Error processing audio chunk:', error);
        socket.emit('transcript:error', {
          message: error.message || 'Failed to process audio chunk',
        });
      }
    }
  );

  /**
   * Handle manual transcript addition
   */
  socket.on(
    'transcript:add',
    async (data: {
      consultationId: string;
      text: string;
      speaker: 'DOCTOR' | 'PATIENT' | 'SYSTEM';
    }) => {
      try {
        const { consultationId, text, speaker } = data;

        // Verify consultation exists and user has access
        await consultationService.getConsultation(
          consultationId,
          socket.user.id
        );

        // Add transcript
        const transcript = await consultationService.addTranscript({
          consultationId,
          text,
          speaker,
        });

        logger.info(
          `Manual transcript added to consultation ${consultationId} by ${socket.user.email}`
        );

        // Broadcast to all participants
        io.to(`consultation:${consultationId}`).emit('transcript:updated', {
          consultationId,
          transcript,
        });

        // Acknowledge
        socket.emit('transcript:added', {
          consultationId,
          transcript,
        });
      } catch (error: any) {
        logger.error('Error adding transcript:', error);
        socket.emit('transcript:error', {
          message: error.message || 'Failed to add transcript',
        });
      }
    }
  );

  /**
   * Get all transcripts for a consultation
   */
  socket.on(
    'transcript:get-all',
    async (data: { consultationId: string }) => {
      try {
        const { consultationId } = data;

        const transcripts = await consultationService.getTranscripts(
          consultationId,
          socket.user.id
        );

        socket.emit('transcript:all', {
          consultationId,
          transcripts,
        });
      } catch (error: any) {
        logger.error('Error getting transcripts:', error);
        socket.emit('transcript:error', {
          message: error.message || 'Failed to get transcripts',
        });
      }
    }
  );

  /**
   * Handle transcript correction/edit
   */
  socket.on(
    'transcript:edit',
    async (data: {
      consultationId: string;
      transcriptId: string;
      newText: string;
    }) => {
      try {
        const { consultationId, transcriptId, newText } = data;

        // Verify consultation exists and user has access
        await consultationService.getConsultation(
          consultationId,
          socket.user.id
        );

        // TODO: Implement transcript edit functionality in consultation service
        logger.info(
          `Transcript ${transcriptId} edited in consultation ${consultationId}`
        );

        // Broadcast update
        io.to(`consultation:${consultationId}`).emit('transcript:edited', {
          consultationId,
          transcriptId,
          newText,
          editedBy: socket.user.id,
        });

        socket.emit('transcript:edit-success', {
          transcriptId,
        });
      } catch (error: any) {
        logger.error('Error editing transcript:', error);
        socket.emit('transcript:error', {
          message: error.message || 'Failed to edit transcript',
        });
      }
    }
  );
};

// Made with Bob