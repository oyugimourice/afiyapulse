import { BaseAgent, AgentContext } from './base.agent';
import { prisma } from '@afiyapulse/database';
import llmService from '../services/llm.service';
import mcpClient from '../services/mcp-client.service';
import logger from '../config/logger';

interface Medication {
  drugName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  instructions: string;
  refills?: number;
}

interface PrescriptionOutput {
  medications: Medication[];
  interactions: Array<{
    drug1: string;
    drug2: string;
    severity: string;
    description: string;
    management: string;
  }>;
  warnings: string[];
  notes: string;
}

export class PrescriptionDrafterAgent extends BaseAgent {
  constructor() {
    super({
      name: 'Prescription Drafter',
      type: 'prescription',
      description: 'Generates prescriptions with drug interaction validation',
      model: process.env.PRESCRIPTION_MODEL || 'gpt-4',
      temperature: 0.2, // Very low temperature for precise medical prescriptions
      maxTokens: 2000,
    });
  }

  /**
   * Process consultation and generate prescription
   */
  async process(context: AgentContext): Promise<PrescriptionOutput> {
    try {
      this.validateContext(context);
      this.updateStatus('processing', 'Analyzing consultation for medications');

      // Extract transcript text
      const transcriptText = this.extractTranscriptText(context);

      // Get patient information
      const patient = await prisma.patient.findUnique({
        where: { id: context.patientId },
        select: {
          firstName: true,
          lastName: true,
          dob: true,
          allergies: true,
        },
      });

      if (!patient) {
        throw new Error('Patient not found');
      }

      // Calculate patient age
      const patientAge = this.calculateAge(patient.dob);

      // Extract medications from transcript
      this.updateStatus('processing', 'Extracting medications from transcript');
      const medications = await this.extractMedications(transcriptText, patient, patientAge);

      if (medications.length === 0) {
        this.updateStatus('completed', 'No medications mentioned in consultation');
        return {
          medications: [],
          interactions: [],
          warnings: [],
          notes: 'No medications were prescribed during this consultation',
        };
      }

      // Validate medications and check interactions
      this.updateStatus('processing', 'Validating medications and checking interactions');
      const validationResult = await this.validateMedications(medications, patient, patientAge);

      // Save prescription to database
      this.updateStatus('processing', 'Saving prescription');
      await this.savePrescription(
        context.consultationId,
        validationResult.medications,
        validationResult.interactions,
        validationResult.warnings
      );

      this.updateStatus('completed', 'Prescription generated successfully');

      this.sendMessage({
        type: 'document_generated',
        agentType: 'prescription',
        content: 'Prescription has been generated and is ready for review',
        data: validationResult,
      });

      return validationResult;
    } catch (error) {
      this.handleError(error as Error, 'Failed to generate prescription');
      throw error;
    }
  }

  /**
   * Extract medications from transcript using LLM
   */
  private async extractMedications(
    transcript: string,
    patient: any,
    patientAge: number
  ): Promise<Medication[]> {
    const systemPrompt = `You are an expert clinical pharmacist assistant. Your task is to extract medication information from a doctor-patient consultation transcript.

Guidelines:
- Extract ONLY medications that the doctor explicitly prescribes or recommends
- Do NOT include medications the patient is already taking unless the doctor modifies them
- Include complete dosing information: drug name, dosage, frequency, duration, route
- Use generic names when possible
- Be precise with dosing instructions
- Include any special instructions mentioned by the doctor

Patient Information:
- Age: ${patientAge} years
- Known Allergies: ${patient.allergies?.join(', ') || 'None documented'}`;

    const userPrompt = `Extract all prescribed medications from this consultation transcript:

${transcript}

Return your response as a JSON array of medication objects with this structure:
[
  {
    "drugName": "Brand or generic name mentioned by doctor",
    "genericName": "Generic name if known",
    "dosage": "Amount and unit (e.g., 500mg, 10ml)",
    "frequency": "How often (e.g., twice daily, every 8 hours)",
    "duration": "How long (e.g., 7 days, 2 weeks, ongoing)",
    "route": "Administration route (e.g., oral, topical, IV)",
    "instructions": "Special instructions (e.g., take with food, avoid alcohol)",
    "refills": 0
  }
]

If no medications were prescribed, return an empty array: []`;

    const response = await llmService.generateStructuredOutput<Medication[]>(
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

    return Array.isArray(response) ? response : [];
  }

  /**
   * Validate medications and check for interactions
   */
  private async validateMedications(
    medications: Medication[],
    patient: any,
    patientAge: number
  ): Promise<PrescriptionOutput> {
    const warnings: string[] = [];
    const validatedMedications: Medication[] = [];

    // Check each medication
    for (const med of medications) {
      // Search for drug in database
      const drugResults = await mcpClient.searchDrugs(med.genericName || med.drugName, undefined, 1);

      if (drugResults.length === 0) {
        warnings.push(`Drug not found in database: ${med.drugName}. Manual verification required.`);
        validatedMedications.push(med);
        continue;
      }

      const drugInfo = drugResults[0];

      // Check for allergies
      if (patient.allergies && patient.allergies.length > 0) {
        const allergyMatch = patient.allergies.some((allergy: string) =>
          drugInfo.name.toLowerCase().includes(allergy.toLowerCase()) ||
          drugInfo.category.toLowerCase().includes(allergy.toLowerCase())
        );

        if (allergyMatch) {
          warnings.push(
            `ALLERGY ALERT: Patient has documented allergy that may interact with ${drugInfo.name}`
          );
        }
      }

      // Check contraindications
      if (drugInfo.contraindications && drugInfo.contraindications.length > 0) {
        warnings.push(
          `Contraindications for ${drugInfo.name}: ${drugInfo.contraindications.join(', ')}`
        );
      }

      // Validate dosage if possible
      try {
        const dosageAmount = parseFloat(med.dosage);
        if (!isNaN(dosageAmount)) {
          const unit = med.dosage.replace(dosageAmount.toString(), '').trim();
          const dosageValidation = await mcpClient.validateDosage({
            drugId: drugInfo.id,
            dose: dosageAmount,
            unit,
            frequency: med.frequency,
            patientAge,
          });

          if (!dosageValidation.valid) {
            warnings.push(`Dosage warning for ${drugInfo.name}: ${dosageValidation.message}`);
          }
        }
      } catch (error) {
        logger.warn(`Could not validate dosage for ${drugInfo.name}:`, error);
      }

      validatedMedications.push({
        ...med,
        genericName: drugInfo.genericName,
      });
    }

    // Check for drug-drug interactions
    let interactions: any[] = [];
    if (validatedMedications.length >= 2) {
      const drugIds = validatedMedications
        .map(med => med.genericName.toLowerCase())
        .filter(Boolean);

      const interactionResult = await mcpClient.checkDrugInteractions(drugIds);
      interactions = interactionResult.interactions;

      if (interactions.length > 0) {
        interactions.forEach(interaction => {
          warnings.push(
            `${interaction.severity.toUpperCase()} interaction: ${interaction.drug1} + ${interaction.drug2} - ${interaction.description}`
          );
        });
      }
    }

    return {
      medications: validatedMedications,
      interactions,
      warnings,
      notes: warnings.length > 0
        ? 'Please review warnings before approving prescription'
        : 'All medications validated successfully',
    };
  }

  /**
   * Save prescription to database
   */
  private async savePrescription(
    consultationId: string,
    medications: Medication[],
    interactions: any[],
    warnings: string[]
  ): Promise<void> {
    await prisma.prescription.create({
      data: {
        consultationId,
        medications: medications as any,
        interactions: interactions as any,
        warnings,
        approved: false,
      },
    });

    logger.info(`Prescription saved for consultation ${consultationId}`);
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
   * Approve prescription
   */
  async approvePrescription(prescriptionId: string, doctorId: string): Promise<void> {
    await prisma.prescription.update({
      where: { id: prescriptionId },
      data: {
        approved: true,
        approvedAt: new Date(),
        approvedBy: doctorId,
      },
    });

    logger.info(`Prescription ${prescriptionId} approved by ${doctorId}`);
  }

  /**
   * Update prescription
   */
  async updatePrescription(
    prescriptionId: string,
    updates: {
      medications?: Medication[];
      warnings?: string[];
    }
  ): Promise<void> {
    await prisma.prescription.update({
      where: { id: prescriptionId },
      data: updates,
    });

    logger.info(`Prescription ${prescriptionId} updated`);
  }
}

export default new PrescriptionDrafterAgent();

// Made with Bob
