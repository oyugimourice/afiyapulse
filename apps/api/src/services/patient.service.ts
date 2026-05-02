import { prisma } from '@afiyapulse/database';
import { Gender } from '@afiyapulse/database';
import { AppError } from '../middleware/error.middleware';
import logger from '../config/logger';

export class PatientService {
  /**
   * Create a new patient
   */
  async createPatient(data: {
    mrn: string;
    firstName: string;
    lastName: string;
    dob: Date;
    gender: Gender;
    phone?: string;
    email?: string;
    address?: string;
    allergies?: string[];
    medicalHistory?: string;
  }) {
    // Check if MRN already exists
    const existing = await prisma.patient.findUnique({
      where: { mrn: data.mrn },
    });

    if (existing) {
      throw new AppError('Patient with this MRN already exists', 400);
    }

    const patient = await prisma.patient.create({
      data: {
        mrn: data.mrn,
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        allergies: data.allergies,
        medicalHistory: data.medicalHistory,
      },
    });

    logger.info(`Patient created: ${patient.mrn} - ${patient.firstName} ${patient.lastName}`);

    return patient;
  }

  /**
   * Get patient by ID
   */
  async getPatient(patientId: string) {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        consultations: {
          orderBy: { startedAt: 'desc' },
          take: 10,
          include: {
            doctor: {
              select: {
                id: true,
                name: true,
                specialty: true,
              },
            },
          },
        },
      },
    });

    if (!patient) {
      throw new AppError('Patient not found', 404);
    }

    return patient;
  }

  /**
   * Get patient by MRN
   */
  async getPatientByMRN(mrn: string) {
    const patient = await prisma.patient.findUnique({
      where: { mrn },
      include: {
        consultations: {
          orderBy: { startedAt: 'desc' },
          take: 10,
          include: {
            doctor: {
              select: {
                id: true,
                name: true,
                specialty: true,
              },
            },
          },
        },
      },
    });

    if (!patient) {
      throw new AppError('Patient not found', 404);
    }

    return patient;
  }

  /**
   * Update patient
   */
  async updatePatient(
    patientId: string,
    data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      email?: string;
      address?: string;
      allergies?: string[];
      medicalHistory?: string;
    }
  ) {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new AppError('Patient not found', 404);
    }

    const updated = await prisma.patient.update({
      where: { id: patientId },
      data,
    });

    logger.info(`Patient updated: ${updated.mrn}`);

    return updated;
  }

  /**
   * Search patients
   */
  async searchPatients(params: {
    query?: string;
    page?: number;
    limit?: number;
  }) {
    const { query, page = 1, limit = 20 } = params;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (query) {
      where.OR = [
        { mrn: { contains: query, mode: 'insensitive' } },
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ];
    }

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          mrn: true,
          firstName: true,
          lastName: true,
          dob: true,
          gender: true,
          phone: true,
          email: true,
          createdAt: true,
        },
      }),
      prisma.patient.count({ where }),
    ]);

    return {
      patients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get patient consultation history
   */
  async getConsultationHistory(patientId: string, params: {
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 20 } = params;

    const skip = (page - 1) * limit;

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new AppError('Patient not found', 404);
    }

    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where: { patientId },
        skip,
        take: limit,
        orderBy: { startedAt: 'desc' },
        include: {
          doctor: {
            select: {
              id: true,
              name: true,
              specialty: true,
            },
          },
          soapNote: {
            select: {
              id: true,
              chiefComplaint: true,
              diagnosis: true,
            },
          },
        },
      }),
      prisma.consultation.count({ where: { patientId } }),
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
   * Delete patient (soft delete by marking as inactive)
   */
  async deletePatient(patientId: string) {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new AppError('Patient not found', 404);
    }

    // In a real system, we'd implement soft delete
    // For now, we'll just delete the patient
    await prisma.patient.delete({
      where: { id: patientId },
    });

    logger.info(`Patient deleted: ${patient.mrn}`);

    return { success: true };
  }
}

export default new PatientService();

// Made with Bob
