import { EmailTemplateBase } from './base.template';
import { ConsultationCompletedEmailData } from '../email.service';
import { CONSULTATION_STYLES, combineStyles, CssString } from './styles';

/**
 * Consultation Completed Email Template
 * Generates HTML email for completed consultation notifications
 */
export class ConsultationCompletedEmailTemplate extends EmailTemplateBase {
  private readonly documentTypes: string[] = [
    'SOAP Note (Clinical Summary)',
    'Prescription (if applicable)',
    'Referral Letter (if applicable)',
    'Follow-up Appointment (if scheduled)',
  ];

  /**
   * Generate complete consultation completed email HTML
   */
  generate(data: ConsultationCompletedEmailData): string {
    this.validateData(data);
    const content = this.buildContent(data);
    return this.wrapTemplate('Consultation Completed', content);
  }

  /**
   * Validate required data fields
   */
  private validateData(data: ConsultationCompletedEmailData): void {
    this.validateRequiredFields(data, [
      'patientName',
      'doctorName',
      'consultationDate',
      'consultationId',
    ]);
  }

  /**
   * Get base styles plus template-specific styles
   * Uses pre-defined CSS constants to avoid runtime string manipulation
   */
  protected getBaseStyles(): CssString {
    return combineStyles(super.getBaseStyles(), CONSULTATION_STYLES);
  }

  /**
   * Build the main email content
   */
  private buildContent(data: ConsultationCompletedEmailData): string {
    return `
    <div class="header">
      <h1>✅ Consultation Completed</h1>
    </div>
    <div class="content">
      <h2>Hi ${this.escapeHtml(data.patientName)},</h2>
      <p>Your consultation has been successfully completed!</p>
      ${this.buildInfoBox(data)}
      <p>Our AI system is currently processing your consultation and generating your clinical documents, including:</p>
      ${this.buildDocumentsList()}
      <p>You will receive another email once your documents are ready for review.</p>
      <p>If you have any questions about your consultation, please contact your healthcare provider.</p>
      <p>Best regards,<br>The ${this.config.brandName} Team</p>
    </div>
    `.trim();
  }

  /**
   * Build consultation information box HTML
   */
  private buildInfoBox(data: ConsultationCompletedEmailData): string {
    return `
      <div class="info-box">
        <p><strong>Doctor:</strong> Dr. ${this.escapeHtml(data.doctorName)}</p>
        <p><strong>Date:</strong> ${this.escapeHtml(data.consultationDate)}</p>
        <p><strong>Consultation ID:</strong> ${this.escapeHtml(data.consultationId)}</p>
      </div>
    `.trim();
  }

  /**
   * Build documents list HTML
   */
  private buildDocumentsList(): string {
    const items = this.documentTypes
      .map((doc) => `        <li>${this.escapeHtml(doc)}</li>`)
      .join('\n');

    return `
      <ul>
${items}
      </ul>
    `.trim();
  }
}

// 