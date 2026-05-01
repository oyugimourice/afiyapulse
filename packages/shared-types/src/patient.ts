export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  UNKNOWN = 'UNKNOWN',
}

export interface Patient {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: Gender;
  phone?: string;
  email?: string;
  address?: string;
  allergies: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PatientSearchParams {
  query?: string;
  gender?: Gender;
  minAge?: number;
  maxAge?: number;
  page?: number;
  limit?: number;
}

export interface PatientMedicalHistory {
  patientId: string;
  consultations: ConsultationSummary[];
  prescriptions: PrescriptionSummary[];
  referrals: ReferralSummary[];
  appointments: AppointmentSummary[];
}

export interface ConsultationSummary {
  id: string;
  date: Date;
  doctorName: string;
  diagnosis?: string;
  status: string;
}

export interface PrescriptionSummary {
  id: string;
  date: Date;
  medications: string[];
  doctorName: string;
}

export interface ReferralSummary {
  id: string;
  date: Date;
  specialty: string;
  reason: string;
  urgency: string;
}

export interface AppointmentSummary {
  id: string;
  scheduledAt: Date;
  type: string;
  status: string;
}

// Made with Bob
