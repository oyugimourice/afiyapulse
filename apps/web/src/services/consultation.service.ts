import apiClient from './api.client';

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  startTime: Date;
  endTime?: Date;
  audioUrl?: string;
  transcriptId?: string;
  soapNoteId?: string;
  prescriptionId?: string;
  referralId?: string;
  createdAt: Date;
  updatedAt: Date;
  patient?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateConsultationData {
  patientId: string;
}

export interface ConsultationListParams {
  page?: number;
  limit?: number;
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  patientId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ConsultationListResponse {
  consultations: Consultation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TranscriptSegment {
  id: string;
  consultationId: string;
  speaker: 'DOCTOR' | 'PATIENT';
  text: string;
  timestamp: number;
  confidence: number;
  createdAt: Date;
}

export interface UploadAudioChunkData {
  chunk: Blob;
  sequence: number;
  isLast: boolean;
}

class ConsultationService {
  async getConsultations(params: ConsultationListParams = {}): Promise<ConsultationListResponse> {
    const response = await apiClient.get<ConsultationListResponse>('/consultations', { params });
    return response.data;
  }

  async getConsultation(id: string): Promise<Consultation> {
    const response = await apiClient.get<Consultation>(`/consultations/${id}`);
    return response.data;
  }

  async createConsultation(data: CreateConsultationData): Promise<Consultation> {
    const response = await apiClient.post<Consultation>('/consultations', data);
    return response.data;
  }

  async updateConsultation(id: string, data: Partial<Consultation>): Promise<Consultation> {
    const response = await apiClient.patch<Consultation>(`/consultations/${id}`, data);
    return response.data;
  }

  async completeConsultation(id: string): Promise<Consultation> {
    const response = await apiClient.post<Consultation>(`/consultations/${id}/complete`);
    return response.data;
  }

  async cancelConsultation(id: string): Promise<Consultation> {
    const response = await apiClient.post<Consultation>(`/consultations/${id}/cancel`);
    return response.data;
  }

  async uploadAudioChunk(consultationId: string, data: UploadAudioChunkData): Promise<void> {
    const formData = new FormData();
    formData.append('audio', data.chunk);
    formData.append('sequence', data.sequence.toString());
    formData.append('isLast', data.isLast.toString());

    await apiClient.post(`/consultations/${consultationId}/audio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getTranscript(consultationId: string): Promise<TranscriptSegment[]> {
    const response = await apiClient.get<TranscriptSegment[]>(
      `/consultations/${consultationId}/transcript`
    );
    return response.data;
  }

  async getSOAPNote(consultationId: string): Promise<any> {
    const response = await apiClient.get(`/consultations/${consultationId}/soap-note`);
    return response.data;
  }

  async getPrescription(consultationId: string): Promise<any> {
    const response = await apiClient.get(`/consultations/${consultationId}/prescription`);
    return response.data;
  }

  async getReferral(consultationId: string): Promise<any> {
    const response = await apiClient.get(`/consultations/${consultationId}/referral`);
    return response.data;
  }
}

export const consultationService = new ConsultationService();

// Made with Bob
