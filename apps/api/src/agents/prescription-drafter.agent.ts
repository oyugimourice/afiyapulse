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

interface PatientValidationInfo {
  firstName: string;
  lastName: string;
  dob: Date;
  allergies: string[] | null;
}

interface ValidationResult {
  medication: Medication;
  warnings: string[];
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
  // Prompt templates for medication extraction
  private static readonly MEDICATION_EXTRACTION_SYSTEM_PROMPT = `You are an expert clinical pharmacist assistant. Your task is to extract medication information from a doctor-patient consultation transcript.

Guidelines:
- Extract ONLY medications that the doctor explicitly prescribes or recommends
- Do NOT include medications the patient is already taking unless the doctor modifies them
- Include complete dosing information: drug name, dosage, frequency, duration, route
- Use generic names when possible
- Be precise with dosing instructions
- Include any special instructions mentioned by the doctor`;

  private static readonly MEDICATION_EXTRACTION_USER_PROMPT_TEMPLATE = `Extract all prescribed medications from this consultation transcript:

{{transcript}}

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
      this.updateProcessingStatus('analyzing');

      const transcriptText = this.extractTranscriptText(context);
      const { patient, age } = await this.getPatientWithAge(context.patientId);

      this.updateProcessingStatus('extracting');
      const medications = await this.extractMedications(transcriptText, patient, age);

      if (medications.length === 0) {
        this.updateStatus('completed', 'No medications mentioned in consultation');
        return this.createEmptyPrescription();
      }

      this.updateProcessingStatus('validating');
      this.updateProcessingStatus('saving');
      const validationResult = await this.validateAndSave(
        context.consultationId,
        medications,
        patient,
        age
      );

      this.updateStatus('completed', 'Prescription generated successfully');
      this.notifyPrescriptionGenerated(validationResult);

      return validationResult;
    } catch (error) {
      this.handleError(error as Error, 'Failed to generate prescription');
      throw error;
    }
  }

  /**
   * Get patient information with calculated age
   */
  private async getPatientWithAge(patientId: string): Promise<{
    patient: { firstName: string; lastName: string; dob: Date; allergies: string[] | null };
    age: number;
  }> {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: {
        firstName: true,
        lastName: true,
        dob: true,
        allergies: true,
      },
    });

    if (!patient) {
      throw new Error(`Patient not found: ${patientId}`);
    }

    return {
      patient,
      age: this.calculateAge(patient.dob),
    };
  }

  /**
   * Update processing status with predefined messages
   */
  private updateProcessingStatus(step: 'analyzing' | 'extracting' | 'validating' | 'saving'): void {
    const messages = {
      analyzing: 'Analyzing consultation for medications',
      extracting: 'Extracting medications from transcript',
      validating: 'Validating medications and checking interactions',
      saving: 'Saving prescription',
    };
    
    this.updateStatus('processing', messages[step]);
  }

  /**
   * Create empty prescription output
   */
  private createEmptyPrescription(): PrescriptionOutput {
    return {
      medications: [],
      interactions: [],
      warnings: [],
      notes: 'No medications were prescribed during this consultation',
    };
  }

  /**
   * Validate medications and save prescription
   */
  private async validateAndSave(
    consultationId: string,
    medications: Medication[],
    patient: PatientValidationInfo,
    patientAge: number
  ): Promise<PrescriptionOutput> {
    const validationResult = await this.validateMedications(medications, patient, patientAge);
    
    await this.savePrescription(
      consultationId,
      validationResult.medications,
      validationResult.interactions,
      validationResult.warnings
    );
    
    return validationResult;
  }

  /**
   * Notify that prescription has been generated
   */
  private notifyPrescriptionGenerated(validationResult: PrescriptionOutput): void {
    this.sendMessage({
      type: 'document_generated',
      agentType: 'prescription',
      content: 'Prescription has been generated and is ready for review',
      data: validationResult,
    });
  }

  /**
   * Extract medications from transcript using LLM
   */
  private async extractMedications(
    transcript: string,
    patient: PatientValidationInfo,
    patientAge: number
  ): Promise<Medication[]> {
    // Validate inputs
    if (!transcript?.trim()) {
      logger.warn('Empty transcript provided for medication extraction');
      return [];
    }

    if (patientAge < 0 || patientAge > 150) {
      logger.warn('Invalid patient age', { patientAge });
      throw new Error(`Invalid patient age: ${patientAge}`);
    }

    try {
      logger.info('Extracting medications from transcript', {
        patientAge,
        hasAllergies: !!patient.allergies?.length,
        transcriptLength: transcript.length,
      });

      const systemPrompt = this.buildSystemPrompt(patientAge, patient.allergies);
      const userPrompt = this.buildUserPrompt(transcript);

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

      if (!this.isMedicationArray(response)) {
        logger.warn('LLM returned invalid medication format', { response });
        return [];
      }

      logger.info('Successfully extracted medications', {
        count: response.length,
      });

      return response;
    } catch (error) {
      logger.error('Failed to extract medications', {
        error: error instanceof Error ? error.message : 'Unknown error',
        patientAge,
      });
      return []; // Graceful degradation
    }
  }

  /**
   * Build system prompt with patient information
   */
  private buildSystemPrompt(patientAge: number, allergies: string[] | null): string {
    const allergyInfo = allergies?.join(', ') || 'None documented';

    return `${PrescriptionDrafterAgent.MEDICATION_EXTRACTION_SYSTEM_PROMPT}

Patient Information:
- Age: ${patientAge} years
- Known Allergies: ${allergyInfo}`;
  }

  /**
   * Build user prompt with transcript
   */
  private buildUserPrompt(transcript: string): string {
    return PrescriptionDrafterAgent.MEDICATION_EXTRACTION_USER_PROMPT_TEMPLATE.replace(
      '{{transcript}}',
      transcript
    );
  }

  /**
   * Type guard to validate medication array structure
   */
  private isMedicationArray(data: unknown): data is Medication[] {
    if (!Array.isArray(data)) return false;

    return data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.drugName === 'string' &&
        typeof item.genericName === 'string' &&
        typeof item.dosage === 'string' &&
        typeof item.frequency === 'string' &&
        typeof item.duration === 'string' &&
        typeof item.route === 'string' &&
        typeof item.instructions === 'string' &&
        (item.refills === undefined || typeof item.refills === 'number')
    );
  }

  /**
   * Build allergy warning message
   */
  private buildAllergyWarning(drugName: string): string {
    return `ALLERGY ALERT: Patient has documented allergy that may interact with ${drugName}`;
  }

  /**
   * Build contraindication warning message
   */
  private buildContraindicationWarning(drugName: string, contraindications: string[]): string {
    return `Contraindications for ${drugName}: ${contraindications.join(', ')}`;
  }

  /**
   * Build dosage warning message
   */
  private buildDosageWarning(drugName: string, message: string): string {
    return `Dosage warning for ${drugName}: ${message}`;
  }

  /**
   * Build interaction warning message
   */
  private buildInteractionWarning(interaction: {
    severity: string;
    drug1: string;
    drug2: string;
    description: string;
  }): string {
    return `${interaction.severity.toUpperCase()} interaction: ${interaction.drug1} + ${interaction.drug2} - ${interaction.description}`;
  }

  /**
   * Validate a single medication
   */
  private async validateSingleMedication(
    med: Medication,
    patient: PatientValidationInfo,
    patientAge: number
  ): Promise<ValidationResult> {
    const warnings: string[] = [];

    // Search for drug in database
    const drugResults = await mcpClient.searchDrugs(med.genericName || med.drugName, undefined, 1);

    if (drugResults.length === 0) {
      warnings.push(`Drug not found in database: ${med.drugName}. Manual verification required.`);
      return { medication: med, warnings };
    }

    const drugInfo = drugResults[0];

    // Check for allergies
    if (patient.allergies && patient.allergies.length > 0) {
      const allergyMatch = patient.allergies.some((allergy: string) =>
        drugInfo.name.toLowerCase().includes(allergy.toLowerCase()) ||
        drugInfo.category.toLowerCase().includes(allergy.toLowerCase())
      );

      if (allergyMatch) {
        warnings.push(this.buildAllergyWarning(drugInfo.name));
      }
    }

    // Check contraindications
    if (drugInfo.contraindications && drugInfo.contraindications.length > 0) {
      warnings.push(this.buildContraindicationWarning(drugInfo.name, drugInfo.contraindications));
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
          warnings.push(this.buildDosageWarning(drugInfo.name, dosageValidation.message));
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      warnings.push(`Failed to validate dosage for ${drugInfo.name}: ${errorMessage}`);
      logger.error(`Dosage validation error for ${drugInfo.name}:`, error);
    }

    return {
      medication: {
        ...med,
        genericName: drugInfo.genericName,
      },
      warnings,
    };
  }

  /**
   * Check for drug-drug interactions
   */
  private async checkMedicationInteractions(
    medications: Medication[]
  ): Promise<{ interactions: Array<any>; warnings: string[] }> {
    const warnings: string[] = [];
    let interactions: Array<any> = [];

    if (medications.length >= 2) {
      const drugIds = medications
        .map(med => med.genericName.toLowerCase())
        .filter(Boolean);

      const interactionResult = await mcpClient.checkDrugInteractions(drugIds);
      interactions = interactionResult.interactions;

      if (interactions.length > 0) {
        interactions.forEach(interaction => {
          warnings.push(this.buildInteractionWarning(interaction));
        });
      }
    }

    return { interactions, warnings };
  }

  /**
   * Validate medications and check for interactions
   */
  private async validateMedications(
    medications: Medication[],
    patient: PatientValidationInfo,
    patientAge: number
  ): Promise<PrescriptionOutput> {
    // Validate all medications in parallel
    const validationPromises = medications.map(med =>
      this.validateSingleMedication(med, patient, patientAge)
    );
    const validationResults = await Promise.all(validationPromises);

    // Collect validated medications and warnings
    const validatedMedications = validationResults.map(result => result.medication);
    const warnings = validationResults.flatMap(result => result.warnings);

    // Check for drug-drug interactions
    const { interactions, warnings: interactionWarnings } = await this.checkMedicationInteractions(
      validatedMedications
    );
    warnings.push(...interactionWarnings);

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
    interactions: Array<any>,
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
