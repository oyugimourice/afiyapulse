/**
 * Email Template CSS Styles
 * Centralized CSS constants for email templates
 */

// Type alias for CSS strings to improve type safety
export type CssString = string;

/**
 * Base CSS styles shared across all email templates
 * Extracted as a constant to reduce runtime string manipulation
 */
export const BASE_EMAIL_STYLES: CssString = `
body { 
  font-family: Arial, sans-serif; 
  line-height: 1.6; 
  color: #333; 
  margin: 0;
  padding: 0;
}
.container { 
  max-width: 600px; 
  margin: 0 auto; 
  padding: 20px; 
}
.header { 
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
  color: white; 
  padding: 30px; 
  text-align: center; 
  border-radius: 10px 10px 0 0; 
}
.header h1 {
  margin: 0;
  font-size: 28px;
}
.content { 
  background: #f9f9f9; 
  padding: 30px; 
  border-radius: 0 0 10px 10px; 
}
.content h2 {
  margin-top: 0;
  color: #333;
}
.content p {
  margin: 15px 0;
}
.content ul {
  margin: 15px 0;
  padding-left: 25px;
}
.content li {
  margin: 8px 0;
}
.button { 
  display: inline-block; 
  padding: 12px 30px; 
  background: #667eea; 
  color: white !important; 
  text-decoration: none; 
  border-radius: 5px; 
  margin: 20px 0;
  font-weight: bold;
}
.button:hover {
  background: #5568d3;
}
.footer { 
  text-align: center; 
  margin-top: 30px; 
  color: #666; 
  font-size: 12px; 
}
.footer p {
  margin: 5px 0;
}
`.trim();

/**
 * Appointment-specific CSS styles
 */
export const APPOINTMENT_STYLES: CssString = `
.appointment-box { 
  background: white; 
  border: 2px solid #667eea; 
  padding: 20px; 
  border-radius: 5px; 
  margin: 20px 0; 
  text-align: center; 
}
.appointment-box h3 { 
  color: #667eea; 
  margin: 0 0 15px 0; 
}
.appointment-detail { 
  font-size: 18px; 
  margin: 10px 0; 
}
.appointment-detail strong {
  color: #667eea;
  font-weight: 600;
}
`.trim();

/**
 * Consultation-specific CSS styles
 */
export const CONSULTATION_STYLES: CssString = `
.info-box { 
  background: white; 
  border-left: 4px solid #667eea; 
  padding: 15px; 
  margin: 20px 0;
  border-radius: 4px;
}
.info-box p {
  margin: 8px 0;
}
.info-box strong {
  color: #667eea;
  font-weight: 600;
}
`.trim();

/**
 * Utility function to combine multiple CSS strings
 */
export function combineStyles(...styles: CssString[]): CssString {
  return styles.filter(Boolean).join('\n');
}

// Made with Bob