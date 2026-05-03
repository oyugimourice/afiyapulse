import apiClient from './api.client';

export interface Patient {
  id: string;
  mrn?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'UNKNOWN';
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  medicalHistory?: string;
  allergies?: string[];
  currentMedications?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  createdAt: string;
  updatedAt: string;
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

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface ApiPatient {
  id: string;
  mrn?: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'UNKNOWN';
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  allergies?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ApiPatientListResponse {
  patients: ApiPatient[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function mapPatient(patient: ApiPatient): Patient {
  return {
    ...patient,
    dateOfBirth: patient.dob,
    allergies: patient.allergies || [],
  };
}

function toApiPatientData(data: CreatePatientData | UpdatePatientData) {
  const { dateOfBirth, ...rest } = data;

  return {
    ...rest,
    dob: dateOfBirth,
    allergies:
      typeof rest.allergies === 'string'
        ? rest.allergies
            .split(',')
            .map((allergy) => allergy.trim())
            .filter(Boolean)
        : rest.allergies,
  };
}

class PatientService {
  async getPatients(params: PatientListParams = {}): Promise<PatientListResponse> {
    const response = await apiClient.get<ApiResponse<ApiPatientListResponse>>('/patients', { params });
    const result = response.data.data;

    return {
      ...result,
      patients: result.patients.map(mapPatient),
    };
  }

  async getPatient(id: string): Promise<Patient> {
    const response = await apiClient.get<ApiResponse<ApiPatient>>(`/patients/${id}`);
    return mapPatient(response.data.data);
  }

  async createPatient(data: CreatePatientData): Promise<Patient> {
    const response = await apiClient.post<ApiResponse<ApiPatient>>('/patients', toApiPatientData(data));
    return mapPatient(response.data.data);
  }

  async updatePatient(id: string, data: UpdatePatientData): Promise<Patient> {
    const response = await apiClient.put<ApiResponse<ApiPatient>>(`/patients/${id}`, toApiPatientData(data));
    return mapPatient(response.data.data);
  }

  async deletePatient(id: string): Promise<void> {
    await apiClient.delete(`/patients/${id}`);
  }

  async searchPatients(params: PatientSearchParams): Promise<PatientSearchResponse> {
    const response = await apiClient.get<ApiResponse<ApiPatientListResponse>>('/patients', { params });
    const result = response.data.data;

    return {
      data: result.patients.map(mapPatient),
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }
}

export const patientService = new PatientService();

// Made with Bob
