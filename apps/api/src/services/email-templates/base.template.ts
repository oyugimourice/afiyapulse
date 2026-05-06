/**
 * Base Email Template
 * Provides shared functionality and configuration for all email templates
 */

import { BASE_EMAIL_STYLES, CssString } from './styles';

export interface EmailTemplateConfig {
  frontendUrl: string;
  currentYear: number;
  brandName: string;
  supportEmail: string;
}

export abstract class EmailTemplateBase {
  protected readonly config: EmailTemplateConfig;

  constructor() {
    this.config = {
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
      currentYear: new Date().getFullYear(),
      brandName: 'AfiyaPulse',
      supportEmail: process.env.SUPPORT_EMAIL || 'support@afiyapulse.com',
    };
  }

  /**
   * Get base CSS styles shared across all email templates
   * Returns pre-defined CSS constant to avoid runtime string manipulation
   */
  protected getBaseStyles(): CssString {
    return BASE_EMAIL_STYLES;
  }

  /**
   * Wrap content in complete HTML email structure
   */
  protected wrapTemplate(title: string, content: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${this.escapeHtml(title)}</title>
  <style>${this.getBaseStyles()}</style>
</head>
<body>
  <div class="container">
    ${content}
    ${this.getFooter()}
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Get footer HTML shared across all templates
   */
  protected getFooter(): string {
    return `
    <div class="footer">
      <p>&copy; ${this.config.currentYear} ${this.config.brandName}. All rights reserved.</p>
      <p>If you have questions, contact us at ${this.config.supportEmail}</p>
    </div>
    `.trim();
  }

  /**
   * Escape HTML special characters to prevent XSS
   */
  protected escapeHtml(text: string): string {
    if (!text) return '';
    
    const map: Record<string, string> = {
      '&': '&',
      '<': '<',
      '>': '>',
      '"': '"',
      "'": '&#039;',
    };
    
    return text.replace(/[&<>"']/g, (char) => map[char]);
  }

  /**
   * Validate that required data fields are present
   */
  protected validateRequiredFields(
    data: Record<string, any>,
    requiredFields: string[]
  ): void {
    const missingFields = requiredFields.filter(
      (field) => !data[field] || (typeof data[field] === 'string' && !data[field].trim())
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required fields for email template: ${missingFields.join(', ')}`
      );
    }
  }

  /**
   * Abstract method that must be implemented by child classes
   */
  abstract generate(data: any): string;
}

// Made with Bob
