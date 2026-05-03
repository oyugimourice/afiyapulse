import { BaseAgent, AgentContext } from './base.agent';
import { AgentType, AgentStatus } from '@afiyapulse/shared-types';
import { prisma } from '@afiyapulse/database';
import llmService from '../services/llm.service';
import mcpClient from '../services/mcp-client.service';
import logger from '../config/logger';

// Enum for appointment types
enum AppointmentType {
  FOLLOW_UP = 'FOLLOW_UP',
  LAB_WORK = 'LAB_WORK',
  IMAGING = 'IMAGING',
  SPECIALIST = 'SPECIALIST',
  PROCEDURE = 'PROCEDURE',
}

// Discriminated union for follow-up intent
type FollowUpIntent =
  | { needed: false }
  | {
      needed: true;
      type: AppointmentType;
      timeframe?: string;
      duration?: number;
      reason?: string;
      instructions?: string;
    };

interface FollowUpOutput {
  type: AppointmentType;
  scheduledAt: string;
  reason: string;
  instructions: string;
  duration: number;
  doctorId: string;
  doctorName: string;
}

// Type for availability slot
interface AvailabilitySlot {
  scheduledAt: string;
  doctorId: string;
  doctorName: string;
}

// Type for patient details
interface PatientDetails {
  firstName: string;
  lastName: string;
}


export class FollowUpSchedulerAgent extends BaseAgent {
  // Default values for follow-up scheduling
  private readonly DEFAULT_TIMEFRAME = '2 weeks';

  // System prompt for follow-up detection
  private static readonly FOLLOW_UP_DETECTION_SYSTEM_PROMPT = `You are a medical AI assistant analyzing doctor-patient consultations.
Your task is to detect if the doctor schedules a follow-up appointment or any medical procedure.

Look for phrases like:
- "Come back in X weeks/months"
- "I want to see you again in..."
- "Schedule a follow-up for..."
- "You need to get labs done"
- "We need to do some imaging"
- "Let's schedule that procedure"

Determine:
1. If a follow-up is needed (true/false)
2. The type: FOLLOW_UP, LAB_WORK, IMAGING, SPECIALIST, or PROCEDURE
3. The timeframe (e.g., "2 weeks", "1 month", "3 months")
4. Duration in minutes (default: 30 for follow-up, 15 for labs, 45 for procedures)
5. Reason for the appointment
6. Any special instructions

Respond ONLY with valid JSON in this exact format:
{
  "needed": boolean,
  "type": "FOLLOW_UP|LAB_WORK|IMAGING|SPECIALIST|PROCEDURE or null",
  "timeframe": "string or null",
  "duration": number or null,
  "reason": "string or null",
  "instructions": "string or null"
}`;

  // Default durations by appointment type (in minutes)
  private static readonly DEFAULT_DURATIONS: Record<AppointmentType, number> = {
    [AppointmentType.FOLLOW_UP]: 30,
    [AppointmentType.LAB_WORK]: 15,
    [AppointmentType.IMAGING]: 45,
    [AppointmentType.SPECIALIST]: 45,
    [AppointmentType.PROCEDURE]: 45,
  };

  constructor() {
    super({
      name: 'Follow-up Scheduler',
      type: AgentType.FOLLOWUP,
      description: 'Schedules follow-up appointments automatically',
      model: process.env.FOLLOWUP_MODEL || 'gpt-4',
      temperature: 0.2, // Low temperature for accurate scheduling
      maxTokens: 1500,
    });
  }

  /**
   * Process consultation and schedule follow-up if needed
   * Refactored with saga pattern for transactional integrity
   */
  async process(context: AgentContext): Promise<FollowUpOutput | null> {
    try {
      this.validateContext(context);
      this.updateStatus(AgentStatus.PROCESSING, 'Analyzing consultation for follow-up needs');

      // Step 1: Detect follow-up intent
      const transcriptText = this.extractTranscriptText(context);
      const followUpIntent = await this.detectFollowUpIntent(transcriptText);

      if (!followUpIntent.needed) {
        this.updateStatus(AgentStatus.COMPLETED, 'No follow-up appointment needed');
        return null;
      }

      // Step 2: Gather required data
      const patient = await this.fetchPatientDetails(context.patientId);
      const normalizedIntent = this.normalizeFollowUpIntent(followUpIntent);

      // Step 3: Find availability
      this.updateStatus(AgentStatus.PROCESSING, 'Checking availability and booking appointment');
      const availability = await this.findAvailableSlot(
        followUpIntent.timeframe || this.DEFAULT_TIMEFRAME,
        normalizedIntent.duration,
        context.doctorId
      );

      if (!availability) {
        throw new Error('No available slots found for follow-up appointment');
      }

      // Step 4: Book and persist with saga pattern (includes automatic rollback on failure)
      await this.bookAndPersistAppointment(context, patient, availability, normalizedIntent);

      this.updateStatus(AgentStatus.COMPLETED, 'Follow-up appointment scheduled successfully');

      return {
        ...normalizedIntent,
        scheduledAt: availability.scheduledAt,
        doctorId: availability.doctorId,
        doctorName: availability.doctorName,
      };
    } catch (error) {
      this.handleError(error as Error, 'Failed to schedule follow-up');
      throw error;
    }
  }

  /**
   * Fetch patient details from database
   */
  private async fetchPatientDetails(patientId: string): Promise<PatientDetails> {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: {
        firstName: true,
        lastName: true,
      },
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  }

  /**
   * Log orphaned appointment details for manual cleanup
   */
  private logOrphanedAppointment(
    appointment: { id: string; scheduledAt: string; type: string },
    patientId: string,
    error: unknown
  ): void {
    logger.error('Database save failed after MCP booking - orphaned appointment created', {
      appointmentId: appointment.id,
      patientId,
      scheduledAt: appointment.scheduledAt,
      type: appointment.type,
      mcpBookingSuccess: true,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  /**
   * Create enriched error for orphaned appointment
   */
  private createOrphanedAppointmentError(appointmentId: string, originalError: unknown): Error {
    const error = new Error(
      `Failed to save appointment to database. Orphaned booking ID: ${appointmentId}. Manual cleanup required.`
    );
    (error as any).appointmentId = appointmentId;
    (error as any).originalError = originalError;
    return error;
  }

  /**
   * Attempt to cancel an MCP appointment (compensation logic)
   */
  private async compensateMCPBooking(appointmentId: string): Promise<void> {
    try {
      logger.info(`[Follow-up Scheduler] Attempting to cancel orphaned MCP appointment: ${appointmentId}`);
      await mcpClient.cancelAppointment(appointmentId, 'Database save failed - automatic rollback');
      logger.info(`[Follow-up Scheduler] Successfully cancelled orphaned MCP appointment: ${appointmentId}`);
    } catch (compensationError) {
      logger.error(
        `[Follow-up Scheduler] Failed to cancel orphaned MCP appointment: ${appointmentId}`,
        compensationError
      );
      // Don't throw - we've already logged the orphaned appointment
    }
  }

  /**
   * Book appointment via MCP and persist to database with saga pattern
   * Implements compensation logic to rollback MCP booking if database save fails
   */
  private async bookAndPersistAppointment(
    context: AgentContext,
    patient: PatientDetails,
    availability: AvailabilitySlot,
    normalizedIntent: Required<Pick<FollowUpOutput, 'type' | 'duration' | 'reason' | 'instructions'>>
  ): Promise<void> {
    let mcpAppointment: { id: string; scheduledAt: string; type: string; reason?: string } | null = null;

    try {
      // Step 1: Book via MCP
      const appointment = await mcpClient.bookAppointment({
        patientId: context.patientId,
        patientName: `${patient.firstName} ${patient.lastName}`,
        doctorId: availability.doctorId,
        scheduledAt: availability.scheduledAt,
        type: normalizedIntent.type,
        duration: normalizedIntent.duration,
        reason: normalizedIntent.reason,
        notes: normalizedIntent.instructions,
      });

      // Store appointment details for potential compensation
      mcpAppointment = {
        id: appointment.id,
        scheduledAt: appointment.scheduledAt,
        type: appointment.type,
        reason: appointment.reason,
      };

      // Step 2: Persist to database
      await prisma.appointment.create({
        data: {
          consultationId: context.consultationId,
          patientId: context.patientId,
          scheduledAt: new Date(appointment.scheduledAt),
          type: appointment.type as AppointmentType,
          reason: appointment.reason || normalizedIntent.reason,
          isApproved: false,
        },
      });
    } catch (error) {
      // If we successfully booked via MCP but DB save failed, attempt compensation
      if (mcpAppointment) {
        this.logOrphanedAppointment(mcpAppointment, context.patientId, error);
        
        // Attempt to cancel the MCP booking (saga compensation)
        await this.compensateMCPBooking(mcpAppointment.id);
        
        throw this.createOrphanedAppointmentError(mcpAppointment.id, error);
      }
      
      // If MCP booking itself failed, just re-throw
      throw error;
    }
  }

  /**
   * Normalize follow-up intent with default values
   */
  private normalizeFollowUpIntent(intent: {
    type?: AppointmentType;
    duration?: number;
    reason?: string;
    instructions?: string;
  }): Required<Pick<FollowUpOutput, 'type' | 'duration' | 'reason' | 'instructions'>> {
    const appointmentType = intent.type || AppointmentType.FOLLOW_UP;
    const defaultDuration = FollowUpSchedulerAgent.DEFAULT_DURATIONS[appointmentType];

    return {
      type: appointmentType,
      duration: intent.duration || defaultDuration,
      reason: intent.reason || 'Follow-up appointment',
      instructions: intent.instructions || '',
    };
  }

  /**
   * Detect if a follow-up appointment is needed
   */
  private async detectFollowUpIntent(transcriptText: string): Promise<FollowUpIntent> {
    // Early return for empty transcript
    if (!transcriptText || transcriptText.trim().length === 0) {
      logger.warn('[Follow-up Scheduler] Empty transcript provided, skipping follow-up detection');
      return { needed: false };
    }

    const userPrompt = this.buildFollowUpDetectionPrompt(transcriptText);

    try {
      const response = await llmService.generateCompletion(
        [
          { role: 'system', content: FollowUpSchedulerAgent.FOLLOW_UP_DETECTION_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        {
          provider: 'openai',
          model: this.model,
          temperature: 0.2,
          maxTokens: 500,
        }
      );

      const parsed = this.parseStructuredOutput<FollowUpIntent>(response.content, {});

      // Validate and normalize the parsed response
      if (parsed.needed && parsed.type) {
        return {
          needed: true,
          type: parsed.type,
          timeframe: parsed.timeframe,
          duration: parsed.duration,
          reason: parsed.reason,
          instructions: parsed.instructions,
        };
      }

      return { needed: false };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('[Follow-up Scheduler] Failed to detect follow-up intent:', {
        error: errorMessage,
        transcriptLength: transcriptText.length,
      });

      // Return false for parsing/network errors to avoid blocking the workflow
      return { needed: false };
    }
  }

  /**
   * Build user prompt for follow-up detection
   */
  private buildFollowUpDetectionPrompt(transcriptText: string): string {
    return `Analyze this consultation transcript and detect follow-up appointment intent:

${transcriptText}

Respond with JSON only.`;
  }

  /**
   * Find an available appointment slot
   */
  private async findAvailableSlot(
    timeframe: string,
    duration: number,
    preferredDoctorId: string
  ): Promise<AvailabilitySlot | null> {
    try {
      // Parse timeframe to get target date
      const targetDate = this.parseTimeframe(timeframe);

      // Check availability for the target date
      const availability = await mcpClient.checkAvailability(
        targetDate.toISOString().split('T')[0],
        preferredDoctorId,
        undefined,
        duration
      );

      if (availability.length === 0) {
        return null;
      }

      // Find first available slot for preferred doctor
      const doctorAvailability = availability.find(a => a.doctorId === preferredDoctorId);
      if (!doctorAvailability) {
        return null;
      }

      const availableSlot = doctorAvailability.availableSlots.find(slot => slot.isAvailable);
      if (!availableSlot) {
        return null;
      }

      return {
        scheduledAt: availableSlot.startTime,
        doctorId: doctorAvailability.doctorId,
        doctorName: doctorAvailability.doctorName,
      };
    } catch (error) {
      logger.error('[Follow-up Scheduler] Failed to find available slot:', error);
      return null;
    }
  }

  /**
   * Parse timeframe string to date
   */
  private parseTimeframe(timeframe: string): Date {
    const now = new Date();
    const lowerTimeframe = timeframe.toLowerCase();

    // Extract number and unit
    const match = lowerTimeframe.match(/(\d+)\s*(day|week|month|year)s?/);
    if (!match) {
      // Default to 2 weeks if parsing fails
      now.setDate(now.getDate() + 14);
      return now;
    }

    const amount = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case 'day':
        now.setDate(now.getDate() + amount);
        return now;
      case 'week':
        now.setDate(now.getDate() + amount * 7);
        return now;
      case 'month':
        now.setMonth(now.getMonth() + amount);
        return now;
      case 'year':
        now.setFullYear(now.getFullYear() + amount);
        return now;
      default:
        now.setDate(now.getDate() + 14);
        return now;
    }
  }

  /**
   * Approve appointment
   */
  async approveAppointment(consultationId: string): Promise<void> {
    try {
      await prisma.appointment.update({
        where: { consultationId },
        data: {
          isApproved: true,
          approvedAt: new Date(),
        },
      });

      logger.info(`[Follow-up Scheduler] Appointment approved for consultation ${consultationId}`);
    } catch (error) {
      logger.error('[Follow-up Scheduler] Failed to approve appointment:', error);
      throw new Error('Failed to approve appointment');
    }
  }
}

// Export singleton instance
export const followUpSchedulerAgent = new FollowUpSchedulerAgent();

// Made with Bob