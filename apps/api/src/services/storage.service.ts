import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppError } from '../middleware/error.middleware';
import logger from '../config/logger';
import crypto from 'crypto';

export class StorageService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    // Initialize S3 client
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    this.bucketName = process.env.AWS_S3_BUCKET || 'afiyapulse-audio';
  }

  /**
   * Generate a unique file key
   */
  private generateFileKey(consultationId: string, extension: string = 'webm'): string {
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString('hex');
    return `consultations/${consultationId}/${timestamp}-${randomString}.${extension}`;
  }

  /**
   * Upload audio file to S3
   */
  async uploadAudio(
    consultationId: string,
    audioBuffer: Buffer,
    contentType: string = 'audio/webm'
  ): Promise<{ url: string; key: string }> {
    try {
      const fileKey = this.generateFileKey(consultationId);

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: audioBuffer,
        ContentType: contentType,
        Metadata: {
          consultationId,
          uploadedAt: new Date().toISOString(),
        },
      });

      await this.s3Client.send(command);

      const url = `https://${this.bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${fileKey}`;

      logger.info(`Audio uploaded to S3: ${fileKey}`);

      return { url, key: fileKey };
    } catch (error) {
      logger.error('Failed to upload audio to S3:', error);
      throw new AppError('Failed to upload audio file', 500);
    }
  }

  /**
   * Get presigned URL for audio download
   */
  async getAudioUrl(fileKey: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      const url = await getSignedUrl(this.s3Client, command, { expiresIn });

      return url;
    } catch (error) {
      logger.error('Failed to generate presigned URL:', error);
      throw new AppError('Failed to generate audio URL', 500);
    }
  }

  /**
   * Delete audio file from S3
   */
  async deleteAudio(fileKey: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      await this.s3Client.send(command);

      logger.info(`Audio deleted from S3: ${fileKey}`);
    } catch (error) {
      logger.error('Failed to delete audio from S3:', error);
      throw new AppError('Failed to delete audio file', 500);
    }
  }

  /**
   * Upload audio chunk (for streaming uploads)
   */
  async uploadAudioChunk(
    consultationId: string,
    chunkBuffer: Buffer,
    chunkIndex: number,
    contentType: string = 'audio/webm'
  ): Promise<{ url: string; key: string }> {
    try {
      const fileKey = `consultations/${consultationId}/chunks/chunk-${chunkIndex}.webm`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: chunkBuffer,
        ContentType: contentType,
        Metadata: {
          consultationId,
          chunkIndex: chunkIndex.toString(),
          uploadedAt: new Date().toISOString(),
        },
      });

      await this.s3Client.send(command);

      const url = `https://${this.bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${fileKey}`;

      logger.info(`Audio chunk ${chunkIndex} uploaded to S3: ${fileKey}`);

      return { url, key: fileKey };
    } catch (error) {
      logger.error(`Failed to upload audio chunk ${chunkIndex} to S3:`, error);
      throw new AppError('Failed to upload audio chunk', 500);
    }
  }
}

export default new StorageService();

// Made with Bob
