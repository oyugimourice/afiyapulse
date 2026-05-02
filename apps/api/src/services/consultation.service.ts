import { prisma } from '@afiyapulse/database';
import { ConsultationStatus } from '@afiyapulse/database';
import { AppError } from '../middleware/error.middleware';
import logger from '../config/logger';

export class ConsultationService {
  /**
   * Create a new consultation
   */
  async createConsultation(data: {
    patientId: string;
    doctorId: string;
  }) {
    // Verify patient exists
    const patient = await prisma.patient.findUnique({
      where: { id: data.patientId },
    });

    if (!patient) {
      throw new AppError('Patient not found', 404);
    }

    // Verify doctor exists
    const doctor = await prisma.user.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new AppError('Doctor not found', 404);
    }

    // Check if doctor has an active consultation
    const activeConsultation = await prisma.consultation.findFirst({
      where: {
        doctorId: data.doctorId,
        status: ConsultationStatus.IN_PROGRESS,
      },
    });

    if (activeConsultation) {
      throw new AppError('Doctor already has an active consultation', 400);
    }

    // Create consultation
    const consultation = await prisma.consultation.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        status: ConsultationStatus.IN_PROGRESS,
        startedAt: new Date(),
      },
      include: {
        patient: {
          select: {
            id: true,
            mrn: true,
            firstName: true,
            lastName: true,
            dob: true,
            gender: true,
            allergies: true,
          },
        },
        doctor: {
          select: {
            id: true,
            name: true,
            email: true,
            specialty: true,
          },
        },
      },
    });

    logger.info(`Consultation created: ${consultation.id} for patient ${patient.mrn}`);

    return consultation;
  }

  /**
   * Get consultation by ID
   */
  async getConsultation(consultationId: string, userId: string) {
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: {
        patient: {
          select: {
            id: true,
            mrn: true,
            firstName: true,
            lastName: true,
            dob: true,
            gender: true,
            allergies: true,
          },
        },
        doctor: {
          select: {
            id: true,
            name: true,
            email: true,
            specialty: true,
          },
        },
        transcripts: {
          orderBy: { timestamp: 'asc' },
        },
        soapNote: true,
        prescription: true,
        referral: true,
        appointment: true,
      },
    });

    if (!consultation) {
      throw new AppError('Consultation not found', 404);
    }

    // Verify user has access to this consultation
    if (consultation.doctorId !== userId && consultation.patientId !== userId) {
      throw new AppError('Access denied', 403);
    }

    return consultation;
  }

  /**
   * Update consultation
   */
  async updateConsultation(
    consultationId: string,
    userId: string,
    data: {
      status?: ConsultationStatus;
      audioUrl?: string;
      duration?: number;
    }
  ) {
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation) {
      throw new AppError('Consultation not found', 404);
    }

    // Verify user is the doctor for this consultation
    if (consultation.doctorId !== userId) {
      throw new AppError('Only the assigned doctor can update this consultation', 403);
    }

    // If completing consultation, set endedAt
    const updateData: any = { ...data };
    if (data.status === ConsultationStatus.COMPLETED && !consultation.endedAt) {
      updateData.endedAt = new Date();
      
      // Calculate duration if not provided
      if (!data.duration) {
        const duration = Math.floor(
          (new Date().getTime() - consultation.startedAt.getTime()) / 1000
        );
        updateData.duration = duration;
      }
    }

    const updated = await prisma.consultation.update({
      where: { id: consultationId },
      data: updateData,
      include: {
        patient: {
          select: {
            id: true,
            mrn: true,
            firstName: true,
            lastName: true,
          },
        },
        doctor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    logger.info(`Consultation updated: ${consultationId} - Status: ${updated.status}`);

    return updated;
  }

  /**
   * Complete consultation
   */
  async completeConsultation(consultationId: string, userId: string) {
    return this.updateConsultation(consultationId, userId, {
      status: ConsultationStatus.COMPLETED,
    });
  }

  /**
   * List consultations
   */
  async listConsultations(params: {
    userId: string;
    userRole: string;
    status?: ConsultationStatus;
    patientId?: string;
    page?: number;
    limit?: number;
  }) {
    const { userId, userRole, status, patientId, page = 1, limit = 20 } = params;

    const skip = (page - 1) * limit;

    // Build where clause based on user role
    const where: any = {};

    if (userRole === 'DOCTOR' || userRole === 'NURSE') {
      where.doctorId = userId;
    }

    if (status) {
      where.status = status;
    }

    if (patientId) {
      where.patientId = patientId;
    }

    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startedAt: 'desc' },
        include: {
          patient: {
            select: {
              id: true,
              mrn: true,
              firstName: true,
              lastName: true,
            },
          },
          doctor: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.consultation.count({ where }),
    ]);

    return {
      consultations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Add transcript to consultation
   */
  async addTranscript(data: {
    consultationId: string;
    text: string;
    speaker: 'DOCTOR' | 'PATIENT' | 'SYSTEM';
    confidence?: number;
  }) {
    const consultation = await prisma.consultation.findUnique({
      where: { id: data.consultationId },
    });

    if (!consultation) {
      throw new AppError('Consultation not found', 404);
    }

    if (consultation.status !== ConsultationStatus.IN_PROGRESS) {
      throw new AppError('Cannot add transcript to inactive consultation', 400);
    }

    const transcript = await prisma.transcript.create({
      data: {
        consultationId: data.consultationId,
        text: data.text,
        speaker: data.speaker,
        confidence: data.confidence,
        timestamp: new Date(),
      },
    });

    return transcript;
  }

  /**
   * Get consultation transcripts
   */
  async getTranscripts(consultationId: string, userId: string) {
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      select: { doctorId: true, patientId: true },
    });

    if (!consultation) {
      throw new AppError('Consultation not found', 404);
    }

    // Verify access
    if (consultation.doctorId !== userId && consultation.patientId !== userId) {
      throw new AppError('Access denied', 403);
    }

    const transcripts = await prisma.transcript.findMany({
      where: { consultationId },
      orderBy: { timestamp: 'asc' },
    });

    return transcripts;
  }
}

export default new ConsultationService();

// Made with Bob
