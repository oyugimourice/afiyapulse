import { BaseAgent, AgentContext } from './base.agent';
import { AgentType, AgentStatus } from '@afiyapulse/shared-types';
import { prisma } from '@afiyapulse/database';
import llmService from '../services/llm.service';
import mcpClient from '../services/mcp-client.service';
import logger from '../config/logger';

interface FollowUpOutput {
  type: 'FOLLOW_UP' | 'LAB_WORK' | 'IMAGING' | 'SPECIALIST' | 'PROCEDURE';
  scheduledAt: string;
  reason: string;
  instructions: string;
  duration: number;
  doctorId: string;
  doctorName: string;
}

export class FollowUpSchedulerAgent extends BaseAgent {
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
   */
  async process(context: AgentContext): Promise<FollowUpOutput | null> {
    try {
      this.validateContext(context);
      this.updateStatus(AgentStatus.PROCESSING, 'Analyzing consultation for follow-up needs');

      // Extract transcript text
      const transcriptText = this.extractTranscriptText(context);

      // Detect if follow-up is needed
      const followUpIntent = await this.detectFollowUpIntent(transcriptText);

      if (!followUpIntent.needed) {
        this.updateStatus(AgentStatus.COMPLETED, 'No follow-up appointment needed');
        return null;
      }

      // Get patient information
      const patient = await prisma.patient.findUnique({
        where: { id: context.patientId },
        select: {
          firstName: true,
          lastName: true,
        },
      });

      if (!patient) {
        throw new Error('Patient not found');
      }

      // Check doctor availability
      this.updateStatus(AgentStatus.PROCESSING, 'Checking doctor availability');
      const availability = await this.findAvailableSlot(
        followUpIntent.timeframe || '2 weeks',
        followUpIntent.duration || 30,
        context.doctorId
      );

      if (!availability) {
        throw new Error('No available slots found for follow-up appointment');
      }

      // Book the appointment
      this.updateStatus(AgentStatus.PROCESSING, 'Booking follow-up appointment');
      const appointment = await mcpClient.bookAppointment({
        patientId: context.patientId,
        patientName: `${patient.firstName} ${patient.lastName}`,
        doctorId: availability.doctorId,
        scheduledAt: availability.scheduledAt,
        type: followUpIntent.type || 'FOLLOW_UP',
        duration: followUpIntent.duration || 30,
        reason: followUpIntent.reason,
        notes: followUpIntent.instructions,
      });

      // Save to database
      this.updateStatus(AgentStatus.PROCESSING, 'Saving appointment');
      await prisma.appointment.create({
        data: {
          consultationId: context.consultationId,
          patientId: context.patientId,
          scheduledAt: new Date(appointment.scheduledAt),
          type: appointment.type,
          reason: appointment.reason,
          isApproved: false,
        },
      });

      this.updateStatus(AgentStatus.COMPLETED, 'Follow-up appointment scheduled successfully');

      return {
        type: followUpIntent.type || 'FOLLOW_UP',
        scheduledAt: availability.scheduledAt,
        reason: followUpIntent.reason || 'Follow-up appointment',
        instructions: followUpIntent.instructions || '',
        duration: followUpIntent.duration || 30,
        doctorId: availability.doctorId,
        doctorName: availability.doctorName,
      };
    } catch (error) {
      this.handleError(error as Error, 'Failed to schedule follow-up');
      throw error;
    }
  }

  /**
   * Detect if a follow-up appointment is needed
   */
  private async detectFollowUpIntent(transcriptText: string): Promise<{
    needed: boolean;
    type?: 'FOLLOW_UP' | 'LAB_WORK' | 'IMAGING' | 'SPECIALIST' | 'PROCEDURE';
    timeframe?: string;
    duration?: number;
    reason?: string;
    instructions?: string;
  }> {
    const systemPrompt = `You are a medical AI assistant analyzing doctor-patient consultations.
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

    const prompt = `Analyze this consultation transcript and detect follow-up appointment intent:

${transcriptText}

Respond with JSON only.`;

    try {
      const response = await llmService.generateCompletion(
        [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        {
          provider: 'openai',
          model: this.model,
          temperature: 0.2,
          maxTokens: 500,
        }
      );

      return this.parseStructuredOutput(response.content, {});
    } catch (error) {
      logger.error('[Follow-up Scheduler] Failed to detect follow-up intent:', error);
      return { needed: false };
    }
  }

  /**
   * Find an available appointment slot
   */
  private async findAvailableSlot(
    timeframe: string,
    duration: number,
    preferredDoctorId: string
  ): Promise<{
    scheduledAt: string;
    doctorId: string;
    doctorName: string;
  } | null> {
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