import apiClient from './api.client';

export interface PDFGenerationResult {
  pdfUrl: string;
  fileName: string;
  size: number;
}

class PDFService {
  /**
   * Generate PDF for SOAP note
   */
  async generateSOAPNotePDF(soapNoteId: string): Promise<PDFGenerationResult> {
    const response = await apiClient.post(`/api/pdf/soap-note/${soapNoteId}`);
    return response.data.data;
  }

  /**
   * Generate PDF for prescription
   */
  async generatePrescriptionPDF(prescriptionId: string): Promise<PDFGenerationResult> {
    const response = await apiClient.post(`/api/pdf/prescription/${prescriptionId}`);
    return response.data.data;
  }

  /**
   * Generate PDF for referral letter
   */
  async generateReferralPDF(referralId: string): Promise<PDFGenerationResult> {
    const response = await apiClient.post(`/api/pdf/referral/${referralId}`);
    return response.data.data;
  }

  /**
   * Generate patient summary PDF
   */
  async generatePatientSummaryPDF(patientId: string): Promise<PDFGenerationResult> {
    const response = await apiClient.post(`/api/pdf/patient-summary/${patientId}`);
    return response.data.data;
  }

  /**
   * Generate all PDFs for a consultation
   */
  async generateConsultationPDFs(consultationId: string): Promise<{
    soapNote?: PDFGenerationResult;
    prescription?: PDFGenerationResult;
    referral?: PDFGenerationResult;
  }> {
    const response = await apiClient.post(`/api/pdf/consultation/${consultationId}`);
    return response.data.data;
  }

  /**
   * Download PDF from URL
   */
  async downloadPDF(url: string, fileName: string): Promise<void> {
    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      throw error;
    }
  }

  /**
   * Open PDF in new tab
   */
  openPDF(url: string): void {
    window.open(url, '_blank');
  }
}

export const pdfService = new PDFService();
export default pdfService;

// Made with Bob
