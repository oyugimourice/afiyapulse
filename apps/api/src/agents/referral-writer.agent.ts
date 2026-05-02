import { BaseAgent, AgentContext } from './base.agent';
import { AgentType, AgentStatus } from '@afiyapulse/shared-types';
import { prisma } from '@afiyapulse/database';
import llmService from '../services/llm.service';
import mcpClient from '../services/mcp-client.service';
import logger from '../config/logger';

interface ReferralOutput {
  specialty: string;
  reason: string;
  urgency: 'ROUTINE' | 'URGENT' | 'EMERGENCY';
  clinicalSummary: string;
  relevantHistory: string;
  currentMedications: string;
  recentLabResults: string;
  specificQuestions: string[];
  notes: string;
}

export class ReferralWriterAgent extends BaseAgent {
  constructor() {
    super({
      name: 'Referral Writer',
      type: AgentType.REFERRAL,
      description: 'Generates specialist referral letters with patient history',
      model: process.env.REFERRAL_MODEL || 'gpt-4',
      temperature: 0.3, // Low temperature for accurate medical referrals
      maxTokens: 3000,
    });
  }

  /**
   * Process consultation and generate referral
   */
  async process(context: AgentContext): Promise<ReferralOutput | null> {
    try {
      this.validateContext(context);
      this.updateStatus(AgentStatus.PROCESSING, 'Analyzing consultation for referral intent');

      // Extract transcript text
      const transcriptText = this.extractTranscriptText(context);

      // Detect if referral is needed
      const referralIntent = await this.detectReferralIntent(transcriptText);

      if (!referralIntent.needed) {
        this.updateStatus(AgentStatus.COMPLETED, 'No referral needed');
        return null;
      }

      // Get comprehensive patient history from FHIR EHR
      this.updateStatus(AgentStatus.PROCESSING, 'Retrieving patient history from EHR');
      const patientHistory = await mcpClient.getPatientHistory(context.patientId, false, 10);

      // Generate referral letter
      this.updateStatus(AgentStatus.PROCESSING, 'Generating referral letter');
      const referralData = await this.generateReferral(
        transcriptText,
        patientHistory,
        referralIntent
      );

      // Save referral to database
      this.updateStatus(AgentStatus.PROCESSING, 'Saving referral');
      await this.saveReferral(context.consultationId, context.patientId, referralData);

      this.updateStatus(AgentStatus.COMPLETED, 'Referral generated successfully');

      return referralData;
    } catch (error) {
      this.handleError(error as Error, 'Failed to generate referral');
      throw error;
    }
  }

  /**
   * Detect if a referral is needed from the transcript
   */
  private async detectReferralIntent(transcriptText: string): Promise<{
    needed: boolean;
    specialty?: string;
    urgency?: 'ROUTINE' | 'URGENT' | 'EMERGENCY';
    reason?: string;
  }> {
    const systemPrompt = `You are a medical AI assistant analyzing doctor-patient consultations.
Your task is to detect if the doctor intends to refer the patient to a specialist.

Look for phrases like:
- "I'm going to refer you to..."
- "You need to see a specialist"
- "I'll send you to cardiology/neurology/etc."
- "You should see an orthopedist/cardiologist/etc."
- Any mention of specialist consultation

Determine:
1. If a referral is needed (true/false)
2. The specialty (e.g., "Cardiology", "Neurology", "Orthopedics")
3. The urgency level (ROUTINE, URGENT, or EMERGENCY)
4. Brief reason for referral

Respond ONLY with valid JSON in this exact format:
{
  "needed": boolean,
  "specialty": "string or null",
  "urgency": "ROUTINE|URGENT|EMERGENCY or null",
  "reason": "string or null"
}`;

    const prompt = `Analyze this consultation transcript and detect referral intent:

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
      logger.error('[Referral Writer] Failed to detect referral intent:', error);
      return { needed: false };
    }
  }

  /**
   * Generate comprehensive referral letter
   */
  private async generateReferral(
    transcriptText: string,
    patientHistory: any,
    referralIntent: any
  ): Promise<ReferralOutput> {
    // Format patient history for the prompt
    const historyText = this.formatPatientHistory(patientHistory);

    const systemPrompt = `You are a medical AI assistant helping doctors write specialist referral letters.

Your task is to create a comprehensive, professional referral letter that includes:
1. Clear reason for referral
2. Relevant clinical summary from the consultation
3. Pertinent patient history (conditions, medications, procedures)
4. Recent lab results and vitals
5. Specific questions or concerns for the specialist

Be concise but thorough. Use professional medical language.

Respond ONLY with valid JSON in this exact format:
{
  "specialty": "string",
  "reason": "string",
  "urgency": "ROUTINE|URGENT|EMERGENCY",
  "clinicalSummary": "string",
  "relevantHistory": "string",
  "currentMedications": "string",
  "recentLabResults": "string",
  "specificQuestions": ["string"],
  "notes": "string"
}`;

    const prompt = `Generate a specialist referral letter based on this information:

CONSULTATION TRANSCRIPT:
${transcriptText}

PATIENT HISTORY:
${historyText}

REFERRAL INTENT:
- Specialty: ${referralIntent.specialty}
- Urgency: ${referralIntent.urgency}
- Reason: ${referralIntent.reason}

Create a comprehensive referral letter. Respond with JSON only.`;

    try {
      const response = await llmService.generateCompletion(
        [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        {
          provider: 'openai',
          model: this.model,
          temperature: 0.3,
          maxTokens: 3000,
        }
      );

      return this.parseStructuredOutput(response.content, {});
    } catch (error) {
      logger.error('[Referral Writer] Failed to generate referral:', error);
      throw new Error('Failed to generate referral letter');
    }
  }

  /**
   * Format patient history for LLM prompt
   */
  private formatPatientHistory(history: any): string {
    const sections: string[] = [];

    // Patient demographics
    sections.push(`PATIENT INFORMATION:
Name: ${history.patient.firstName} ${history.patient.lastName}
MRN: ${history.patient.mrn}
DOB: ${history.patient.dob}
Gender: ${history.patient.gender}
Allergies: ${history.patient.allergies.join(', ') || 'None documented'}`);

    // Active conditions
    if (history.activeConditions.length > 0) {
      sections.push(`\nACTIVE CONDITIONS:`);
      history.activeConditions.forEach((condition: any) => {
        sections.push(`- ${condition.display} (${condition.clinicalStatus}, ${condition.severity || 'unspecified severity'})
  Onset: ${condition.onsetDate}
  ${condition.notes ? `Notes: ${condition.notes}` : ''}`);
      });
    }

    // Current medications
    if (history.activeMedications.length > 0) {
      sections.push(`\nCURRENT MEDICATIONS:`);
      history.activeMedications.forEach((med: any) => {
        sections.push(`- ${med.medicationName} ${med.dosage} ${med.frequency} (${med.route})
  Started: ${med.startDate}
  ${med.reason ? `Indication: ${med.reason}` : ''}`);
      });
    }

    // Recent observations (labs and vitals)
    if (history.recentObservations.length > 0) {
      sections.push(`\nRECENT LAB RESULTS & VITALS:`);
      history.recentObservations.forEach((obs: any) => {
        sections.push(`- ${obs.display}: ${obs.value}${obs.unit ? ' ' + obs.unit : ''} (${obs.effectiveDate})
  ${obs.referenceRange ? `Reference: ${obs.referenceRange}` : ''}
  ${obs.interpretation ? `Interpretation: ${obs.interpretation}` : ''}`);
      });
    }

    // Recent encounters
    if (history.recentEncounters.length > 0) {
      sections.push(`\nRECENT ENCOUNTERS:`);
      history.recentEncounters.slice(0, 3).forEach((enc: any) => {
        sections.push(`- ${enc.type} (${enc.startDate})
  Provider: ${enc.practitioner}
  ${enc.reasonDisplay ? `Reason: ${enc.reasonDisplay}` : ''}
  ${enc.notes ? `Notes: ${enc.notes}` : ''}`);
      });
    }

    // Procedures
    if (history.procedures.length > 0) {
      sections.push(`\nPROCEDURES:`);
      history.procedures.forEach((proc: any) => {
        sections.push(`- ${proc.display} (${proc.performedDate})
  Status: ${proc.status}
  ${proc.outcome ? `Outcome: ${proc.outcome}` : ''}`);
      });
    }

    return sections.join('\n');
  }

  /**
   * Save referral to database
   */
  private async saveReferral(
    consultationId: string,
    patientId: string,
    referralData: ReferralOutput
  ): Promise<void> {
    try {
      // Format notes with all sections
      const formattedNotes = `CLINICAL SUMMARY:
${referralData.clinicalSummary}

RELEVANT HISTORY:
${referralData.relevantHistory}

CURRENT MEDICATIONS:
${referralData.currentMedications}

RECENT LAB RESULTS:
${referralData.recentLabResults}

SPECIFIC QUESTIONS FOR SPECIALIST:
${referralData.specificQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

${referralData.notes ? `\nADDITIONAL NOTES:\n${referralData.notes}` : ''}`;

      await prisma.referral.create({
        data: {
          consultationId,
          patientId,
          specialty: referralData.specialty,
          reason: referralData.reason,
          urgency: referralData.urgency,
          notes: formattedNotes,
          isApproved: false,
        },
      });

      logger.info(`[Referral Writer] Referral saved for consultation ${consultationId}`);
    } catch (error) {
      logger.error('[Referral Writer] Failed to save referral:', error);
      throw new Error('Failed to save referral to database');
    }
  }

  /**
   * Approve referral
   */
  async approveReferral(consultationId: string): Promise<void> {
    try {
      await prisma.referral.update({
        where: { consultationId },
        data: {
          isApproved: true,
          approvedAt: new Date(),
        },
      });

      logger.info(`[Referral Writer] Referral approved for consultation ${consultationId}`);
    } catch (error) {
      logger.error('[Referral Writer] Failed to approve referral:', error);
      throw new Error('Failed to approve referral');
    }
  }
}

// Export singleton instance
export const referralWriterAgent = new ReferralWriterAgent();

// Made with Bob