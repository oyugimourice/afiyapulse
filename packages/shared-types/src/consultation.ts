export enum ConsultationStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  PENDING_REVIEW = 'PENDING_REVIEW',
}

export interface ConsultationSession {
  id: string;
  patientId: string;
  doctorId: string;
  startedAt: Date;
  endedAt?: Date;
  status: ConsultationStatus;
  audioUrl?: string;
  duration?: number;
}

export interface TranscriptSegment {
  id: string;
  consultationId: string;
  text: string;
  speaker: 'DOCTOR' | 'PATIENT' | 'SYSTEM';
  timestamp: Date;
  confidence?: number;
}

export interface SOAPNote {
  id: string;
  consultationId: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  isApproved: boolean;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prescription {
  id: string;
  consultationId: string;
  patientId: string;
  medications: PrescriptionMedication[];
  instructions?: string;
  isApproved: boolean;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescriptionMedication {
  drugName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  interactions: string[];
}

export interface Referral {
  id: string;
  consultationId: string;
  patientId: string;
  specialty: string;
  reason: string;
  urgency: 'ROUTINE' | 'URGENT' | 'EMERGENCY';
  notes?: string;
  isApproved: boolean;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  consultationId: string;
  patientId: string;
  scheduledAt: Date;
  type: 'FOLLOW_UP' | 'LAB_WORK' | 'IMAGING' | 'SPECIALIST' | 'PROCEDURE';
  reason?: string;
  isApproved: boolean;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsultationDocuments {
  soapNote?: SOAPNote;
  prescription?: Prescription;
  referral?: Referral;
  appointment?: Appointment;
}

// Made with Bob
