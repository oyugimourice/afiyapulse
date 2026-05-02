import crypto from 'crypto';
import logger from '../config/logger';

/**
 * Encryption Service
 * 
 * Provides encryption/decryption for Protected Health Information (PHI):
 * - AES-256-GCM encryption for data at rest
 * - Field-level encryption for sensitive data
 * - Secure key management
 * - HIPAA-compliant encryption standards
 */

class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private keyLength = 32; // 256 bits
  private ivLength = 16; // 128 bits
  private tagLength = 16; // 128 bits
  private saltLength = 64;

  /**
   * Get encryption key from environment
   */
  private getEncryptionKey(): Buffer {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
      throw new Error('ENCRYPTION_KEY environment variable is not set');
    }
    
    // Ensure key is 32 bytes (256 bits)
    return crypto.scryptSync(key, 'salt', this.keyLength);
  }

  /**
   * Encrypt data using AES-256-GCM
   */
  encrypt(data: string): string {
    try {
      const key = this.getEncryptionKey();
      const iv = crypto.randomBytes(this.ivLength);
      
      const cipher = crypto.createCipheriv(this.algorithm, key, iv) as crypto.CipherGCM;
      
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const tag = cipher.getAuthTag();
      
      // Combine IV + encrypted data + auth tag
      const result = Buffer.concat([
        iv,
        Buffer.from(encrypted, 'hex'),
        tag,
      ]);
      
      return result.toString('base64');
    } catch (error) {
      logger.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypt data using AES-256-GCM
   */
  decrypt(encryptedData: string): string {
    try {
      const key = this.getEncryptionKey();
      const buffer = Buffer.from(encryptedData, 'base64');
      
      // Extract IV, encrypted data, and auth tag
      const iv = buffer.subarray(0, this.ivLength);
      const tag = buffer.subarray(buffer.length - this.tagLength);
      const encrypted = buffer.subarray(this.ivLength, buffer.length - this.tagLength);
      
      const decipher = crypto.createDecipheriv(this.algorithm, key, iv) as crypto.DecipherGCM;
      decipher.setAuthTag(tag);
      
      let decrypted = decipher.update(encrypted);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      
      return decrypted.toString('utf8');
    } catch (error) {
      logger.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Hash data using SHA-256 (one-way, for passwords)
   */
  hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Generate secure random token
   */
  generateToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Generate secure random password
   */
  generatePassword(length: number = 16): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    const randomBytes = crypto.randomBytes(length);
    
    for (let i = 0; i < length; i++) {
      password += charset[randomBytes[i] % charset.length];
    }
    
    return password;
  }

  /**
   * Encrypt object fields selectively
   */
  encryptFields<T extends Record<string, any>>(
    obj: T,
    fields: (keyof T)[]
  ): T {
    const encrypted = { ...obj };
    
    for (const field of fields) {
      if (encrypted[field] !== null && encrypted[field] !== undefined) {
        encrypted[field] = this.encrypt(String(encrypted[field])) as any;
      }
    }
    
    return encrypted;
  }

  /**
   * Decrypt object fields selectively
   */
  decryptFields<T extends Record<string, any>>(
    obj: T,
    fields: (keyof T)[]
  ): T {
    const decrypted = { ...obj };
    
    for (const field of fields) {
      if (decrypted[field] !== null && decrypted[field] !== undefined) {
        try {
          decrypted[field] = this.decrypt(String(decrypted[field])) as any;
        } catch (error) {
          logger.error(`Failed to decrypt field ${String(field)}:`, error);
          // Keep encrypted value if decryption fails
        }
      }
    }
    
    return decrypted;
  }

  /**
   * Mask sensitive data for logging (show only first/last chars)
   */
  maskData(data: string, visibleChars: number = 4): string {
    if (data.length <= visibleChars * 2) {
      return '*'.repeat(data.length);
    }
    
    const start = data.substring(0, visibleChars);
    const end = data.substring(data.length - visibleChars);
    const masked = '*'.repeat(data.length - visibleChars * 2);
    
    return `${start}${masked}${end}`;
  }

  /**
   * Sanitize data for safe logging (remove PHI)
   */
  sanitizeForLogging(obj: any): any {
    const sensitiveFields = [
      'password',
      'passwordHash',
      'ssn',
      'socialSecurityNumber',
      'creditCard',
      'token',
      'apiKey',
      'secret',
      'dob',
      'dateOfBirth',
      'phone',
      'email',
      'address',
    ];
    
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeForLogging(item));
    }
    
    const sanitized: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = sensitiveFields.some(field => 
        lowerKey.includes(field.toLowerCase())
      );
      
      if (isSensitive && typeof value === 'string') {
        sanitized[key] = this.maskData(value);
      } else if (typeof value === 'object') {
        sanitized[key] = this.sanitizeForLogging(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }

  /**
   * Verify data integrity using HMAC
   */
  generateHMAC(data: string): string {
    const key = this.getEncryptionKey();
    return crypto.createHmac('sha256', key).update(data).digest('hex');
  }

  /**
   * Verify HMAC signature
   */
  verifyHMAC(data: string, signature: string): boolean {
    const expected = this.generateHMAC(data);
    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signature)
    );
  }

  /**
   * Encrypt file data
   */
  encryptFile(fileBuffer: Buffer): Buffer {
    const encrypted = this.encrypt(fileBuffer.toString('base64'));
    return Buffer.from(encrypted, 'utf8');
  }

  /**
   * Decrypt file data
   */
  decryptFile(encryptedBuffer: Buffer): Buffer {
    const decrypted = this.decrypt(encryptedBuffer.toString('utf8'));
    return Buffer.from(decrypted, 'base64');
  }
}

export default new EncryptionService();

// Made with Bob