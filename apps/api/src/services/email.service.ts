import nodemailer, { Transporter } from 'nodemailer';
import logger from '../config/logger';
import { AppError } from '../middleware/error.middleware';

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
    const html = this.getAppointmentReminderEmailTemplate(data);
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
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to AfiyaPulse</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to AfiyaPulse!</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.name},</h2>
            <p>Welcome to AfiyaPulse - your AI-powered clinical documentation assistant!</p>
            <p>Your account has been successfully created with the email: <strong>${data.email}</strong></p>
            <p>With AfiyaPulse, you can:</p>
            <ul>
              <li>Record and transcribe patient consultations in real-time</li>
              <li>Generate SOAP notes automatically</li>
              <li>Create prescriptions with drug interaction checks</li>
              <li>Draft referral letters</li>
              <li>Schedule follow-up appointments</li>
            </ul>
            <p>Get started by logging in to your account and exploring the features.</p>
            <a href="${process.env.FRONTEND_URL}/login" class="button">Login to Your Account</a>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br>The AfiyaPulse Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} AfiyaPulse. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getPasswordResetEmailTemplate(data: PasswordResetEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #667eea; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.name},</h2>
            <p>We received a request to reset your password for your AfiyaPulse account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${data.resetLink}" class="button">Reset Password</a>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <p>This link will expire in ${data.expiresIn}. If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
            </div>
            <p>For security reasons, this link can only be used once.</p>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${data.resetLink}</p>
            <p>Best regards,<br>The AfiyaPulse Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} AfiyaPulse. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getConsultationCompletedEmailTemplate(data: ConsultationCompletedEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Consultation Completed</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Consultation Completed</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.patientName},</h2>
            <p>Your consultation has been successfully completed!</p>
            <div class="info-box">
              <p><strong>Doctor:</strong> Dr. ${data.doctorName}</p>
              <p><strong>Date:</strong> ${data.consultationDate}</p>
              <p><strong>Consultation ID:</strong> ${data.consultationId}</p>
            </div>
            <p>Our AI system is currently processing your consultation and generating your clinical documents, including:</p>
            <ul>
              <li>SOAP Note (Clinical Summary)</li>
              <li>Prescription (if applicable)</li>
              <li>Referral Letter (if applicable)</li>
              <li>Follow-up Appointment (if scheduled)</li>
            </ul>
            <p>You will receive another email once your documents are ready for review.</p>
            <p>If you have any questions about your consultation, please contact your healthcare provider.</p>
            <p>Best regards,<br>The AfiyaPulse Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} AfiyaPulse. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
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

  private getAppointmentReminderEmailTemplate(data: AppointmentReminderEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Reminder</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .appointment-box { background: white; border: 2px solid #f59e0b; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center; }
          .appointment-box h3 { color: #f59e0b; margin: 0 0 15px 0; }
          .appointment-detail { font-size: 18px; margin: 10px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Appointment Reminder</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.patientName},</h2>
            <p>This is a friendly reminder about your upcoming appointment:</p>
            <div class="appointment-box">
              <h3>Appointment Details</h3>
              <div class="appointment-detail"><strong>Doctor:</strong> Dr. ${data.doctorName}</div>
              <div class="appointment-detail"><strong>Date:</strong> ${data.appointmentDate}</div>
              <div class="appointment-detail"><strong>Time:</strong> ${data.appointmentTime}</div>
              <div class="appointment-detail"><strong>Type:</strong> ${data.appointmentType}</div>
            </div>
            <p><strong>Please remember to:</strong></p>
            <ul>
              <li>Arrive 10-15 minutes early</li>
              <li>Bring your ID and insurance card</li>
              <li>Bring a list of current medications</li>
              <li>Prepare any questions you may have</li>
            </ul>
            <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
            <p>We look forward to seeing you!</p>
            <p>Best regards,<br>The AfiyaPulse Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} AfiyaPulse. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = new EmailService();
export default emailService;

// Made with Bob
