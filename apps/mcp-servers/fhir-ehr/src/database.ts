import {
  FHIRPatient,
  FHIRObservation,
  FHIRCondition,
  FHIRMedicationStatement,
  FHIREncounter,
  FHIRProcedure,
  PatientHistorySummary,
} from './types';

/**
 * In-memory FHIR EHR database
 * In production, this would connect to a real FHIR server or EHR system
 */
export class FHIRDatabase {
  private patients: Map<string, FHIRPatient> = new Map();
  private observations: Map<string, FHIRObservation[]> = new Map();
  private conditions: Map<string, FHIRCondition[]> = new Map();
  private medications: Map<string, FHIRMedicationStatement[]> = new Map();
  private encounters: Map<string, FHIREncounter[]> = new Map();
  private procedures: Map<string, FHIRProcedure[]> = new Map();

  constructor() {
    this.initializeDatabase();
  }

  /**
   * Initialize database with sample patient data
   */
  private initializeDatabase() {
    // Sample patient 1
    const patient1: FHIRPatient = {
      id: 'patient-001',
      mrn: 'MRN-2024-001',
      firstName: 'John',
      lastName: 'Doe',
      dob: '1975-06-15',
      gender: 'MALE',
      phone: '+254712345678',
      email: 'john.doe@example.com',
      address: '123 Main St, Nairobi, Kenya',
      allergies: ['Penicillin', 'Sulfa drugs'],
    };

    this.patients.set(patient1.id, patient1);

    // Patient 1 - Active conditions
    this.conditions.set(patient1.id, [
      {
        id: 'cond-001',
        patientId: patient1.id,
        code: 'E11',
        display: 'Type 2 Diabetes Mellitus',
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        severity: 'moderate',
        onsetDate: '2020-03-15',
        recordedDate: '2020-03-15',
        notes: 'Well controlled with oral medications',
      },
      {
        id: 'cond-002',
        patientId: patient1.id,
        code: 'I10',
        display: 'Essential Hypertension',
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        severity: 'mild',
        onsetDate: '2019-08-20',
        recordedDate: '2019-08-20',
        notes: 'Controlled with ACE inhibitor',
      },
      {
        id: 'cond-003',
        patientId: patient1.id,
        code: 'E78.5',
        display: 'Hyperlipidemia',
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        severity: 'mild',
        onsetDate: '2021-01-10',
        recordedDate: '2021-01-10',
      },
    ]);

    // Patient 1 - Active medications
    this.medications.set(patient1.id, [
      {
        id: 'med-001',
        patientId: patient1.id,
        medicationName: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        route: 'Oral',
        status: 'active',
        startDate: '2020-03-15',
        prescribedBy: 'Dr. Sarah Johnson',
        reason: 'Type 2 Diabetes Mellitus',
      },
      {
        id: 'med-002',
        patientId: patient1.id,
        medicationName: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        route: 'Oral',
        status: 'active',
        startDate: '2019-08-20',
        prescribedBy: 'Dr. Sarah Johnson',
        reason: 'Essential Hypertension',
      },
      {
        id: 'med-003',
        patientId: patient1.id,
        medicationName: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily at bedtime',
        route: 'Oral',
        status: 'active',
        startDate: '2021-01-10',
        prescribedBy: 'Dr. Sarah Johnson',
        reason: 'Hyperlipidemia',
      },
    ]);

    // Patient 1 - Recent observations
    this.observations.set(patient1.id, [
      {
        id: 'obs-001',
        patientId: patient1.id,
        type: 'VITAL',
        code: 'BP',
        display: 'Blood Pressure',
        value: '128/82',
        unit: 'mmHg',
        referenceRange: '<140/90',
        status: 'final',
        effectiveDate: '2026-04-28',
        interpretation: 'normal',
      },
      {
        id: 'obs-002',
        patientId: patient1.id,
        type: 'LAB',
        code: 'HbA1c',
        display: 'Hemoglobin A1c',
        value: '6.8',
        unit: '%',
        referenceRange: '<7.0',
        status: 'final',
        effectiveDate: '2026-04-25',
        interpretation: 'normal',
        notes: 'Good glycemic control',
      },
      {
        id: 'obs-003',
        patientId: patient1.id,
        type: 'LAB',
        code: 'FBG',
        display: 'Fasting Blood Glucose',
        value: '118',
        unit: 'mg/dL',
        referenceRange: '70-100',
        status: 'final',
        effectiveDate: '2026-04-25',
        interpretation: 'high',
      },
      {
        id: 'obs-004',
        patientId: patient1.id,
        type: 'LAB',
        code: 'CHOL',
        display: 'Total Cholesterol',
        value: '185',
        unit: 'mg/dL',
        referenceRange: '<200',
        status: 'final',
        effectiveDate: '2026-04-25',
        interpretation: 'normal',
      },
      {
        id: 'obs-005',
        patientId: patient1.id,
        type: 'LAB',
        code: 'LDL',
        display: 'LDL Cholesterol',
        value: '105',
        unit: 'mg/dL',
        referenceRange: '<100',
        status: 'final',
        effectiveDate: '2026-04-25',
        interpretation: 'high',
      },
      {
        id: 'obs-006',
        patientId: patient1.id,
        type: 'VITAL',
        code: 'WEIGHT',
        display: 'Body Weight',
        value: '82',
        unit: 'kg',
        status: 'final',
        effectiveDate: '2026-04-28',
        interpretation: 'normal',
      },
    ]);

    // Patient 1 - Recent encounters
    this.encounters.set(patient1.id, [
      {
        id: 'enc-001',
        patientId: patient1.id,
        type: 'Follow-up visit',
        status: 'finished',
        class: 'outpatient',
        startDate: '2026-04-28T10:00:00Z',
        endDate: '2026-04-28T10:30:00Z',
        practitioner: 'Dr. Sarah Johnson',
        reasonCode: 'Z00.00',
        reasonDisplay: 'Routine diabetes follow-up',
        diagnosis: ['Type 2 Diabetes Mellitus', 'Essential Hypertension'],
        notes: 'Patient doing well, medications adjusted',
      },
      {
        id: 'enc-002',
        patientId: patient1.id,
        type: 'Laboratory visit',
        status: 'finished',
        class: 'outpatient',
        startDate: '2026-04-25T08:00:00Z',
        endDate: '2026-04-25T08:15:00Z',
        practitioner: 'Lab Technician',
        reasonCode: 'Z00.00',
        reasonDisplay: 'Routine lab work',
        notes: 'Fasting labs drawn',
      },
      {
        id: 'enc-003',
        patientId: patient1.id,
        type: 'Annual physical',
        status: 'finished',
        class: 'outpatient',
        startDate: '2026-01-15T14:00:00Z',
        endDate: '2026-01-15T15:00:00Z',
        practitioner: 'Dr. Sarah Johnson',
        reasonCode: 'Z00.00',
        reasonDisplay: 'Annual wellness visit',
        diagnosis: ['Type 2 Diabetes Mellitus', 'Essential Hypertension', 'Hyperlipidemia'],
        notes: 'Comprehensive physical examination completed',
      },
    ]);

    // Patient 1 - Procedures
    this.procedures.set(patient1.id, [
      {
        id: 'proc-001',
        patientId: patient1.id,
        code: 'ECG',
        display: 'Electrocardiogram',
        status: 'completed',
        performedDate: '2026-01-15',
        performer: 'Dr. Sarah Johnson',
        outcome: 'Normal sinus rhythm',
        notes: 'No abnormalities detected',
      },
    ]);

    // Sample patient 2
    const patient2: FHIRPatient = {
      id: 'patient-002',
      mrn: 'MRN-2024-002',
      firstName: 'Jane',
      lastName: 'Smith',
      dob: '1988-11-22',
      gender: 'FEMALE',
      phone: '+254723456789',
      email: 'jane.smith@example.com',
      address: '456 Oak Ave, Nairobi, Kenya',
      allergies: ['Latex'],
    };

    this.patients.set(patient2.id, patient2);

    // Patient 2 - Active conditions
    this.conditions.set(patient2.id, [
      {
        id: 'cond-004',
        patientId: patient2.id,
        code: 'J45.0',
        display: 'Asthma',
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        severity: 'mild',
        onsetDate: '2015-05-10',
        recordedDate: '2015-05-10',
        notes: 'Well controlled with inhaled corticosteroids',
      },
    ]);

    // Patient 2 - Active medications
    this.medications.set(patient2.id, [
      {
        id: 'med-004',
        patientId: patient2.id,
        medicationName: 'Fluticasone/Salmeterol',
        dosage: '250/50 mcg',
        frequency: 'Twice daily',
        route: 'Inhalation',
        status: 'active',
        startDate: '2015-05-10',
        prescribedBy: 'Dr. Michael Chen',
        reason: 'Asthma',
      },
      {
        id: 'med-005',
        patientId: patient2.id,
        medicationName: 'Albuterol',
        dosage: '90 mcg',
        frequency: 'As needed',
        route: 'Inhalation',
        status: 'active',
        startDate: '2015-05-10',
        prescribedBy: 'Dr. Michael Chen',
        reason: 'Asthma rescue inhaler',
      },
    ]);

    // Patient 2 - Recent observations
    this.observations.set(patient2.id, [
      {
        id: 'obs-007',
        patientId: patient2.id,
        type: 'VITAL',
        code: 'BP',
        display: 'Blood Pressure',
        value: '118/75',
        unit: 'mmHg',
        referenceRange: '<140/90',
        status: 'final',
        effectiveDate: '2026-04-20',
        interpretation: 'normal',
      },
      {
        id: 'obs-008',
        patientId: patient2.id,
        type: 'VITAL',
        code: 'SPO2',
        display: 'Oxygen Saturation',
        value: '98',
        unit: '%',
        referenceRange: '>95',
        status: 'final',
        effectiveDate: '2026-04-20',
        interpretation: 'normal',
      },
    ]);

    // Patient 2 - Recent encounters
    this.encounters.set(patient2.id, [
      {
        id: 'enc-004',
        patientId: patient2.id,
        type: 'Follow-up visit',
        status: 'finished',
        class: 'outpatient',
        startDate: '2026-04-20T11:00:00Z',
        endDate: '2026-04-20T11:20:00Z',
        practitioner: 'Dr. Michael Chen',
        reasonCode: 'Z00.00',
        reasonDisplay: 'Asthma follow-up',
        diagnosis: ['Asthma'],
        notes: 'Asthma well controlled, continue current regimen',
      },
    ]);

    this.procedures.set(patient2.id, []);
  }

  /**
   * Get patient by ID
   */
  getPatient(patientId: string): FHIRPatient | null {
    return this.patients.get(patientId) || null;
  }

  /**
   * Get patient history summary
   */
  getPatientHistory(
    patientId: string,
    includeInactive: boolean = false,
    limit: number = 10
  ): PatientHistorySummary | null {
    const patient = this.getPatient(patientId);
    if (!patient) return null;

    let conditions = this.conditions.get(patientId) || [];
    if (!includeInactive) {
      conditions = conditions.filter(c => c.clinicalStatus === 'active');
    }

    let medications = this.medications.get(patientId) || [];
    if (!includeInactive) {
      medications = medications.filter(m => m.status === 'active');
    }

    const encounters = (this.encounters.get(patientId) || [])
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      .slice(0, limit);

    const observations = (this.observations.get(patientId) || [])
      .sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())
      .slice(0, limit);

    const procedures = this.procedures.get(patientId) || [];

    return {
      patient,
      activeConditions: conditions,
      activeMedications: medications,
      recentEncounters: encounters,
      recentObservations: observations,
      procedures,
    };
  }

  /**
   * Get observations for a patient
   */
  getObservations(
    patientId: string,
    type?: 'LAB' | 'VITAL' | 'IMAGING',
    fromDate?: string,
    limit: number = 20
  ): FHIRObservation[] {
    let observations = this.observations.get(patientId) || [];

    if (type) {
      observations = observations.filter(o => o.type === type);
    }

    if (fromDate) {
      const fromDateTime = new Date(fromDate).getTime();
      observations = observations.filter(o => new Date(o.effectiveDate).getTime() >= fromDateTime);
    }

    return observations
      .sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())
      .slice(0, limit);
  }

  /**
   * Get conditions for a patient
   */
  getConditions(
    patientId: string,
    clinicalStatus?: string,
    limit: number = 20
  ): FHIRCondition[] {
    let conditions = this.conditions.get(patientId) || [];

    if (clinicalStatus) {
      conditions = conditions.filter(c => c.clinicalStatus === clinicalStatus);
    }

    return conditions
      .sort((a, b) => new Date(b.recordedDate).getTime() - new Date(a.recordedDate).getTime())
      .slice(0, limit);
  }

  /**
   * Get medication history for a patient
   */
  getMedicationHistory(
    patientId: string,
    status?: string,
    limit: number = 20
  ): FHIRMedicationStatement[] {
    let medications = this.medications.get(patientId) || [];

    if (status) {
      medications = medications.filter(m => m.status === status);
    }

    return medications
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      .slice(0, limit);
  }

  /**
   * Get encounters for a patient
   */
  getEncounters(
    patientId: string,
    fromDate?: string,
    limit: number = 10
  ): FHIREncounter[] {
    let encounters = this.encounters.get(patientId) || [];

    if (fromDate) {
      const fromDateTime = new Date(fromDate).getTime();
      encounters = encounters.filter(e => new Date(e.startDate).getTime() >= fromDateTime);
    }

    return encounters
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      .slice(0, limit);
  }

  /**
   * Get procedures for a patient
   */
  getProcedures(patientId: string): FHIRProcedure[] {
    return this.procedures.get(patientId) || [];
  }
}

// Singleton instance
export const fhirDatabase = new FHIRDatabase();

// Made with Bob