import { prisma, Gender } from '@afiyapulse/database';
import cacheService from './cache.service';
import auditService, { AuditAction } from './audit.service';
import logger from '../config/logger';

type Patient = {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: Gender;
  phone: string | null;
  email: string | null;
  address: string | null;
  allergies: string[];
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Patient Service
 *
 * Provides comprehensive patient management with:
 * - CRUD operations with caching
 * - Search and filtering capabilities
 * - Medical Record Number (MRN) generation
 * - Patient history tracking
 * - Audit logging for all operations
 */

export interface CreatePatientDTO {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: Gender;
  phone?: string;
  email?: string;
  address?: string;
  allergies?: string[];
}

export interface UpdatePatientDTO {
  firstName?: string;
  lastName?: string;
  dob?: Date;
  gender?: Gender;
  phone?: string;
  email?: string;
  address?: string;
  allergies?: string[];
}

export interface PatientSearchFilters {
  search?: string;
  gender?: Gender;
  minAge?: number;
  maxAge?: number;
  hasAllergies?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'mrn' | 'dob' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface PatientWithStats extends Patient {
  _count?: {
    consultations: number;
    prescriptions: number;
    referrals: number;
    appointments: number;
  };
}

class PatientService {
  /**
   * Generate a unique Medical Record Number (MRN)
   */
  private async generateMRN(): Promise<string> {
    const prefix = 'MRN';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const mrn = `${prefix}${timestamp}${random}`;

    const existing = await prisma.patient.findUnique({
      where: { mrn },
    });

    if (existing) {
      return this.generateMRN();
    }

    return mrn;
  }

  /**
   * Calculate age from date of birth
   */
  private calculateAge(dob: Date): number {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Create a new patient
   */
  async createPatient(
    data: CreatePatientDTO,
    userId: string
  ): Promise<Patient> {
    try {
      const mrn = await this.generateMRN();

      const patient = await prisma.patient.create({
        data: {
          mrn,
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          gender: data.gender,
          phone: data.phone,
          email: data.email,
          address: data.address,
          allergies: data.allergies || [],
        },
      });

      await cacheService.cachePatient(patient.id, patient);

      await auditService.logPatient(
        userId,
        AuditAction.PATIENT_CREATED,
        patient.id,
        { mrn: patient.mrn, name: `${patient.firstName} ${patient.lastName}` }
      );

      logger.info(`Patient created: ${patient.mrn}`, {
        patientId: patient.id,
        userId,
      });

      return patient;
    } catch (error) {
      logger.error('Error creating patient:', error);
      throw error;
    }
  }

  /**
   * Get patient by ID
   */
  async getPatientById(
    patientId: string,
    userId: string
  ): Promise<PatientWithStats | null> {
    try {
      const cached = await cacheService.getPatient<PatientWithStats>(patientId);
      if (cached) {
        return cached;
      }

      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          _count: {
            select: {
              consultations: true,
              prescriptions: true,
              referrals: true,
              appointments: true,
            },
          },
        },
      });

      if (!patient) {
        return null;
      }

      await cacheService.cachePatient(patientId, patient);

      await auditService.logPatient(
        userId,
        AuditAction.PATIENT_VIEWED,
        patientId,
        { mrn: patient.mrn }
      );

      return patient;
    } catch (error) {
      logger.error('Error getting patient:', error);
      throw error;
    }
  }

  /**
   * Get patient by MRN
   */
  async getPatientByMRN(
    mrn: string,
    userId: string
  ): Promise<PatientWithStats | null> {
    try {
      const patient = await prisma.patient.findUnique({
        where: { mrn },
        include: {
          _count: {
            select: {
              consultations: true,
              prescriptions: true,
              referrals: true,
              appointments: true,
            },
          },
        },
      });

      if (!patient) {
        return null;
      }

      await cacheService.cachePatient(patient.id, patient);

      await auditService.logPatient(
        userId,
        AuditAction.PATIENT_VIEWED,
        patient.id,
        { mrn }
      );

      return patient;
    } catch (error) {
      logger.error('Error getting patient by MRN:', error);
      throw error;
    }
  }

  /**
   * Update patient
   */
  async updatePatient(
    patientId: string,
    data: UpdatePatientDTO,
    userId: string
  ): Promise<Patient> {
    try {
      const patient = await prisma.patient.update({
        where: { id: patientId },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          gender: data.gender,
          phone: data.phone,
          email: data.email,
          address: data.address,
          allergies: data.allergies,
        },
      });

      await cacheService.invalidatePatient(patientId);

      await auditService.logPatient(
        userId,
        AuditAction.PATIENT_UPDATED,
        patientId,
        { mrn: patient.mrn, changes: data }
      );

      logger.info(`Patient updated: ${patient.mrn}`, {
        patientId,
        userId,
      });

      return patient;
    } catch (error) {
      logger.error('Error updating patient:', error);
      throw error;
    }
  }

  /**
   * Delete patient
   */
  async deletePatient(patientId: string, userId: string): Promise<void> {
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
      });

      if (!patient) {
        throw new Error('Patient not found');
      }

      const hasConsultations = await prisma.consultation.count({
        where: { patientId },
      });

      if (hasConsultations > 0) {
        throw new Error('Cannot delete patient with existing consultations');
      }

      await prisma.patient.delete({
        where: { id: patientId },
      });

      await cacheService.invalidatePatient(patientId);

      await auditService.logPatient(
        userId,
        AuditAction.PATIENT_DELETED,
        patientId,
        { mrn: patient.mrn }
      );

      logger.info(`Patient deleted: ${patient.mrn}`, {
        patientId,
        userId,
      });
    } catch (error) {
      logger.error('Error deleting patient:', error);
      throw error;
    }
  }

  /**
   * Search and filter patients
   */
  async searchPatients(
    filters: PatientSearchFilters,
    userId: string
  ): Promise<{
    patients: PatientWithStats[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const {
        search,
        gender,
        minAge,
        maxAge,
        hasAllergies,
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = filters;

      const where: any = {};

      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { mrn: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (gender) {
        where.gender = gender;
      }

      if (minAge !== undefined || maxAge !== undefined) {
        const today = new Date();
        if (maxAge !== undefined) {
          const minDob = new Date(
            today.getFullYear() - maxAge - 1,
            today.getMonth(),
            today.getDate()
          );
          where.dob = { ...where.dob, gte: minDob };
        }
        if (minAge !== undefined) {
          const maxDob = new Date(
            today.getFullYear() - minAge,
            today.getMonth(),
            today.getDate()
          );
          where.dob = { ...where.dob, lte: maxDob };
        }
      }

      if (hasAllergies !== undefined) {
        if (hasAllergies) {
          where.allergies = { isEmpty: false };
        } else {
          where.allergies = { isEmpty: true };
        }
      }

      const orderBy: any = {};
      if (sortBy === 'name') {
        orderBy.lastName = sortOrder;
      } else if (sortBy === 'mrn') {
        orderBy.mrn = sortOrder;
      } else if (sortBy === 'dob') {
        orderBy.dob = sortOrder;
      } else {
        orderBy.createdAt = sortOrder;
      }

      const [patients, total] = await Promise.all([
        prisma.patient.findMany({
          where,
          include: {
            _count: {
              select: {
                consultations: true,
                prescriptions: true,
                referrals: true,
                appointments: true,
              },
            },
          },
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.patient.count({ where }),
      ]);

      await auditService.logPatient(
        userId,
        AuditAction.PATIENT_SEARCHED,
        'multiple',
        { filters, resultCount: patients.length }
      );

      return {
        patients,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      logger.error('Error searching patients:', error);
      throw error;
    }
  }

  /**
   * Get patient medical history
   */
  async getPatientHistory(
    patientId: string,
    userId: string
  ): Promise<{
    patient: Patient;
    consultations: any[];
    prescriptions: any[];
    referrals: any[];
    appointments: any[];
  }> {
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          consultations: {
            include: {
              doctor: {
                select: {
                  id: true,
                  name: true,
                  specialty: true,
                },
              },
              soapNote: true,
            },
            orderBy: { startedAt: 'desc' },
            take: 10,
          },
          prescriptions: {
            include: {
              consultation: {
                select: {
                  id: true,
                  startedAt: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          referrals: {
            include: {
              consultation: {
                select: {
                  id: true,
                  startedAt: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          appointments: {
            orderBy: { scheduledAt: 'desc' },
            take: 10,
          },
        },
      });

      if (!patient) {
        throw new Error('Patient not found');
      }

      await auditService.logPatient(
        userId,
        AuditAction.PATIENT_VIEWED,
        patientId,
        { mrn: patient.mrn, action: 'history_viewed' }
      );

      return {
        patient,
        consultations: patient.consultations,
        prescriptions: patient.prescriptions,
        referrals: patient.referrals,
        appointments: patient.appointments,
      };
    } catch (error) {
      logger.error('Error getting patient history:', error);
      throw error;
    }
  }

  /**
   * Get patient statistics
   */
  async getPatientStats(patientId: string): Promise<{
    totalConsultations: number;
    totalPrescriptions: number;
    totalReferrals: number;
    totalAppointments: number;
    lastConsultation: Date | null;
    age: number;
  }> {
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          _count: {
            select: {
              consultations: true,
              prescriptions: true,
              referrals: true,
              appointments: true,
            },
          },
          consultations: {
            orderBy: { startedAt: 'desc' },
            take: 1,
            select: { startedAt: true },
          },
        },
      });

      if (!patient) {
        throw new Error('Patient not found');
      }

      return {
        totalConsultations: patient._count.consultations,
        totalPrescriptions: patient._count.prescriptions,
        totalReferrals: patient._count.referrals,
        totalAppointments: patient._count.appointments,
        lastConsultation: patient.consultations[0]?.startedAt || null,
        age: this.calculateAge(patient.dob),
      };
    } catch (error) {
      logger.error('Error getting patient stats:', error);
      throw error;
    }
  }

  /**
   * Get all patients (for admin)
   */
  async getAllPatients(
    page: number = 1,
    limit: number = 50
  ): Promise<{
    patients: Patient[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const [patients, total] = await Promise.all([
        prisma.patient.findMany({
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.patient.count(),
      ]);

      return {
        patients,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      logger.error('Error getting all patients:', error);
      throw error;
    }
  }
}

export default new PatientService();

// Made with Bob
