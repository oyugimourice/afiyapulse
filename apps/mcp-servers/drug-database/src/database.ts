import { Drug, DrugInteraction, DosageRecommendation } from './types';

/**
 * In-memory drug database
 * In production, this would be replaced with a real database
 */
export class DrugDatabase {
  private drugs: Map<string, Drug> = new Map();
  private interactions: DrugInteraction[] = [];
  private dosageRecommendations: Map<string, DosageRecommendation[]> = new Map();

  constructor() {
    this.initializeDatabase();
  }

  /**
   * Initialize database with sample drugs
   */
  private initializeDatabase() {
    // Common medications
    const sampleDrugs: Drug[] = [
      {
        id: 'amoxicillin',
        name: 'Amoxicillin',
        genericName: 'Amoxicillin',
        brandNames: ['Amoxil', 'Trimox'],
        category: 'Antibiotic',
        description: 'Penicillin antibiotic used to treat bacterial infections',
        indications: ['Bacterial infections', 'Respiratory tract infections', 'Urinary tract infections'],
        contraindications: ['Penicillin allergy', 'Mononucleosis'],
        sideEffects: ['Nausea', 'Diarrhea', 'Rash', 'Allergic reactions'],
        dosageForm: 'Capsule/Suspension',
        strength: '250mg, 500mg',
        route: 'Oral',
        frequency: 'Every 8 hours',
        duration: '7-10 days',
        warnings: ['Complete full course', 'Take with food if stomach upset'],
        pregnancyCategory: 'B',
        lactationSafety: 'Compatible',
      },
      {
        id: 'metformin',
        name: 'Metformin',
        genericName: 'Metformin Hydrochloride',
        brandNames: ['Glucophage', 'Fortamet'],
        category: 'Antidiabetic',
        description: 'Biguanide antidiabetic medication for type 2 diabetes',
        indications: ['Type 2 diabetes mellitus', 'Polycystic ovary syndrome'],
        contraindications: ['Renal impairment', 'Metabolic acidosis', 'Severe liver disease'],
        sideEffects: ['Nausea', 'Diarrhea', 'Abdominal pain', 'Lactic acidosis (rare)'],
        dosageForm: 'Tablet',
        strength: '500mg, 850mg, 1000mg',
        route: 'Oral',
        frequency: 'Twice daily with meals',
        warnings: ['Monitor renal function', 'Risk of lactic acidosis', 'Discontinue before contrast studies'],
        pregnancyCategory: 'B',
        lactationSafety: 'Use with caution',
      },
      {
        id: 'lisinopril',
        name: 'Lisinopril',
        genericName: 'Lisinopril',
        brandNames: ['Prinivil', 'Zestril'],
        category: 'ACE Inhibitor',
        description: 'ACE inhibitor for hypertension and heart failure',
        indications: ['Hypertension', 'Heart failure', 'Post-myocardial infarction'],
        contraindications: ['Pregnancy', 'Angioedema history', 'Bilateral renal artery stenosis'],
        sideEffects: ['Dry cough', 'Dizziness', 'Hyperkalemia', 'Angioedema'],
        dosageForm: 'Tablet',
        strength: '5mg, 10mg, 20mg, 40mg',
        route: 'Oral',
        frequency: 'Once daily',
        warnings: ['Monitor blood pressure', 'Check potassium levels', 'Avoid in pregnancy'],
        pregnancyCategory: 'D',
        lactationSafety: 'Use with caution',
      },
      {
        id: 'ibuprofen',
        name: 'Ibuprofen',
        genericName: 'Ibuprofen',
        brandNames: ['Advil', 'Motrin'],
        category: 'NSAID',
        description: 'Nonsteroidal anti-inflammatory drug for pain and inflammation',
        indications: ['Pain', 'Fever', 'Inflammation', 'Arthritis'],
        contraindications: ['NSAID allergy', 'Active GI bleeding', 'Severe renal impairment'],
        sideEffects: ['GI upset', 'Bleeding', 'Renal impairment', 'Cardiovascular events'],
        dosageForm: 'Tablet/Suspension',
        strength: '200mg, 400mg, 600mg, 800mg',
        route: 'Oral',
        frequency: 'Every 6-8 hours as needed',
        duration: 'Short-term use',
        warnings: ['Take with food', 'Avoid in third trimester pregnancy', 'Monitor renal function'],
        pregnancyCategory: 'C (D in third trimester)',
        lactationSafety: 'Compatible',
      },
      {
        id: 'warfarin',
        name: 'Warfarin',
        genericName: 'Warfarin Sodium',
        brandNames: ['Coumadin', 'Jantoven'],
        category: 'Anticoagulant',
        description: 'Vitamin K antagonist anticoagulant',
        indications: ['Atrial fibrillation', 'Deep vein thrombosis', 'Pulmonary embolism', 'Mechanical heart valves'],
        contraindications: ['Active bleeding', 'Pregnancy', 'Severe liver disease'],
        sideEffects: ['Bleeding', 'Bruising', 'Skin necrosis (rare)'],
        dosageForm: 'Tablet',
        strength: '1mg, 2mg, 2.5mg, 3mg, 4mg, 5mg, 6mg, 7.5mg, 10mg',
        route: 'Oral',
        frequency: 'Once daily',
        warnings: ['Regular INR monitoring required', 'Many drug interactions', 'Avoid in pregnancy'],
        pregnancyCategory: 'X',
        lactationSafety: 'Compatible',
      },
    ];

    // Add drugs to database
    sampleDrugs.forEach(drug => this.drugs.set(drug.id, drug));

    // Sample drug interactions
    this.interactions = [
      {
        drug1: 'warfarin',
        drug2: 'ibuprofen',
        severity: 'major',
        description: 'Increased risk of bleeding',
        clinicalEffects: 'NSAIDs can increase the anticoagulant effect of warfarin and increase bleeding risk',
        management: 'Avoid combination if possible. If necessary, monitor INR closely and watch for signs of bleeding',
      },
      {
        drug1: 'metformin',
        drug2: 'lisinopril',
        severity: 'moderate',
        description: 'Increased risk of hypoglycemia',
        clinicalEffects: 'ACE inhibitors may enhance the hypoglycemic effect of antidiabetic agents',
        management: 'Monitor blood glucose levels closely, especially when initiating or changing doses',
      },
      {
        drug1: 'amoxicillin',
        drug2: 'warfarin',
        severity: 'moderate',
        description: 'Increased anticoagulant effect',
        clinicalEffects: 'Antibiotics may alter gut flora and affect vitamin K production, enhancing warfarin effect',
        management: 'Monitor INR more frequently during and after antibiotic course',
      },
    ];

    // Sample dosage recommendations
    this.dosageRecommendations.set('amoxicillin', [
      {
        drugId: 'amoxicillin',
        indication: 'Respiratory tract infection',
        ageGroup: 'adult',
        minDose: 250,
        maxDose: 500,
        unit: 'mg',
        frequency: 'Every 8 hours',
        route: 'Oral',
        duration: '7-10 days',
      },
      {
        drugId: 'amoxicillin',
        indication: 'Respiratory tract infection',
        ageGroup: 'pediatric',
        minDose: 20,
        maxDose: 40,
        unit: 'mg/kg/day',
        frequency: 'Divided every 8 hours',
        route: 'Oral',
        duration: '7-10 days',
      },
    ]);

    this.dosageRecommendations.set('metformin', [
      {
        drugId: 'metformin',
        indication: 'Type 2 diabetes',
        ageGroup: 'adult',
        minDose: 500,
        maxDose: 2000,
        unit: 'mg',
        frequency: 'Twice daily with meals',
        route: 'Oral',
        adjustments: [
          {
            condition: 'Renal impairment (eGFR 30-45)',
            adjustment: 'Maximum 1000mg daily',
          },
          {
            condition: 'Renal impairment (eGFR <30)',
            adjustment: 'Contraindicated',
          },
        ],
      },
    ]);
  }

  /**
   * Search drugs by name or category
   */
  searchDrugs(query: string, category?: string, limit: number = 10): Drug[] {
    const results: Drug[] = [];
    const lowerQuery = query.toLowerCase();

    for (const drug of this.drugs.values()) {
      if (category && drug.category.toLowerCase() !== category.toLowerCase()) {
        continue;
      }

      if (
        drug.name.toLowerCase().includes(lowerQuery) ||
        drug.genericName.toLowerCase().includes(lowerQuery) ||
        drug.brandNames.some(brand => brand.toLowerCase().includes(lowerQuery))
      ) {
        results.push(drug);
        if (results.length >= limit) break;
      }
    }

    return results;
  }

  /**
   * Get drug by ID
   */
  getDrug(drugId: string): Drug | undefined {
    return this.drugs.get(drugId.toLowerCase());
  }

  /**
   * Check interactions between multiple drugs
   */
  checkInteractions(drugIds: string[]): DrugInteraction[] {
    const interactions: DrugInteraction[] = [];
    const normalizedIds = drugIds.map(id => id.toLowerCase());

    for (const interaction of this.interactions) {
      const drug1Lower = interaction.drug1.toLowerCase();
      const drug2Lower = interaction.drug2.toLowerCase();

      if (
        (normalizedIds.includes(drug1Lower) && normalizedIds.includes(drug2Lower)) ||
        (normalizedIds.includes(drug2Lower) && normalizedIds.includes(drug1Lower))
      ) {
        interactions.push(interaction);
      }
    }

    return interactions;
  }

  /**
   * Get dosage recommendations for a drug
   */
  getDosageRecommendations(drugId: string): DosageRecommendation[] {
    return this.dosageRecommendations.get(drugId.toLowerCase()) || [];
  }

  /**
   * Validate dosage
   */
  validateDosage(
    drugId: string,
    dose: number,
    unit: string,
    patientAge: number
  ): {
    valid: boolean;
    message: string;
    recommendations?: DosageRecommendation[];
  } {
    const recommendations = this.getDosageRecommendations(drugId);

    if (recommendations.length === 0) {
      return {
        valid: true,
        message: 'No specific dosage recommendations available for this drug',
      };
    }

    // Determine age group
    const ageGroup = patientAge < 18 ? 'pediatric' : patientAge > 65 ? 'geriatric' : 'adult';

    // Find matching recommendation
    const matchingRec = recommendations.find(
      rec => rec.ageGroup === ageGroup && rec.unit === unit
    );

    if (!matchingRec) {
      return {
        valid: true,
        message: `No specific dosage recommendation for ${ageGroup} patients`,
        recommendations,
      };
    }

    // Check if dose is within range
    if (dose < matchingRec.minDose) {
      return {
        valid: false,
        message: `Dose ${dose}${unit} is below recommended minimum of ${matchingRec.minDose}${unit}`,
        recommendations: [matchingRec],
      };
    }

    if (dose > matchingRec.maxDose) {
      return {
        valid: false,
        message: `Dose ${dose}${unit} exceeds recommended maximum of ${matchingRec.maxDose}${unit}`,
        recommendations: [matchingRec],
      };
    }

    return {
      valid: true,
      message: 'Dosage is within recommended range',
      recommendations: [matchingRec],
    };
  }

  /**
   * Get all drug categories
   */
  getCategories(): string[] {
    const categories = new Set<string>();
    for (const drug of this.drugs.values()) {
      categories.add(drug.category);
    }
    return Array.from(categories).sort();
  }
}

export const drugDatabase = new DrugDatabase();

// Made with Bob
