import { BaseAgent, AgentContext } from './base.agent';
import { prisma } from '@afiyapulse/database';
import llmService from '../services/llm.service';
import logger from '../config/logger';

interface SOAPNoteOutput {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  chiefComplaint: string;
  diagnosis: string;
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
  };
}

export class ClinicalScribeAgent extends BaseAgent {
  constructor() {
    super({
      name: 'Clinical Scribe',
      type: 'scribe',
      description: 'Generates structured SOAP notes from consultation transcripts',
      model: process.env.SCRIBE_MODEL || 'gpt-4',
      temperature: 0.3, // Lower temperature for more consistent medical documentation
      maxTokens: 3000,
    });
  }

  /**
   * Process consultation and generate SOAP note
   */
  async process(context: AgentContext): Promise<SOAPNoteOutput> {
    try {
      this.validateContext(context);
      this.updateStatus('processing', 'Analyzing consultation transcript');

      // Extract transcript text
      const transcriptText = this.extractTranscriptText(context);

      // Get patient information
      const patient = await prisma.patient.findUnique({
        where: { id: context.patientId },
        select: {
          firstName: true,
          lastName: true,
          dob: true,
          gender: true,
          allergies: true,
          medicalHistory: true,
        },
      });

      if (!patient) {
        throw new Error('Patient not found');
      }

      // Generate SOAP note
      this.updateStatus('processing', 'Generating SOAP note');
      const soapNote = await this.generateSOAPNote(transcriptText, patient);

      // Save to database
      this.updateStatus('processing', 'Saving SOAP note');
      await this.saveSOAPNote(context.consultationId, soapNote);

      this.updateStatus('completed', 'SOAP note generated successfully');
      
      this.sendMessage({
        type: 'document_generated',
        agentType: 'scribe',
        content: 'SOAP note has been generated and is ready for review',
        data: soapNote,
      });

      return soapNote;
    } catch (error) {
      this.handleError(error as Error, 'Failed to generate SOAP note');
      throw error;
    }
  }

  /**
   * Generate SOAP note using LLM
   */
  private async generateSOAPNote(
    transcript: string,
    patient: any
  ): Promise<SOAPNoteOutput> {
    const systemPrompt = `You are an expert medical scribe assistant. Your task is to generate a comprehensive SOAP (Subjective, Objective, Assessment, Plan) note from a doctor-patient consultation transcript.

Guidelines:
- Extract all relevant medical information accurately
- Use proper medical terminology
- Be concise but thorough
- Include vital signs if mentioned
- Identify the chief complaint clearly
- Provide a clear diagnosis or differential diagnosis
- Structure the plan with specific, actionable items
- Maintain professional medical documentation standards

Patient Information:
- Name: ${patient.firstName} ${patient.lastName}
- DOB: ${patient.dob}
- Gender: ${patient.gender}
- Known Allergies: ${patient.allergies?.join(', ') || 'None documented'}
- Medical History: ${patient.medicalHistory || 'None documented'}`;

    const userPrompt = `Based on the following consultation transcript, generate a structured SOAP note:

${transcript}

Return your response as a JSON object with the following structure:
{
  "chiefComplaint": "Brief description of the main reason for visit",
  "subjective": "Patient's description of symptoms, history of present illness, relevant past medical history",
  "objective": "Physical examination findings, vital signs, lab results if mentioned",
  "assessment": "Clinical impression, diagnosis or differential diagnosis",
  "plan": "Treatment plan, medications, follow-up instructions, patient education",
  "diagnosis": "Primary diagnosis",
  "vitalSigns": {
    "bloodPressure": "120/80",
    "heartRate": 72,
    "temperature": 98.6,
    "respiratoryRate": 16,
    "oxygenSaturation": 98
  }
}

Only include vitalSigns if they are explicitly mentioned in the transcript.`;

    const response = await llmService.generateStructuredOutput<SOAPNoteOutput>(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      {
        provider: 'openai',
        model: this.model,
        temperature: this.temperature,
        maxTokens: this.maxTokens,
      }
    );

    return response;
  }

  /**
   * Save SOAP note to database
   */
  private async saveSOAPNote(
    consultationId: string,
    soapNote: SOAPNoteOutput
  ): Promise<void> {
    await prisma.sOAPNote.create({
      data: {
        consultationId,
        chiefComplaint: soapNote.chiefComplaint,
        subjective: soapNote.subjective,
        objective: soapNote.objective,
        assessment: soapNote.assessment,
        plan: soapNote.plan,
        diagnosis: soapNote.diagnosis,
        vitalSigns: soapNote.vitalSigns as any,
        approved: false,
      },
    });

    logger.info(`SOAP note saved for consultation ${consultationId}`);
  }

  /**
   * Update existing SOAP note
   */
  async updateSOAPNote(
    soapNoteId: string,
    updates: Partial<SOAPNoteOutput>
  ): Promise<void> {
    await prisma.sOAPNote.update({
      where: { id: soapNoteId },
      data: updates,
    });

    logger.info(`SOAP note ${soapNoteId} updated`);
  }

  /**
   * Approve SOAP note
   */
  async approveSOAPNote(soapNoteId: string, doctorId: string): Promise<void> {
    await prisma.sOAPNote.update({
      where: { id: soapNoteId },
      data: {
        approved: true,
        approvedAt: new Date(),
        approvedBy: doctorId,
      },
    });

    logger.info(`SOAP note ${soapNoteId} approved by ${doctorId}`);
  }
}

export default new ClinicalScribeAgent();

// Made with Bob
