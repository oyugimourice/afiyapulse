import { prisma } from '@afiyapulse/database';
import logger from '../config/logger';

export enum AuditAction {
  // Authentication
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOGIN_FAILED = 'LOGIN_FAILED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  
  // Consultation
  CONSULTATION_CREATED = 'CONSULTATION_CREATED',
  CONSULTATION_STARTED = 'CONSULTATION_STARTED',
  CONSULTATION_ENDED = 'CONSULTATION_ENDED',
  CONSULTATION_VIEWED = 'CONSULTATION_VIEWED',
  CONSULTATION_UPDATED = 'CONSULTATION_UPDATED',
  CONSULTATION_DELETED = 'CONSULTATION_DELETED',
  
  // Patient
  PATIENT_CREATED = 'PATIENT_CREATED',
  PATIENT_VIEWED = 'PATIENT_VIEWED',
  PATIENT_UPDATED = 'PATIENT_UPDATED',
  PATIENT_DELETED = 'PATIENT_DELETED',
  PATIENT_SEARCHED = 'PATIENT_SEARCHED',
  
  // Clinical Documentation
  SOAP_NOTE_CREATED = 'SOAP_NOTE_CREATED',
  SOAP_NOTE_APPROVED = 'SOAP_NOTE_APPROVED',
  SOAP_NOTE_UPDATED = 'SOAP_NOTE_UPDATED',
  SOAP_NOTE_VIEWED = 'SOAP_NOTE_VIEWED',
  
  // Prescription
  PRESCRIPTION_CREATED = 'PRESCRIPTION_CREATED',
  PRESCRIPTION_APPROVED = 'PRESCRIPTION_APPROVED',
  PRESCRIPTION_UPDATED = 'PRESCRIPTION_UPDATED',
  PRESCRIPTION_VIEWED = 'PRESCRIPTION_VIEWED',
  PRESCRIPTION_CANCELLED = 'PRESCRIPTION_CANCELLED',
  
  // Referral
  REFERRAL_CREATED = 'REFERRAL_CREATED',
  REFERRAL_APPROVED = 'REFERRAL_APPROVED',
  REFERRAL_UPDATED = 'REFERRAL_UPDATED',
  REFERRAL_VIEWED = 'REFERRAL_VIEWED',
  REFERRAL_CANCELLED = 'REFERRAL_CANCELLED',
  
  // Appointment
  APPOINTMENT_CREATED = 'APPOINTMENT_CREATED',
  APPOINTMENT_APPROVED = 'APPOINTMENT_APPROVED',
  APPOINTMENT_UPDATED = 'APPOINTMENT_UPDATED',
  APPOINTMENT_VIEWED = 'APPOINTMENT_VIEWED',
  APPOINTMENT_CANCELLED = 'APPOINTMENT_CANCELLED',
  APPOINTMENT_RESCHEDULED = 'APPOINTMENT_RESCHEDULED',
  
  // File Operations
  FILE_UPLOADED = 'FILE_UPLOADED',
  FILE_DOWNLOADED = 'FILE_DOWNLOADED',
  FILE_DELETED = 'FILE_DELETED',
  
  // System
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export interface AuditLogEntry {
  userId: string;
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditLogQuery {
  userId?: string;
  action?: AuditAction;
  resourceType?: string;
  resourceId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

class AuditService {
  /**
   * Log an audit event
   */
  async log(entry: AuditLogEntry): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId: entry.userId,
          action: entry.action,
          resourceType: entry.resourceType,
          resourceId: entry.resourceId,
          metadata: entry.metadata || {},
          ipAddress: entry.ipAddress,
          userAgent: entry.userAgent,
        },
      });

      logger.info(`[Audit] ${entry.action} by user ${entry.userId} on ${entry.resourceType}:${entry.resourceId}`);
    } catch (error) {
      logger.error('[Audit] Failed to log audit event:', error);
      // Don't throw - audit logging should not break the main flow
    }
  }

  /**
   * Log authentication event
   */
  async logAuth(
    userId: string,
    action: AuditAction.LOGIN | AuditAction.LOGOUT | AuditAction.LOGIN_FAILED | AuditAction.PASSWORD_CHANGED,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType: 'auth',
      resourceId: userId,
      metadata,
      ipAddress,
      userAgent,
    });
  }

  /**
   * Log consultation event
   */
  async logConsultation(
    userId: string,
    action: AuditAction,
    consultationId: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType: 'consultation',
      resourceId: consultationId,
      metadata,
      ipAddress,
      userAgent,
    });
  }

  /**
   * Log patient event
   */
  async logPatient(
    userId: string,
    action: AuditAction,
    patientId: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType: 'patient',
      resourceId: patientId,
      metadata,
      ipAddress,
      userAgent,
    });
  }

  /**
   * Log clinical documentation event
   */
  async logClinicalDoc(
    userId: string,
    action: AuditAction,
    docType: 'soap_note' | 'prescription' | 'referral' | 'appointment',
    docId: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType: docType,
      resourceId: docId,
      metadata,
      ipAddress,
      userAgent,
    });
  }

  /**
   * Log file operation
   */
  async logFile(
    userId: string,
    action: AuditAction.FILE_UPLOADED | AuditAction.FILE_DOWNLOADED | AuditAction.FILE_DELETED,
    fileId: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType: 'file',
      resourceId: fileId,
      metadata,
      ipAddress,
      userAgent,
    });
  }

  /**
   * Log security event
   */
  async logSecurity(
    userId: string,
    action: AuditAction.UNAUTHORIZED_ACCESS | AuditAction.PERMISSION_DENIED | AuditAction.SYSTEM_ERROR,
    resourceType: string,
    resourceId: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType,
      resourceId,
      metadata,
      ipAddress,
      userAgent,
    });

    // Also log to system logger for security events
    logger.warn(`[Security] ${action} by user ${userId} on ${resourceType}:${resourceId}`, metadata);
  }

  /**
   * Query audit logs
   */
  async query(query: AuditLogQuery) {
    const where: any = {};

    if (query.userId) {
      where.userId = query.userId;
    }

    if (query.action) {
      where.action = query.action;
    }

    if (query.resourceType) {
      where.resourceType = query.resourceType;
    }

    if (query.resourceId) {
      where.resourceId = query.resourceId;
    }

    if (query.startDate || query.endDate) {
      where.timestamp = {};
      if (query.startDate) {
        where.timestamp.gte = query.startDate;
      }
      if (query.endDate) {
        where.timestamp.lte = query.endDate;
      }
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        take: query.limit || 50,
        skip: query.offset || 0,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return {
      logs,
      total,
      limit: query.limit || 50,
      offset: query.offset || 0,
    };
  }

  /**
   * Get audit logs for a specific user
   */
  async getUserLogs(userId: string, limit: number = 50, offset: number = 0) {
    return this.query({ userId, limit, offset });
  }

  /**
   * Get audit logs for a specific resource
   */
  async getResourceLogs(resourceType: string, resourceId: string, limit: number = 50) {
    return this.query({ resourceType, resourceId, limit });
  }

  /**
   * Get recent audit logs
   */
  async getRecentLogs(limit: number = 100) {
    return this.query({ limit });
  }

  /**
   * Get audit logs for a date range
   */
  async getLogsByDateRange(startDate: Date, endDate: Date, limit: number = 100) {
    return this.query({ startDate, endDate, limit });
  }

  /**
   * Get security events
   */
  async getSecurityEvents(limit: number = 100) {
    const securityActions = [
      AuditAction.UNAUTHORIZED_ACCESS,
      AuditAction.PERMISSION_DENIED,
      AuditAction.LOGIN_FAILED,
      AuditAction.SYSTEM_ERROR,
    ];

    const logs = await prisma.auditLog.findMany({
      where: {
        action: {
          in: securityActions,
        },
      },
      orderBy: { timestamp: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return logs;
  }

  /**
   * Get audit statistics
   */
  async getStatistics(startDate?: Date, endDate?: Date) {
    const where: any = {};
    
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) {
        where.timestamp.gte = startDate;
      }
      if (endDate) {
        where.timestamp.lte = endDate;
      }
    }

    const [
      totalLogs,
      actionCounts,
      resourceTypeCounts,
      userCounts,
    ] = await Promise.all([
      prisma.auditLog.count({ where }),
      prisma.auditLog.groupBy({
        by: ['action'],
        where,
        _count: true,
      }),
      prisma.auditLog.groupBy({
        by: ['resourceType'],
        where,
        _count: true,
      }),
      prisma.auditLog.groupBy({
        by: ['userId'],
        where,
        _count: true,
        orderBy: {
          _count: {
            userId: 'desc',
          },
        },
        take: 10,
      }),
    ]);

    return {
      totalLogs,
      actionCounts: actionCounts.map(a => ({
        action: a.action,
        count: a._count,
      })),
      resourceTypeCounts: resourceTypeCounts.map(r => ({
        resourceType: r.resourceType,
        count: r._count,
      })),
      topUsers: userCounts.map(u => ({
        userId: u.userId,
        count: u._count,
      })),
    };
  }
}

export default new AuditService();

// Made with Bob