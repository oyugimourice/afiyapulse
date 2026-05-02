import { prisma } from '@afiyapulse/database';
import cacheService from './cache.service';
import logger from '../config/logger';

/**
 * Dashboard Service
 * 
 * Provides comprehensive dashboard analytics and insights for doctors:
 * - Consultation statistics and trends
 * - Patient metrics and demographics
 * - Pending tasks and reviews
 * - Performance analytics
 * - Recent activity feed
 */

export interface DashboardStats {
  consultations: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    inProgress: number;
    completed: number;
    averageDuration: number;
  };
  patients: {
    total: number;
    new: number;
    returning: number;
  };
  documentation: {
    pendingReviews: number;
    approvedToday: number;
    soapNotes: number;
    prescriptions: number;
    referrals: number;
    appointments: number;
  };
  performance: {
    consultationsPerDay: number;
    averageConsultationTime: number;
    documentationCompletionRate: number;
  };
}

export interface RecentActivity {
  id: string;
  type: 'CONSULTATION' | 'APPROVAL' | 'PATIENT' | 'REFERRAL';
  title: string;
  description: string;
  timestamp: Date;
  metadata?: any;
}

export interface ConsultationSummary {
  id: string;
  patientName: string;
  patientMRN: string;
  startedAt: Date;
  endedAt?: Date;
  duration?: number;
  status: string;
  hasPendingReviews: boolean;
  documentationComplete: boolean;
}

class DashboardService {
  /**
   * Get comprehensive dashboard statistics for a doctor
   */
  async getDashboardStats(doctorId: string): Promise<DashboardStats> {
    try {
      // Try cache first
      const cacheKey = `dashboard:stats:${doctorId}`;
      const cached = await cacheService.get<DashboardStats>(cacheKey);
      if (cached) {
        return cached;
      }

      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      // Consultation statistics
      const [
        totalConsultations,
        todayConsultations,
        weekConsultations,
        monthConsultations,
        inProgressConsultations,
        completedConsultations,
      ] = await Promise.all([
        prisma.consultation.count({ where: { doctorId } }),
        prisma.consultation.count({
          where: { doctorId, startedAt: { gte: todayStart } },
        }),
        prisma.consultation.count({
          where: { doctorId, startedAt: { gte: weekStart } },
        }),
        prisma.consultation.count({
          where: { doctorId, startedAt: { gte: monthStart } },
        }),
        prisma.consultation.count({
          where: { doctorId, status: 'IN_PROGRESS' },
        }),
        prisma.consultation.count({
          where: { doctorId, status: 'COMPLETED' },
        }),
      ]);

      // Calculate average duration
      const consultationsWithDuration = await prisma.consultation.findMany({
        where: { doctorId, duration: { not: null } },
        select: { duration: true },
      });
      const averageDuration =
        consultationsWithDuration.length > 0
          ? consultationsWithDuration.reduce((sum, c) => sum + (c.duration || 0), 0) /
            consultationsWithDuration.length
          : 0;

      // Patient statistics
      const uniquePatients = await prisma.consultation.findMany({
        where: { doctorId },
        distinct: ['patientId'],
        select: { patientId: true },
      });

      const newPatients = await prisma.consultation.groupBy({
        by: ['patientId'],
        where: { doctorId },
        having: {
          patientId: {
            _count: {
              equals: 1,
            },
          },
        },
      });

      // Documentation statistics
      const [
        pendingSoapNotes,
        pendingPrescriptions,
        pendingReferrals,
        pendingAppointments,
        approvedTodaySoapNotes,
        approvedTodayPrescriptions,
        approvedTodayReferrals,
        approvedTodayAppointments,
      ] = await Promise.all([
        prisma.sOAPNote.count({
          where: {
            consultation: { doctorId },
            isApproved: false,
          },
        }),
        prisma.prescription.count({
          where: {
            consultation: { doctorId },
            isApproved: false,
          },
        }),
        prisma.referral.count({
          where: {
            consultation: { doctorId },
            isApproved: false,
          },
        }),
        prisma.appointment.count({
          where: {
            consultation: { doctorId },
            isApproved: false,
          },
        }),
        prisma.sOAPNote.count({
          where: {
            consultation: { doctorId },
            isApproved: true,
            approvedAt: { gte: todayStart },
          },
        }),
        prisma.prescription.count({
          where: {
            consultation: { doctorId },
            isApproved: true,
            approvedAt: { gte: todayStart },
          },
        }),
        prisma.referral.count({
          where: {
            consultation: { doctorId },
            isApproved: true,
            approvedAt: { gte: todayStart },
          },
        }),
        prisma.appointment.count({
          where: {
            consultation: { doctorId },
            isApproved: true,
            approvedAt: { gte: todayStart },
          },
        }),
      ]);

      const pendingReviews =
        pendingSoapNotes + pendingPrescriptions + pendingReferrals + pendingAppointments;
      const approvedToday =
        approvedTodaySoapNotes +
        approvedTodayPrescriptions +
        approvedTodayReferrals +
        approvedTodayAppointments;

      // Performance metrics
      const daysActive = Math.max(
        1,
        Math.ceil((now.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24))
      );
      const consultationsPerDay = weekConsultations / daysActive;

      const totalDocumentation = await prisma.consultation.count({
        where: {
          doctorId,
          OR: [
            { soapNote: { isNot: null } },
            { prescription: { isNot: null } },
            { referral: { isNot: null } },
            { appointment: { isNot: null } },
          ],
        },
      });
      const documentationCompletionRate =
        totalConsultations > 0 ? (totalDocumentation / totalConsultations) * 100 : 0;

      const stats: DashboardStats = {
        consultations: {
          total: totalConsultations,
          today: todayConsultations,
          thisWeek: weekConsultations,
          thisMonth: monthConsultations,
          inProgress: inProgressConsultations,
          completed: completedConsultations,
          averageDuration: Math.round(averageDuration),
        },
        patients: {
          total: uniquePatients.length,
          new: newPatients.length,
          returning: uniquePatients.length - newPatients.length,
        },
        documentation: {
          pendingReviews,
          approvedToday,
          soapNotes: pendingSoapNotes,
          prescriptions: pendingPrescriptions,
          referrals: pendingReferrals,
          appointments: pendingAppointments,
        },
        performance: {
          consultationsPerDay: Math.round(consultationsPerDay * 10) / 10,
          averageConsultationTime: Math.round(averageDuration),
          documentationCompletionRate: Math.round(documentationCompletionRate * 10) / 10,
        },
      };

      // Cache for 5 minutes
      await cacheService.set(cacheKey, stats, { ttl: 300 });

      return stats;
    } catch (error) {
      logger.error('Error getting dashboard stats:', error);
      throw error;
    }
  }

  /**
   * Get recent activity for a doctor
   */
  async getRecentActivity(
    doctorId: string,
    limit: number = 20
  ): Promise<RecentActivity[]> {
    try {
      const activities: RecentActivity[] = [];

      // Recent consultations
      const recentConsultations = await prisma.consultation.findMany({
        where: { doctorId },
        include: { patient: true },
        orderBy: { startedAt: 'desc' },
        take: 10,
      });

      for (const consultation of recentConsultations) {
        activities.push({
          id: consultation.id,
          type: 'CONSULTATION',
          title: `Consultation with ${consultation.patient.firstName} ${consultation.patient.lastName}`,
          description: `Status: ${consultation.status}`,
          timestamp: consultation.startedAt,
          metadata: {
            patientMRN: consultation.patient.mrn,
            status: consultation.status,
          },
        });
      }

      // Recent approvals
      const recentApprovals = await prisma.sOAPNote.findMany({
        where: {
          consultation: { doctorId },
          isApproved: true,
          approvedAt: { not: null },
        },
        include: {
          consultation: {
            include: { patient: true },
          },
        },
        orderBy: { approvedAt: 'desc' },
        take: 5,
      });

      for (const approval of recentApprovals) {
        if (approval.approvedAt) {
          activities.push({
            id: approval.id,
            type: 'APPROVAL',
            title: 'SOAP Note Approved',
            description: `For ${approval.consultation.patient.firstName} ${approval.consultation.patient.lastName}`,
            timestamp: approval.approvedAt,
            metadata: {
              patientMRN: approval.consultation.patient.mrn,
            },
          });
        }
      }

      // Sort by timestamp and limit
      activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      return activities.slice(0, limit);
    } catch (error) {
      logger.error('Error getting recent activity:', error);
      throw error;
    }
  }

  /**
   * Get recent consultations for a doctor
   */
  async getRecentConsultations(
    doctorId: string,
    limit: number = 10
  ): Promise<ConsultationSummary[]> {
    try {
      const consultations = await prisma.consultation.findMany({
        where: { doctorId },
        include: {
          patient: true,
          soapNote: true,
          prescription: true,
          referral: true,
          appointment: true,
        },
        orderBy: { startedAt: 'desc' },
        take: limit,
      });

      return consultations.map((c) => {
        const hasPendingReviews = Boolean(
          (c.soapNote && !c.soapNote.isApproved) ||
          (c.prescription && !c.prescription.isApproved) ||
          (c.referral && !c.referral.isApproved) ||
          (c.appointment && !c.appointment.isApproved)
        );

        const documentationComplete =
          c.soapNote !== null &&
          c.soapNote.isApproved &&
          (c.prescription === null || c.prescription.isApproved) &&
          (c.referral === null || c.referral.isApproved) &&
          (c.appointment === null || c.appointment.isApproved);

        return {
          id: c.id,
          patientName: `${c.patient.firstName} ${c.patient.lastName}`,
          patientMRN: c.patient.mrn,
          startedAt: c.startedAt,
          endedAt: c.endedAt || undefined,
          duration: c.duration || undefined,
          status: c.status,
          hasPendingReviews,
          documentationComplete,
        };
      });
    } catch (error) {
      logger.error('Error getting recent consultations:', error);
      throw error;
    }
  }

  /**
   * Get consultation trends over time
   */
  async getConsultationTrends(
    doctorId: string,
    days: number = 30
  ): Promise<{ date: string; count: number }[]> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const consultations = await prisma.consultation.findMany({
        where: {
          doctorId,
          startedAt: { gte: startDate },
        },
        select: { startedAt: true },
      });

      // Group by date
      const trendMap = new Map<string, number>();
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        trendMap.set(dateStr, 0);
      }

      consultations.forEach((c) => {
        const dateStr = c.startedAt.toISOString().split('T')[0];
        trendMap.set(dateStr, (trendMap.get(dateStr) || 0) + 1);
      });

      return Array.from(trendMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      logger.error('Error getting consultation trends:', error);
      throw error;
    }
  }

  /**
   * Get patient demographics
   */
  async getPatientDemographics(doctorId: string): Promise<{
    byGender: { gender: string; count: number }[];
    byAgeGroup: { ageGroup: string; count: number }[];
  }> {
    try {
      const patients = await prisma.consultation.findMany({
        where: { doctorId },
        distinct: ['patientId'],
        include: { patient: true },
      });

      // Group by gender
      const genderMap = new Map<string, number>();
      patients.forEach((c) => {
        const gender = c.patient.gender;
        genderMap.set(gender, (genderMap.get(gender) || 0) + 1);
      });

      // Group by age
      const ageGroupMap = new Map<string, number>();
      const now = new Date();
      patients.forEach((c) => {
        const age = now.getFullYear() - c.patient.dob.getFullYear();
        let ageGroup: string;
        if (age < 18) ageGroup = '0-17';
        else if (age < 30) ageGroup = '18-29';
        else if (age < 45) ageGroup = '30-44';
        else if (age < 60) ageGroup = '45-59';
        else ageGroup = '60+';
        ageGroupMap.set(ageGroup, (ageGroupMap.get(ageGroup) || 0) + 1);
      });

      return {
        byGender: Array.from(genderMap.entries()).map(([gender, count]) => ({
          gender,
          count,
        })),
        byAgeGroup: Array.from(ageGroupMap.entries()).map(([ageGroup, count]) => ({
          ageGroup,
          count,
        })),
      };
    } catch (error) {
      logger.error('Error getting patient demographics:', error);
      throw error;
    }
  }

  /**
   * Get top diagnoses/conditions
   */
  async getTopDiagnoses(
    doctorId: string,
    limit: number = 10
  ): Promise<{ diagnosis: string; count: number }[]> {
    try {
      const soapNotes = await prisma.sOAPNote.findMany({
        where: { consultation: { doctorId } },
        select: { assessment: true },
      });

      // Simple word frequency analysis on assessments
      const diagnosisMap = new Map<string, number>();
      soapNotes.forEach((note) => {
        // Extract potential diagnoses (simplified - in production use NLP)
        const words = note.assessment
          .toLowerCase()
          .split(/\W+/)
          .filter((w) => w.length > 4);
        words.forEach((word) => {
          diagnosisMap.set(word, (diagnosisMap.get(word) || 0) + 1);
        });
      });

      return Array.from(diagnosisMap.entries())
        .map(([diagnosis, count]) => ({ diagnosis, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
    } catch (error) {
      logger.error('Error getting top diagnoses:', error);
      throw error;
    }
  }
}

export default new DashboardService();

// Made with Bob