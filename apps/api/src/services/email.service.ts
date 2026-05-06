import nodemailer, { Transporter } from 'nodemailer';
import logger from '../config/logger';
import { AppError } from '../middleware/error.middleware';
import { WelcomeEmailTemplate } from './email-templates/welcome.template';
import { PasswordResetEmailTemplate } from './email-templates/password-reset.template';
import { ConsultationCompletedEmailTemplate } from './email-templates/consultation-completed.template';
import { AppointmentReminderEmailTemplate } from './email-templates/appointment-reminder.template';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: Buffer | string;
    contentType?: string;
  }>;
}

export interface WelcomeEmailData {
  name: string;
  email: string;
}

export interface PasswordResetEmailData {
  name: string;
  resetLink: string;
  expiresIn: string;
}

export interface ConsultationCompletedEmailData {
  patientName: string;
  doctorName: string;
  consultationDate: string;
  consultationId: string;
}

export interface DocumentsReadyEmailData {
  patientName: string;
  doctorName: string;
  documents: string[];
  reviewLink: string;
}

export interface AppointmentReminderEmailData {
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
}

class EmailService {
  private transporter: Transporter;
  private fromEmail: string;
  private fromName: string;
  private welcomeTemplate: WelcomeEmailTemplate;
  private passwordResetTemplate: PasswordResetEmailTemplate;
  private consultationCompletedTemplate: ConsultationCompletedEmailTemplate;
  private appointmentReminderTemplate: AppointmentReminderEmailTemplate;

  constructor() {
    // Initialize email transporter
    this.fromEmail = process.env.EMAIL_FROM || 'noreply@afiyapulse.com';
    this.fromName = process.env.EMAIL_FROM_NAME || 'AfiyaPulse';

    // Configure transporter based on environment
    if (process.env.NODE_ENV === 'production') {
      // Production: Use SMTP service (e.g., SendGrid, AWS SES, etc.)
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Development: Use Ethereal Email (fake SMTP service for testing)
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: process.env.ETHEREAL_USER || 'test@ethereal.email',
          pass: process.env.ETHEREAL_PASS || 'test',
        },
      });
    }

    // Initialize email templates
    this.welcomeTemplate = new WelcomeEmailTemplate();
    this.passwordResetTemplate = new PasswordResetEmailTemplate();
    this.consultationCompletedTemplate = new ConsultationCompletedEmailTemplate();
    this.appointmentReminderTemplate = new AppointmentReminderEmailTemplate();

    logger.info('Email service initialized');
  }

  /**
   * Send email
   */
  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: `"${this.fromName}" <${this.fromEmail}>`,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments,
      };

      const info = await this.transporter.sendMail(mailOptions);

      logger.info(`Email sent: ${info.messageId}`);
      
      // Log preview URL in development
      if (process.env.NODE_ENV !== 'production') {
        logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      }
    } catch (error) {
      logger.error('Error sending email:', error);
      throw new AppError('Failed to send email', 500);
    }
  }

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(to: string, data: WelcomeEmailData): Promise<void> {
    const html = this.getWelcomeEmailTemplate(data);
    const text = `Welcome to AfiyaPulse, ${data.name}! Your account has been created successfully.`;

    await this.sendEmail({
      to,
      subject: 'Welcome to AfiyaPulse',
      html,
      text,
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(to: string, data: PasswordResetEmailData): Promise<void> {
    const html = this.getPasswordResetEmailTemplate(data);
    const text = `Hi ${data.name}, you requested a password reset. Click this link to reset your password: ${data.resetLink}. This link expires in ${data.expiresIn}.`;

    await this.sendEmail({
      to,
      subject: 'Password Reset Request - AfiyaPulse',
      html,
      text,
    });
  }

  /**
   * Send consultation completed notification
   */
  async sendConsultationCompletedEmail(
    to: string,
    data: ConsultationCompletedEmailData
  ): Promise<void> {
    const html = this.getConsultationCompletedEmailTemplate(data);
    const text = `Hi ${data.patientName}, your consultation with Dr. ${data.doctorName} on ${data.consultationDate} has been completed. Your clinical documents are being prepared.`;

    await this.sendEmail({
      to,
      subject: 'Consultation Completed - AfiyaPulse',
      html,
      text,
    });
  }

  /**
   * Send documents ready notification
   */
  async sendDocumentsReadyEmail(to: string, data: DocumentsReadyEmailData): Promise<void> {
    const html = this.getDocumentsReadyEmailTemplate(data);
    const text = `Hi ${data.patientName}, your clinical documents from Dr. ${data.doctorName} are ready for review. Documents: ${data.documents.join(', ')}`;

    await this.sendEmail({
      to,
      subject: 'Your Clinical Documents Are Ready - AfiyaPulse',
      html,
      text,
    });
  }

  /**
   * Send appointment reminder
   */
  async sendAppointmentReminderEmail(
    to: string,
    data: AppointmentReminderEmailData
  ): Promise<void> {
    const html = this.appointmentReminderTemplate.generate(data);
    const text = `Hi ${data.patientName}, this is a reminder for your ${data.appointmentType} appointment with Dr. ${data.doctorName} on ${data.appointmentDate} at ${data.appointmentTime}.`;

    await this.sendEmail({
      to,
      subject: 'Appointment Reminder - AfiyaPulse',
      html,
      text,
    });
  }

  /**
   * Email Templates
   */

  private getWelcomeEmailTemplate(data: WelcomeEmailData): string {
    return this.welcomeTemplate.generate(data);
  }

  private getPasswordResetEmailTemplate(data: PasswordResetEmailData): string {
    return this.passwordResetTemplate.generate(data);
  }

  private getConsultationCompletedEmailTemplate(data: ConsultationCompletedEmailData): string {
    return this.consultationCompletedTemplate.generate(data);
  }

  private getDocumentsReadyEmailTemplate(data: DocumentsReadyEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Clinical Documents Are Ready</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .documents { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .document-item { padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .document-item:last-child { border-bottom: none; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📄 Your Documents Are Ready!</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.patientName},</h2>
            <p>Great news! Your clinical documents from Dr. ${data.doctorName} have been reviewed and are now ready.</p>
            <div class="documents">
              <h3>Available Documents:</h3>
              ${data.documents.map(doc => `<div class="document-item">✓ ${doc}</div>`).join('')}
            </div>
            <p>Click the button below to view and download your documents:</p>
            <a href="${data.reviewLink}" class="button">View My Documents</a>
            <p><strong>Important:</strong> Please review your documents carefully. If you notice any discrepancies or have questions, contact your healthcare provider immediately.</p>
            <p>Your documents are securely stored and accessible anytime through your AfiyaPulse account.</p>
            <p>Best regards,<br>The AfiyaPulse Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} AfiyaPulse. All rights reserved.</p>
            <p>This email contains confidential medical information.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

}

export const emailService = new EmailService();
export default emailService;

// 
