import { z } from 'zod';

/**
 * Drug information schema
 */
export const DrugSchema = z.object({
  id: z.string(),
  name: z.string(),
  genericName: z.string(),
  brandNames: z.array(z.string()),
  category: z.string(),
  description: z.string(),
  indications: z.array(z.string()),
  contraindications: z.array(z.string()),
  sideEffects: z.array(z.string()),
  dosageForm: z.string(),
  strength: z.string(),
  route: z.string(),
  frequency: z.string(),
  duration: z.string().optional(),
  warnings: z.array(z.string()),
  pregnancyCategory: z.string().optional(),
  lactationSafety: z.string().optional(),
});

export type Drug = z.infer<typeof DrugSchema>;

/**
 * Drug interaction schema
 */
export const DrugInteractionSchema = z.object({
  drug1: z.string(),
  drug2: z.string(),
  severity: z.enum(['minor', 'moderate', 'major', 'contraindicated']),
  description: z.string(),
  clinicalEffects: z.string(),
  management: z.string(),
});

export type DrugInteraction = z.infer<typeof DrugInteractionSchema>;

/**
 * Dosage recommendation schema
 */
export const DosageRecommendationSchema = z.object({
  drugId: z.string(),
  indication: z.string(),
  ageGroup: z.enum(['pediatric', 'adult', 'geriatric']),
  minDose: z.number(),
  maxDose: z.number(),
  unit: z.string(),
  frequency: z.string(),
  route: z.string(),
  duration: z.string().optional(),
  adjustments: z.array(z.object({
    condition: z.string(),
    adjustment: z.string(),
  })).optional(),
});

export type DosageRecommendation = z.infer<typeof DosageRecommendationSchema>;

/**
 * Drug search parameters
 */
export const DrugSearchParamsSchema = z.object({
  query: z.string(),
  category: z.string().optional(),
  limit: z.number().optional().default(10),
});

export type DrugSearchParams = z.infer<typeof DrugSearchParamsSchema>;

/**
 * Interaction check parameters
 */
export const InteractionCheckParamsSchema = z.object({
  drugs: z.array(z.string()).min(2),
});

export type InteractionCheckParams = z.infer<typeof InteractionCheckParamsSchema>;

/**
 * Dosage validation parameters
 */
export const DosageValidationParamsSchema = z.object({
  drugId: z.string(),
  dose: z.number(),
  unit: z.string(),
  frequency: z.string(),
  patientAge: z.number(),
  patientWeight: z.number().optional(),
  indication: z.string().optional(),
});

export type DosageValidationParams = z.infer<typeof DosageValidationParamsSchema>;

// Made with Bob
