import { Router } from 'express';
import multer from 'multer';
import { authenticate, authorize } from '../middleware/auth.middleware';
import consultationService from '../services/consultation.service';
import storageService from '../services/storage.service';
import watsonService from '../services/watson.service';
import { AppError } from '../middleware/error.middleware';
import logger from '../config/logger';

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept audio files only
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'));
    }
  },
});

const router = Router();

/**
 * @route   POST /api/consultations
 * @desc    Create a new consultation
 * @access  Private (Doctor, Nurse)
 */
router.post(
  '/',
  authenticate,
  authorize(['DOCTOR', 'NURSE']),
  async (req, res, next) => {
    try {
      const { patientId } = req.body;

      if (!patientId) {
        throw new AppError('Patient ID is required', 400);
      }

      const consultation = await consultationService.createConsultation({
        patientId,
        doctorId: req.user!.id,
      });

      res.status(201).json({
        success: true,
        data: consultation,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   GET /api/consultations
 * @desc    List consultations
 * @access  Private
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { status, patientId, page, limit } = req.query;

    const result = await consultationService.listConsultations({
      userId: req.user!.id,
      userRole: req.user!.role,
      status: status as any,
      patientId: patientId as string,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });

    res.json({
      success: true,
      data: result.consultations,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/consultations/:id
 * @desc    Get consultation by ID
 * @access  Private
 */
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const consultation = await consultationService.getConsultation(
      id,
      req.user!.id
    );

    res.json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PATCH /api/consultations/:id
 * @desc    Update consultation
 * @access  Private (Doctor, Nurse)
 */
router.patch(
  '/:id',
  authenticate,
  authorize(['DOCTOR', 'NURSE']),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, audioUrl, duration } = req.body;

      const consultation = await consultationService.updateConsultation(
        id,
        req.user!.id,
        { status, audioUrl, duration }
      );

      res.json({
        success: true,
        data: consultation,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   POST /api/consultations/:id/complete
 * @desc    Complete consultation
 * @access  Private (Doctor, Nurse)
 */
router.post(
  '/:id/complete',
  authenticate,
  authorize(['DOCTOR', 'NURSE']),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const consultation = await consultationService.completeConsultation(
        id,
        req.user!.id
      );

      res.json({
        success: true,
        data: consultation,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   GET /api/consultations/:id/transcripts
 * @desc    Get consultation transcripts
 * @access  Private
 */
router.get('/:id/transcripts', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const transcripts = await consultationService.getTranscripts(
      id,
      req.user!.id
    );

    res.json({
      success: true,
      data: transcripts,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/consultations/:id/transcripts
 * @desc    Add transcript to consultation
 * @access  Private (System/Internal)
 */
router.post('/:id/transcripts', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, speaker, confidence } = req.body;

    if (!text || !speaker) {
      throw new AppError('Text and speaker are required', 400);
    }

    const transcript = await consultationService.addTranscript({
      consultationId: id,
      text,
      speaker,
      confidence,
    });

    res.status(201).json({
      success: true,
      data: transcript,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/consultations/:id/upload-audio
 * @desc    Upload audio file for consultation
 * @access  Private (Doctor, Nurse)
 */
router.post(
  '/:id/upload-audio',
  authenticate,
  authorize(['DOCTOR', 'NURSE']),
  upload.single('audio'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        throw new AppError('Audio file is required', 400);
      }

      // Verify consultation exists and user has access
      const consultation = await consultationService.getConsultation(
        id,
        req.user!.id
      );

      // Upload audio to S3
      const { url, key } = await storageService.uploadAudio(
        id,
        req.file.buffer,
        req.file.mimetype
      );

      // Update consultation with audio URL
      const updated = await consultationService.updateConsultation(
        id,
        req.user!.id,
        { audioUrl: url }
      );

      // Optionally trigger transcription
      if (req.body.transcribe === 'true') {
        // Start async transcription process
        watsonService
          .transcribeAudio(req.file.buffer, req.file.mimetype)
          .then(async (transcriptions) => {
            // Save transcriptions to database
            for (const transcription of transcriptions) {
              await consultationService.addTranscript({
                consultationId: id,
                text: transcription.text,
                speaker: 'SYSTEM',
                confidence: transcription.confidence,
              });
            }
            logger.info(`Transcription completed for consultation ${id}`);
          })
          .catch((error) => {
            logger.error(`Transcription failed for consultation ${id}:`, error);
          });
      }

      res.json({
        success: true,
        data: {
          audioUrl: url,
          audioKey: key,
          consultation: updated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   POST /api/consultations/:id/stream-audio
 * @desc    Stream audio chunks for real-time transcription
 * @access  Private (Doctor, Nurse)
 */
router.post(
  '/:id/stream-audio',
  authenticate,
  authorize(['DOCTOR', 'NURSE']),
  upload.single('audioChunk'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { chunkIndex } = req.body;

      if (!req.file) {
        throw new AppError('Audio chunk is required', 400);
      }

      if (chunkIndex === undefined) {
        throw new AppError('Chunk index is required', 400);
      }

      // Verify consultation exists and user has access
      await consultationService.getConsultation(id, req.user!.id);

      // Upload chunk to S3
      const { url, key } = await storageService.uploadAudioChunk(
        id,
        req.file.buffer,
        parseInt(chunkIndex),
        req.file.mimetype
      );

      // Transcribe chunk
      const transcriptions = await watsonService.transcribeAudio(
        req.file.buffer,
        req.file.mimetype
      );

      // Save transcriptions to database
      const savedTranscripts = [];
      for (const transcription of transcriptions) {
        const transcript = await consultationService.addTranscript({
          consultationId: id,
          text: transcription.text,
          speaker: transcription.speaker || 'SYSTEM',
          confidence: transcription.confidence,
        });
        savedTranscripts.push(transcript);
      }

      res.json({
        success: true,
        data: {
          chunkUrl: url,
          chunkKey: key,
          transcripts: savedTranscripts,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

// Made with Bob
