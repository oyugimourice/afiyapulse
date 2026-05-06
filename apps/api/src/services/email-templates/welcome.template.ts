import { EmailTemplateBase } from './base.template';
import { WelcomeEmailData } from '../email.service';

/**
 * Welcome Email Template
 * Generates HTML email for new user registration
 */
export class WelcomeEmailTemplate extends EmailTemplateBase {
  private readonly features: string[] = [
    'Record and transcribe patient consultations in real-time',
    'Generate SOAP notes automatically',
    'Create prescriptions with drug interaction checks',
    'Draft referral letters',
    'Schedule follow-up appointments',
  ];

  /**
   * Generate complete welcome email HTML
   */
  generate(data: WelcomeEmailData): string {
    this.validateData(data);
    const content = this.buildContent(data);
    return this.wrapTemplate(`Welcome to ${this.config.brandName}`, content);
  }

  /**
   * Validate required data fields
   */
  private validateData(data: WelcomeEmailData): void {
    this.validateRequiredFields(data, ['name', 'email']);
  }

  /**
   * Build the main email content
   */
  private buildContent(data: WelcomeEmailData): string {
    return `
    <div class="header">
      <h1>Welcome to ${this.config.brandName}!</h1>
    </div>
    <div class="content">
      <h2>Hi ${this.escapeHtml(data.name)},</h2>
      <p>Welcome to ${this.config.brandName} - your AI-powered clinical documentation assistant!</p>
      <p>Your account has been successfully created with the email: <strong>${this.escapeHtml(data.email)}</strong></p>
      ${this.buildFeaturesList()}
      <p>Get started by logging in to your account and exploring the features.</p>
      ${this.buildLoginButton()}
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br>The ${this.config.brandName} Team</p>
    </div>
    `.trim();
  }

  /**
   * Build features list HTML
   */
  private buildFeaturesList(): string {
    const items = this.features
      .map((feature) => `        <li>${this.escapeHtml(feature)}</li>`)
      .join('\n');

    return `
      <p>With ${this.config.brandName}, you can:</p>
      <ul>
${items}
      </ul>
    `.trim();
  }

  /**
   * Build login button HTML
   */
  private buildLoginButton(): string {
    const loginUrl = `${this.config.frontendUrl}/login`;
    return `<a href="${this.escapeHtml(loginUrl)}" class="button">Login to Your Account</a>`;
  }
}

// Made with Bob
