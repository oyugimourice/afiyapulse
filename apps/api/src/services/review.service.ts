import { prisma } from '@afiyapulse/database';
import cacheService from './cache.service';
import auditService, { AuditAction } from './audit.service';
import logger from '../config/logger';

/**
 * Review Panel Service
 * 
 * Manages the approval workflow for AI-generated clinical documentation:
 * - SOAP notes review and approval
 * - Prescription review and approval
 * - Referral letter review and approval
 * - Appointment scheduling review and approval
 * - Batch approval operations
 */

export interface ReviewItem {
  id: string;
  type: 'SOAP_NOTE' | 'PRESCRIPTION' | 'REFERRAL' | 'APPOINTMENT';
  isApproved: boolean;
  content: any;
  consultationId: string;
  createdAt: Date;
  approvedAt?: Date | null;
}

export interface ReviewSummary {
  consultationId: string;
  patientName: string;
  patientMRN: string;
  doctorName: string;
  consultationDate: Date;
  items: {
    soapNote?: ReviewItem;
    prescription?: ReviewItem;
    referral?: ReviewItem;
    appointment?: ReviewItem;
  };
  totalItems: number;
  pendingItems: number;
  approvedItems: number;
}

class ReviewService {
  /**
   * Get review summary for a consultation
   */
  async getConsultationReview(
    consultationId: string,
    userId: string
  ): Promise<ReviewSummary | null> {
    try {
      const consultation = await prisma.consultation.findUnique({
        where: { id: consultationId },
        include: {
          patient: true,
          doctor: true,
          soapNote: true,
          prescription: true,
          referral: true,
          appointment: true,
        },
      });

      if (!consultation) {
        return null;
      }

      const items: ReviewSummary['items'] = {};
      let totalItems = 0;
      let pendingItems = 0;
      let approvedItems = 0;

      // SOAP Note
      if (consultation.soapNote) {
        const item: ReviewItem = {
          id: consultation.soapNote.id,
          type: 'SOAP_NOTE',
          isApproved: consultation.soapNote.isApproved,
          content: {
            subjective: consultation.soapNote.subjective,
            objective: consultation.soapNote.objective,
            assessment: consultation.soapNote.assessment,
            plan: consultation.soapNote.plan,
          },
          consultationId,
          createdAt: consultation.soapNote.createdAt,
          approvedAt: consultation.soapNote.approvedAt,
        };
        items.soapNote = item;
        totalItems++;
        if (!item.isApproved) pendingItems++;
        if (item.isApproved) approvedItems++;
      }

      // Prescription
      if (consultation.prescription) {
        const item: ReviewItem = {
          id: consultation.prescription.id,
          type: 'PRESCRIPTION',
          isApproved: consultation.prescription.isApproved,
          content: {
            medications: consultation.prescription.medications,
            instructions: consultation.prescription.instructions,
          },
          consultationId,
          createdAt: consultation.prescription.createdAt,
          approvedAt: consultation.prescription.approvedAt,
        };
        items.prescription = item;
        totalItems++;
        if (!item.isApproved) pendingItems++;
        if (item.isApproved) approvedItems++;
      }

      // Referral
      if (consultation.referral) {
        const item: ReviewItem = {
          id: consultation.referral.id,
          type: 'REFERRAL',
          isApproved: consultation.referral.isApproved,
          content: {
            specialty: consultation.referral.specialty,
            reason: consultation.referral.reason,
            urgency: consultation.referral.urgency,
            notes: consultation.referral.notes,
          },
          consultationId,
          createdAt: consultation.referral.createdAt,
          approvedAt: consultation.referral.approvedAt,
        };
        items.referral = item;
        totalItems++;
        if (!item.isApproved) pendingItems++;
        if (item.isApproved) approvedItems++;
      }

      // Appointment
      if (consultation.appointment) {
        const item: ReviewItem = {
          id: consultation.appointment.id,
          type: 'APPOINTMENT',
          isApproved: consultation.appointment.isApproved,
          content: {
            type: consultation.appointment.type,
            scheduledAt: consultation.appointment.scheduledAt,
            reason: consultation.appointment.reason,
          },
          consultationId,
          createdAt: consultation.appointment.createdAt,
          approvedAt: consultation.appointment.approvedAt,
        };
        items.appointment = item;
        totalItems++;
        if (!item.isApproved) pendingItems++;
        if (item.isApproved) approvedItems++;
      }

      await auditService.logConsultation(
        userId,
        AuditAction.CONSULTATION_VIEWED,
        consultationId,
        { action: 'review_panel_viewed' }
      );

      return {
        consultationId,
        patientName: `${consultation.patient.firstName} ${consultation.patient.lastName}`,
        patientMRN: consultation.patient.mrn,
        doctorName: consultation.doctor.name,
        consultationDate: consultation.startedAt,
        items,
        totalItems,
        pendingItems,
        approvedItems,
      };
    } catch (error) {
      logger.error('Error getting consultation review:', error);
      throw error;
    }
  }

  /**
   * Approve SOAP note
   */
  async approveSOAPNote(
    soapNoteId: string,
    userId: string,
    revisions?: {
      subjective?: string;
      objective?: string;
      assessment?: string;
      plan?: string;
    }
  ): Promise<void> {
    try {
      const updateData: any = {
        isApproved: true,
        approvedAt: new Date(),
      };

      if (revisions) {
        if (revisions.subjective) updateData.subjective = revisions.subjective;
        if (revisions.objective) updateData.objective = revisions.objective;
        if (revisions.assessment) updateData.assessment = revisions.assessment;
        if (revisions.plan) updateData.plan = revisions.plan;
      }

      const soapNote = await prisma.sOAPNote.update({
        where: { id: soapNoteId },
        data: updateData,
      });

      await cacheService.invalidateConsultation(soapNote.consultationId);

      await auditService.logClinicalDoc(
        userId,
        revisions ? AuditAction.SOAP_NOTE_UPDATED : AuditAction.SOAP_NOTE_APPROVED,
        'soap_note',
        soapNoteId,
        { revisions: !!revisions }
      );

      logger.info(`SOAP note ${revisions ? 'revised and ' : ''}approved: ${soapNoteId}`, {
        userId,
        consultationId: soapNote.consultationId,
      });
    } catch (error) {
      logger.error('Error approving SOAP note:', error);
      throw error;
    }
  }

  /**
   * Reject SOAP note
   */
  async rejectSOAPNote(
    soapNoteId: string,
    userId: string,
    reason: string
  ): Promise<void> {
    try {
      const soapNote = await prisma.sOAPNote.update({
        where: { id: soapNoteId },
        data: {
          isApproved: false,
        },
      });

      await cacheService.invalidateConsultation(soapNote.consultationId);

      await auditService.logClinicalDoc(
        userId,
        AuditAction.SOAP_NOTE_UPDATED,
        'soap_note',
        soapNoteId,
        { action: 'rejected', reason }
      );

      logger.info(`SOAP note rejected: ${soapNoteId}`, {
        userId,
        reason,
      });
    } catch (error) {
      logger.error('Error rejecting SOAP note:', error);
      throw error;
    }
  }

  /**
   * Approve prescription
   */
  async approvePrescription(
    prescriptionId: string,
    userId: string,
    revisions?: {
      medications?: any[];
      instructions?: string;
    }
  ): Promise<void> {
    try {
      const updateData: any = {
        isApproved: true,
        approvedAt: new Date(),
      };

      if (revisions) {
        if (revisions.medications) updateData.medications = revisions.medications;
        if (revisions.instructions) updateData.instructions = revisions.instructions;
      }

      const prescription = await prisma.prescription.update({
        where: { id: prescriptionId },
        data: updateData,
      });

      await cacheService.invalidateConsultation(prescription.consultationId);

      await auditService.logClinicalDoc(
        userId,
        revisions ? AuditAction.PRESCRIPTION_UPDATED : AuditAction.PRESCRIPTION_APPROVED,
        'prescription',
        prescriptionId,
        { revisions: !!revisions }
      );

      logger.info(`Prescription ${revisions ? 'revised and ' : ''}approved: ${prescriptionId}`, {
        userId,
        consultationId: prescription.consultationId,
      });
    } catch (error) {
      logger.error('Error approving prescription:', error);
      throw error;
    }
  }

  /**
   * Reject prescription
   */
  async rejectPrescription(
    prescriptionId: string,
    userId: string,
    reason: string
  ): Promise<void> {
    try {
      const prescription = await prisma.prescription.update({
        where: { id: prescriptionId },
        data: {
          isApproved: false,
        },
      });

      await cacheService.invalidateConsultation(prescription.consultationId);

      await auditService.logClinicalDoc(
        userId,
        AuditAction.PRESCRIPTION_CANCELLED,
        'prescription',
        prescriptionId,
        { action: 'rejected', reason }
      );

      logger.info(`Prescription rejected: ${prescriptionId}`, {
        userId,
        reason,
      });
    } catch (error) {
      logger.error('Error rejecting prescription:', error);
      throw error;
    }
  }

  /**
   * Approve referral
   */
  async approveReferral(
    referralId: string,
    userId: string,
    revisions?: {
      specialty?: string;
      reason?: string;
      urgency?: string;
      notes?: string;
    }
  ): Promise<void> {
    try {
      const updateData: any = {
        isApproved: true,
        approvedAt: new Date(),
      };

      if (revisions) {
        if (revisions.specialty) updateData.specialty = revisions.specialty;
        if (revisions.reason) updateData.reason = revisions.reason;
        if (revisions.urgency) updateData.urgency = revisions.urgency;
        if (revisions.notes) updateData.notes = revisions.notes;
      }

      const referral = await prisma.referral.update({
        where: { id: referralId },
        data: updateData,
      });

      await cacheService.invalidateConsultation(referral.consultationId);

      await auditService.logClinicalDoc(
        userId,
        revisions ? AuditAction.REFERRAL_UPDATED : AuditAction.REFERRAL_APPROVED,
        'referral',
        referralId,
        { revisions: !!revisions }
      );

      logger.info(`Referral ${revisions ? 'revised and ' : ''}approved: ${referralId}`, {
        userId,
        consultationId: referral.consultationId,
      });
    } catch (error) {
      logger.error('Error approving referral:', error);
      throw error;
    }
  }

  /**
   * Reject referral
   */
  async rejectReferral(
    referralId: string,
    userId: string,
    reason: string
  ): Promise<void> {
    try {
      const referral = await prisma.referral.update({
        where: { id: referralId },
        data: {
          isApproved: false,
        },
      });

      await cacheService.invalidateConsultation(referral.consultationId);

      await auditService.logClinicalDoc(
        userId,
        AuditAction.REFERRAL_CANCELLED,
        'referral',
        referralId,
        { action: 'rejected', reason }
      );

      logger.info(`Referral rejected: ${referralId}`, {
        userId,
        reason,
      });
    } catch (error) {
      logger.error('Error rejecting referral:', error);
      throw error;
    }
  }

  /**
   * Approve appointment
   */
  async approveAppointment(
    appointmentId: string,
    userId: string,
    revisions?: {
      scheduledAt?: Date;
      reason?: string;
    }
  ): Promise<void> {
    try {
      const updateData: any = {
        isApproved: true,
        approvedAt: new Date(),
      };

      if (revisions) {
        if (revisions.scheduledAt) updateData.scheduledAt = revisions.scheduledAt;
        if (revisions.reason) updateData.reason = revisions.reason;
      }

      const appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: updateData,
      });

      await cacheService.invalidateConsultation(appointment.consultationId);
      await cacheService.invalidateAppointment(appointmentId);

      await auditService.logClinicalDoc(
        userId,
        revisions ? AuditAction.APPOINTMENT_UPDATED : AuditAction.APPOINTMENT_APPROVED,
        'appointment',
        appointmentId,
        { revisions: !!revisions }
      );

      logger.info(`Appointment ${revisions ? 'revised and ' : ''}approved: ${appointmentId}`, {
        userId,
        consultationId: appointment.consultationId,
      });
    } catch (error) {
      logger.error('Error approving appointment:', error);
      throw error;
    }
  }

  /**
   * Reject appointment
   */
  async rejectAppointment(
    appointmentId: string,
    userId: string,
    reason: string
  ): Promise<void> {
    try {
      const appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          isApproved: false,
        },
      });

      await cacheService.invalidateConsultation(appointment.consultationId);
      await cacheService.invalidateAppointment(appointmentId);

      await auditService.logClinicalDoc(
        userId,
        AuditAction.APPOINTMENT_CANCELLED,
        'appointment',
        appointmentId,
        { action: 'rejected', reason }
      );

      logger.info(`Appointment rejected: ${appointmentId}`, {
        userId,
        reason,
      });
    } catch (error) {
      logger.error('Error rejecting appointment:', error);
      throw error;
    }
  }

  /**
   * Batch approve all items for a consultation
   */
  async batchApproveConsultation(
    consultationId: string,
    userId: string
  ): Promise<{
    approved: string[];
    failed: string[];
  }> {
    try {
      const consultation = await prisma.consultation.findUnique({
        where: { id: consultationId },
        include: {
          soapNote: true,
          prescription: true,
          referral: true,
          appointment: true,
        },
      });

      if (!consultation) {
        throw new Error('Consultation not found');
      }

      const approved: string[] = [];
      const failed: string[] = [];

      // Approve SOAP note
      if (consultation.soapNote && !consultation.soapNote.isApproved) {
        try {
          await this.approveSOAPNote(consultation.soapNote.id, userId);
          approved.push(`SOAP Note: ${consultation.soapNote.id}`);
        } catch (error) {
          failed.push(`SOAP Note: ${consultation.soapNote.id}`);
        }
      }

      // Approve prescription
      if (consultation.prescription && !consultation.prescription.isApproved) {
        try {
          await this.approvePrescription(consultation.prescription.id, userId);
          approved.push(`Prescription: ${consultation.prescription.id}`);
        } catch (error) {
          failed.push(`Prescription: ${consultation.prescription.id}`);
        }
      }

      // Approve referral
      if (consultation.referral && !consultation.referral.isApproved) {
        try {
          await this.approveReferral(consultation.referral.id, userId);
          approved.push(`Referral: ${consultation.referral.id}`);
        } catch (error) {
          failed.push(`Referral: ${consultation.referral.id}`);
        }
      }

      // Approve appointment
      if (consultation.appointment && !consultation.appointment.isApproved) {
        try {
          await this.approveAppointment(consultation.appointment.id, userId);
          approved.push(`Appointment: ${consultation.appointment.id}`);
        } catch (error) {
          failed.push(`Appointment: ${consultation.appointment.id}`);
        }
      }

      await auditService.logConsultation(
        userId,
        AuditAction.CONSULTATION_UPDATED,
        consultationId,
        { action: 'batch_approve', approved: approved.length, failed: failed.length }
      );

      logger.info(`Batch approval completed for consultation: ${consultationId}`, {
        userId,
        approved: approved.length,
        failed: failed.length,
      });

      return { approved, failed };
    } catch (error) {
      logger.error('Error in batch approval:', error);
      throw error;
    }
  }

  /**
   * Get pending reviews for a doctor
   */
  async getPendingReviews(
    doctorId: string,
    limit: number = 10
  ): Promise<ReviewSummary[]> {
    try {
      const consultations = await prisma.consultation.findMany({
        where: {
          doctorId,
          OR: [
            { soapNote: { isApproved: false } },
            { prescription: { isApproved: false } },
            { referral: { isApproved: false } },
            { appointment: { isApproved: false } },
          ],
        },
        include: {
          patient: true,
          doctor: true,
          soapNote: true,
          prescription: true,
          referral: true,
          appointment: true,
        },
        orderBy: { startedAt: 'desc' },
        take: limit,
      });

      const reviews: ReviewSummary[] = [];

      for (const consultation of consultations) {
        const review = await this.getConsultationReview(consultation.id, doctorId);
        if (review && review.pendingItems > 0) {
          reviews.push(review);
        }
      }

      return reviews;
    } catch (error) {
      logger.error('Error getting pending reviews:', error);
      throw error;
    }
  }
}

export default new ReviewService();

// Made with Bob