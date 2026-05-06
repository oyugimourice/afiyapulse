import { EmailTemplateBase } from './base.template';
import { PasswordResetEmailData } from '../email.service';

/**
 * Password Reset Email Template
 * Generates HTML email for password reset requests
 */
export class PasswordResetEmailTemplate extends EmailTemplateBase {
  /**
   * Generate complete password reset email HTML
   */
  generate(data: PasswordResetEmailData): string {
    this.validateData(data);
    const content = this.buildContent(data);
    return this.wrapTemplate('Password Reset Request', content);
  }

  /**
   * Validate required data fields
   */
  private validateData(data: PasswordResetEmailData): void {
    this.validateRequiredFields(data, ['name', 'resetLink', 'expiresIn']);
  }

  /**
   * Get base styles plus template-specific styles
   */
  protected getBaseStyles(): string {
    return `
      ${super.getBaseStyles()}
      .warning { 
        background: #fff3cd; 
        border-left: 4px solid #ffc107; 
        padding: 15px; 
        margin: 20px 0; 
      }
      .warning strong {
        display: block;
        margin-bottom: 8px;
      }
      .warning p {
        margin: 0;
      }
      .link-text {
        word-break: break-all;
        color: #667eea;
        font-size: 14px;
      }
    `.trim();
  }

  /**
   * Build the main email content
   */
  private buildContent(data: PasswordResetEmailData): string {
    return `
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <h2>Hi ${this.escapeHtml(data.name)},</h2>
      <p>We received a request to reset your password for your ${this.config.brandName} account.</p>
      <p>Click the button below to reset your password:</p>
      ${this.buildResetButton(data.resetLink)}
      ${this.buildWarningBox(data.expiresIn)}
      <p>For security reasons, this link can only be used once.</p>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p class="link-text">${this.escapeHtml(data.resetLink)}</p>
      <p>Best regards,<br>The ${this.config.brandName} Team</p>
    </div>
    `.trim();
  }

  /**
   * Build reset password button HTML
   */
  private buildResetButton(resetLink: string): string {
    return `<a href="${this.escapeHtml(resetLink)}" class="button">Reset Password</a>`;
  }

  /**
   * Build security warning box HTML
   */
  private buildWarningBox(expiresIn: string): string {
    return `
      <div class="warning">
        <strong>⚠️ Security Notice:</strong>
        <p>This link will expire in ${this.escapeHtml(expiresIn)}. If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
      </div>
    `.trim();
  }
}

// Made with Bob
