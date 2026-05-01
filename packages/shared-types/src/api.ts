export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth API Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'DOCTOR' | 'NURSE' | 'ADMIN';
  specialty?: string;
  licenseNumber?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  role: 'DOCTOR' | 'NURSE' | 'ADMIN';
  specialty?: string;
  licenseNumber?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Consultation API Types
export interface CreateConsultationRequest {
  patientId: string;
}

export interface UpdateConsultationRequest {
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'PENDING_REVIEW';
  endedAt?: Date;
  audioUrl?: string;
  duration?: number;
}

export interface UploadAudioRequest {
  consultationId: string;
  audioFile: File | Buffer;
}

// Patient API Types
export interface CreatePatientRequest {
  mrn: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'UNKNOWN';
  phone?: string;
  email?: string;
  address?: string;
  allergies?: string[];
}

export interface UpdatePatientRequest {
  firstName?: string;
  lastName?: string;
  dob?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'UNKNOWN';
  phone?: string;
  email?: string;
  address?: string;
  allergies?: string[];
}

// Review API Types
export interface ApproveDocumentRequest {
  documentType: 'SOAP_NOTE' | 'PRESCRIPTION' | 'REFERRAL' | 'APPOINTMENT';
  documentId: string;
  consultationId: string;
}

export interface RejectDocumentRequest {
  documentType: 'SOAP_NOTE' | 'PRESCRIPTION' | 'REFERRAL' | 'APPOINTMENT';
  documentId: string;
  consultationId: string;
  reason: string;
}

export interface UpdateDocumentRequest {
  documentType: 'SOAP_NOTE' | 'PRESCRIPTION' | 'REFERRAL' | 'APPOINTMENT';
  documentId: string;
  data: any;
}

// Made with Bob
