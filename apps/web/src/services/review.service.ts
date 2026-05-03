import apiClient from './api.client';

export interface SOAPNote {
  id: string;
  consultationId: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  status: 'DRAFT' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Prescription {
  id: string;
  consultationId: string;
  medications: Medication[];
  pharmacyInstructions?: string;
  status: 'DRAFT' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Medication {
  drugName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  interactions?: string[];
  warnings?: string[];
}

export interface Referral {
  id: string;
  consultationId: string;
  specialty: string;
  reason: string;
  urgency: 'ROUTINE' | 'URGENT' | 'EMERGENCY';
  notes?: string;
  status: 'DRAFT' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewDocument {
  soapNote?: SOAPNote;
  prescription?: Prescription;
  referral?: Referral;
}

export interface ApproveDocumentData {
  documentType: 'SOAP_NOTE' | 'PRESCRIPTION' | 'REFERRAL';
  documentId: string;
  notes?: string;
}

export interface RejectDocumentData {
  documentType: 'SOAP_NOTE' | 'PRESCRIPTION' | 'REFERRAL';
  documentId: string;
  reason: string;
  feedback: string;
}

export interface UpdateDocumentData {
  content: any;
}

class ReviewService {
  async getReviewDocuments(consultationId: string): Promise<ReviewDocument> {
    const response = await apiClient.get<ReviewDocument>(
      `/consultations/${consultationId}/review`
    );
    return response.data;
  }

  async getSOAPNote(id: string): Promise<SOAPNote> {
    const response = await apiClient.get<SOAPNote>(`/soap-notes/${id}`);
    return response.data;
  }

  async updateSOAPNote(id: string, data: Partial<SOAPNote>): Promise<SOAPNote> {
    const response = await apiClient.patch<SOAPNote>(`/soap-notes/${id}`, data);
    return response.data;
  }

  async approveSOAPNote(id: string, notes?: string): Promise<SOAPNote> {
    const response = await apiClient.post<SOAPNote>(`/soap-notes/${id}/approve`, { notes });
    return response.data;
  }

  async rejectSOAPNote(id: string, reason: string, feedback: string): Promise<SOAPNote> {
    const response = await apiClient.post<SOAPNote>(`/soap-notes/${id}/reject`, {
      reason,
      feedback,
    });
    return response.data;
  }

  async getPrescription(id: string): Promise<Prescription> {
    const response = await apiClient.get<Prescription>(`/prescriptions/${id}`);
    return response.data;
  }

  async updatePrescription(id: string, data: Partial<Prescription>): Promise<Prescription> {
    const response = await apiClient.patch<Prescription>(`/prescriptions/${id}`, data);
    return response.data;
  }

  async approvePrescription(id: string, notes?: string): Promise<Prescription> {
    const response = await apiClient.post<Prescription>(`/prescriptions/${id}/approve`, {
      notes,
    });
    return response.data;
  }

  async rejectPrescription(id: string, reason: string, feedback: string): Promise<Prescription> {
    const response = await apiClient.post<Prescription>(`/prescriptions/${id}/reject`, {
      reason,
      feedback,
    });
    return response.data;
  }

  async getReferral(id: string): Promise<Referral> {
    const response = await apiClient.get<Referral>(`/referrals/${id}`);
    return response.data;
  }

  async updateReferral(id: string, data: Partial<Referral>): Promise<Referral> {
    const response = await apiClient.patch<Referral>(`/referrals/${id}`, data);
    return response.data;
  }

  async approveReferral(id: string, notes?: string): Promise<Referral> {
    const response = await apiClient.post<Referral>(`/referrals/${id}/approve`, { notes });
    return response.data;
  }

  async rejectReferral(id: string, reason: string, feedback: string): Promise<Referral> {
    const response = await apiClient.post<Referral>(`/referrals/${id}/reject`, {
      reason,
      feedback,
    });
    return response.data;
  }

  async approveAll(consultationId: string, notes?: string): Promise<void> {
    await apiClient.post(`/consultations/${consultationId}/approve-all`, { notes });
  }
}

export const reviewService = new ReviewService();

// Made with Bob
