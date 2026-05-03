import apiClient from './api.client';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  email?: string;
  phone: string;
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  currentMedications?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePatientData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  email?: string;
  phone: string;
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  currentMedications?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

export interface UpdatePatientData extends Partial<CreatePatientData> {}

export interface PatientListParams {
  page?: number;
  limit?: number;
  search?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  sortBy?: 'firstName' | 'lastName' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface PatientSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PatientListResponse {
  patients: Patient[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PatientSearchResponse {
  data: Patient[];
  pagination: PaginationInfo;
}

class PatientService {
  async getPatients(params: PatientListParams = {}): Promise<PatientListResponse> {
    const response = await apiClient.get<PatientListResponse>('/patients', { params });
    return response.data;
  }

  async getPatient(id: string): Promise<Patient> {
    const response = await apiClient.get<Patient>(`/patients/${id}`);
    return response.data;
  }

  async createPatient(data: CreatePatientData): Promise<Patient> {
    const response = await apiClient.post<Patient>('/patients', data);
    return response.data;
  }

  async updatePatient(id: string, data: UpdatePatientData): Promise<Patient> {
    const response = await apiClient.put<Patient>(`/patients/${id}`, data);
    return response.data;
  }

  async deletePatient(id: string): Promise<void> {
    await apiClient.delete(`/patients/${id}`);
  }

  async searchPatients(params: PatientSearchParams): Promise<PatientSearchResponse> {
    const response = await apiClient.get<PatientListResponse>('/patients', { params });
    return {
      data: response.data.patients,
      pagination: {
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
      },
    };
  }
}

export const patientService = new PatientService();

// Made with Bob
