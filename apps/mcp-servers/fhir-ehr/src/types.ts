import { z } from 'zod';

/**
 * FHIR Patient resource schema (simplified)
 */
export const FHIRPatientSchema = z.object({
  id: z.string(),
  mrn: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'UNKNOWN']),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  allergies: z.array(z.string()),
});

export type FHIRPatient = z.infer<typeof FHIRPatientSchema>;

/**
 * FHIR Observation resource (lab results, vitals)
 */
export const FHIRObservationSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  type: z.enum(['LAB', 'VITAL', 'IMAGING']),
  code: z.string(),
  display: z.string(),
  value: z.string(),
  unit: z.string().optional(),
  referenceRange: z.string().optional(),
  status: z.enum(['preliminary', 'final', 'amended', 'corrected']),
  effectiveDate: z.string(),
  interpretation: z.enum(['normal', 'abnormal', 'critical', 'high', 'low']).optional(),
  notes: z.string().optional(),
});

export type FHIRObservation = z.infer<typeof FHIRObservationSchema>;

/**
 * FHIR Condition resource (diagnoses, problems)
 */
export const FHIRConditionSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  code: z.string(),
  display: z.string(),
  clinicalStatus: z.enum(['active', 'recurrence', 'relapse', 'inactive', 'remission', 'resolved']),
  verificationStatus: z.enum(['unconfirmed', 'provisional', 'differential', 'confirmed', 'refuted']),
  severity: z.enum(['mild', 'moderate', 'severe']).optional(),
  onsetDate: z.string(),
  recordedDate: z.string(),
  notes: z.string().optional(),
});

export type FHIRCondition = z.infer<typeof FHIRConditionSchema>;

/**
 * FHIR MedicationStatement resource (medication history)
 */
export const FHIRMedicationStatementSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  medicationName: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  route: z.string(),
  status: z.enum(['active', 'completed', 'entered-in-error', 'intended', 'stopped', 'on-hold']),
  startDate: z.string(),
  endDate: z.string().optional(),
  prescribedBy: z.string().optional(),
  reason: z.string().optional(),
});

export type FHIRMedicationStatement = z.infer<typeof FHIRMedicationStatementSchema>;

/**
 * FHIR Encounter resource (consultation history)
 */
export const FHIREncounterSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  type: z.string(),
  status: z.enum(['planned', 'arrived', 'in-progress', 'finished', 'cancelled']),
  class: z.enum(['inpatient', 'outpatient', 'emergency', 'home-health', 'virtual']),
  startDate: z.string(),
  endDate: z.string().optional(),
  practitioner: z.string(),
  reasonCode: z.string().optional(),
  reasonDisplay: z.string().optional(),
  diagnosis: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type FHIREncounter = z.infer<typeof FHIREncounterSchema>;

/**
 * FHIR Procedure resource (surgical/medical procedures)
 */
export const FHIRProcedureSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  code: z.string(),
  display: z.string(),
  status: z.enum(['preparation', 'in-progress', 'completed', 'not-done', 'stopped']),
  performedDate: z.string(),
  performer: z.string().optional(),
  outcome: z.string().optional(),
  notes: z.string().optional(),
});

export type FHIRProcedure = z.infer<typeof FHIRProcedureSchema>;

/**
 * Patient history summary
 */
export const PatientHistorySummarySchema = z.object({
  patient: FHIRPatientSchema,
  activeConditions: z.array(FHIRConditionSchema),
  activeMedications: z.array(FHIRMedicationStatementSchema),
  recentEncounters: z.array(FHIREncounterSchema),
  recentObservations: z.array(FHIRObservationSchema),
  procedures: z.array(FHIRProcedureSchema),
});

export type PatientHistorySummary = z.infer<typeof PatientHistorySummarySchema>;

/**
 * Tool parameter schemas
 */
export const GetPatientParamsSchema = z.object({
  patientId: z.string(),
});

export type GetPatientParams = z.infer<typeof GetPatientParamsSchema>;

export const GetPatientHistoryParamsSchema = z.object({
  patientId: z.string(),
  includeInactive: z.boolean().optional().default(false),
  limit: z.number().optional().default(10),
});

export type GetPatientHistoryParams = z.infer<typeof GetPatientHistoryParamsSchema>;

export const GetObservationsParamsSchema = z.object({
  patientId: z.string(),
  type: z.enum(['LAB', 'VITAL', 'IMAGING']).optional(),
  fromDate: z.string().optional(),
  limit: z.number().optional().default(20),
});

export type GetObservationsParams = z.infer<typeof GetObservationsParamsSchema>;

export const GetConditionsParamsSchema = z.object({
  patientId: z.string(),
  clinicalStatus: z.enum(['active', 'recurrence', 'relapse', 'inactive', 'remission', 'resolved']).optional(),
  limit: z.number().optional().default(20),
});

export type GetConditionsParams = z.infer<typeof GetConditionsParamsSchema>;

export const GetMedicationHistoryParamsSchema = z.object({
  patientId: z.string(),
  status: z.enum(['active', 'completed', 'entered-in-error', 'intended', 'stopped', 'on-hold']).optional(),
  limit: z.number().optional().default(20),
});

export type GetMedicationHistoryParams = z.infer<typeof GetMedicationHistoryParamsSchema>;

export const GetEncountersParamsSchema = z.object({
  patientId: z.string(),
  fromDate: z.string().optional(),
  limit: z.number().optional().default(10),
});

export type GetEncountersParams = z.infer<typeof GetEncountersParamsSchema>;

// Made with Bob