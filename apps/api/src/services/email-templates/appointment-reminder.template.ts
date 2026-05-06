import { EmailTemplateBase } from './base.template';
import { AppointmentReminderEmailData } from '../email.service';
import { APPOINTMENT_STYLES, combineStyles, CssString } from './styles';

/**
 * Appointment Reminder Email Template
 * Generates HTML email for appointment reminder notifications
 */
export class AppointmentReminderEmailTemplate extends EmailTemplateBase {
  private readonly reminderItems: string[] = [
    'Arrive 10-15 minutes early',
    'Bring your ID and insurance card',
    'Bring a list of current medications',
    'Prepare any questions you may have',
  ];

  /**
   * Generate complete appointment reminder email HTML
   */
  generate(data: AppointmentReminderEmailData): string {
    this.validateData(data);
    const content = this.buildContent(data);
    return this.wrapTemplate('Appointment Reminder', content);
  }

  /**
   * Validate required data fields
   */
  private validateData(data: AppointmentReminderEmailData): void {
    this.validateRequiredFields(data, [
      'patientName',
      'doctorName',
      'appointmentDate',
      'appointmentTime',
      'appointmentType',
    ]);
  }

  /**
   * Get base styles plus template-specific styles
   * Uses pre-defined CSS constants to avoid runtime string manipulation
   */
  protected getBaseStyles(): CssString {
    return combineStyles(super.getBaseStyles(), APPOINTMENT_STYLES);
  }

  /**
   * Build the main email content
   */
  private buildContent(data: AppointmentReminderEmailData): string {
    return `
    <div class="header">
      <h1>🔔 Appointment Reminder</h1>
    </div>
    <div class="content">
      <h2>Hi ${this.escapeHtml(data.patientName)},</h2>
      <p>This is a friendly reminder about your upcoming appointment:</p>
      ${this.buildAppointmentBox(data)}
      ${this.buildReminderList()}
      <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
      <p>We look forward to seeing you!</p>
      <p>Best regards,<br>The ${this.config.brandName} Team</p>
    </div>
    `.trim();
  }

  /**
   * Build appointment details box HTML
   */
  private buildAppointmentBox(data: AppointmentReminderEmailData): string {
    return `
      <div class="appointment-box">
        <h3>Appointment Details</h3>
        <div class="appointment-detail"><strong>Doctor:</strong> Dr. ${this.escapeHtml(data.doctorName)}</div>
        <div class="appointment-detail"><strong>Date:</strong> ${this.escapeHtml(data.appointmentDate)}</div>
        <div class="appointment-detail"><strong>Time:</strong> ${this.escapeHtml(data.appointmentTime)}</div>
        <div class="appointment-detail"><strong>Type:</strong> ${this.escapeHtml(data.appointmentType)}</div>
      </div>
    `.trim();
  }

  /**
   * Build reminder checklist HTML
   */
  private buildReminderList(): string {
    const items = this.reminderItems
      .map((item) => `        <li>${this.escapeHtml(item)}</li>`)
      .join('\n');

    return `
      <p><strong>Please remember to:</strong></p>
      <ul>
${items}
      </ul>
    `.trim();
  }
}

// Made with Bob