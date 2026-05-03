import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import { IamAuthenticator } from 'ibm-watson/auth';
import { AppError } from '../middleware/error.middleware';
import logger from '../config/logger';
import { Readable } from 'stream';

export interface TranscriptionResult {
  text: string;
  confidence: number;
  speaker?: string;
  timestamp: number;
}

export class WatsonService {
  private speechToText: SpeechToTextV1 | null = null;
  private modelName: string = 'en-US_BroadbandModel';
  private isConfigured: boolean = false;

  constructor() {
    // Use medical vocabulary model if available
    this.modelName = process.env.WATSON_MODEL || 'en-US_BroadbandModel';

    // Initialize Watson Speech-to-Text
    const apiKey = process.env.WATSON_STT_API_KEY || '';
    const serviceUrl = process.env.WATSON_STT_URL || '';

    if (!apiKey || !serviceUrl) {
      logger.warn('Watson Speech-to-Text credentials not configured. Transcription will not be available.');
      this.isConfigured = false;
      return;
    }

    try {
      this.speechToText = new SpeechToTextV1({
        authenticator: new IamAuthenticator({
          apikey: apiKey,
        }),
        serviceUrl: serviceUrl,
      });
      this.isConfigured = true;
      logger.info('Watson Speech-to-Text service initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize Watson Speech-to-Text service:', error);
      this.isConfigured = false;
    }
  }

  /**
   * Map Watson alternative to TranscriptionResult
   */
  private mapAlternativeToTranscription(
    alternative: any,
    timestamp: number,
    speaker?: string
  ): TranscriptionResult {
    return {
      text: alternative.transcript ?? '',
      confidence: alternative.confidence ?? 0,
      timestamp,
      ...(speaker && { speaker }),
    };
  }

  /**
   * Transcribe audio file
   */
  async transcribeAudio(audioBuffer: Buffer, contentType: string = 'audio/webm'): Promise<TranscriptionResult[]> {
    if (!this.isConfigured || !this.speechToText) {
      throw new AppError('Watson Speech-to-Text service is not configured', 503);
    }

    try {
      const params = {
        audio: audioBuffer,
        contentType,
        model: this.modelName,
        speakerLabels: true,
        timestamps: true,
        wordConfidence: true,
        smartFormatting: true,
        profanityFilter: false, // Medical terms might be flagged
      };

      const response = await this.speechToText.recognize(params);
      const results = response?.result?.results;

      if (!results?.length) {
        logger.warn('No transcription results from Watson');
        return [];
      }

      const timestamp = Date.now();
      const transcriptions = results.flatMap(result =>
        result.alternatives?.[0]
          ? [this.mapAlternativeToTranscription(result.alternatives[0], timestamp)]
          : []
      );

      logger.info(`Transcribed ${transcriptions.length} segments`);

      return transcriptions;
    } catch (error) {
      logger.error('Watson transcription error:', error);
      throw new AppError('Failed to transcribe audio', 500);
    }
  }

  /**
   * Transcribe audio stream (for real-time transcription)
   */
  async transcribeStream(audioStream: Readable, contentType: string = 'audio/webm'): Promise<Readable> {
    if (!this.isConfigured || !this.speechToText) {
      throw new AppError('Watson Speech-to-Text service is not configured', 503);
    }

    try {
      const params = {
        contentType,
        model: this.modelName,
        speakerLabels: true,
        timestamps: true,
        wordConfidence: true,
        smartFormatting: true,
        interimResults: true,
        profanityFilter: false,
      };

      const recognizeStream = this.speechToText.recognizeUsingWebSocket(params);

      // Pipe audio stream to Watson
      audioStream.pipe(recognizeStream);

      logger.info('Started real-time transcription stream');

      return recognizeStream;
    } catch (error) {
      logger.error('Watson stream transcription error:', error);
      throw new AppError('Failed to start transcription stream', 500);
    }
  }

  /**
   * Get available models
   */
  async getModels(): Promise<any[]> {
    if (!this.isConfigured || !this.speechToText) {
      throw new AppError('Watson Speech-to-Text service is not configured', 503);
    }

    try {
      const response = await this.speechToText.listModels();
      return response.result.models || [];
    } catch (error) {
      logger.error('Failed to get Watson models:', error);
      throw new AppError('Failed to get available models', 500);
    }
  }

  /**
   * Create custom language model (for medical terminology)
   */
  async createCustomModel(name: string, baseModel: string = 'en-US_BroadbandModel'): Promise<string> {
    if (!this.isConfigured || !this.speechToText) {
      throw new AppError('Watson Speech-to-Text service is not configured', 503);
    }

    try {
      const params = {
        name,
        baseModelName: baseModel,
        description: 'Custom medical terminology model for AfiyaPulse',
      };

      const response = await this.speechToText.createLanguageModel(params);
      const customizationId = response.result.customization_id;

      logger.info(`Created custom model: ${customizationId}`);

      return customizationId || '';
    } catch (error) {
      logger.error('Failed to create custom model:', error);
      throw new AppError('Failed to create custom model', 500);
    }
  }

  /**
   * Add medical terms to custom model
   */
  async addMedicalTerms(customizationId: string, terms: { word: string; sounds_like?: string[] }[]): Promise<void> {
    if (!this.isConfigured || !this.speechToText) {
      throw new AppError('Watson Speech-to-Text service is not configured', 503);
    }

    try {
      const params = {
        customizationId,
        words: terms,
      };

      await this.speechToText.addWords(params);

      logger.info(`Added ${terms.length} medical terms to custom model`);
    } catch (error) {
      logger.error('Failed to add medical terms:', error);
      throw new AppError('Failed to add medical terms', 500);
    }
  }

  /**
   * Train custom model
   */
  async trainCustomModel(customizationId: string): Promise<void> {
    if (!this.isConfigured || !this.speechToText) {
      throw new AppError('Watson Speech-to-Text service is not configured', 503);
    }

    try {
      await this.speechToText.trainLanguageModel({ customizationId });

      logger.info(`Training custom model: ${customizationId}`);
    } catch (error) {
      logger.error('Failed to train custom model:', error);
      throw new AppError('Failed to train custom model', 500);
    }
  }

  /**
   * Process transcription with speaker diarization
   */
  processSpeakerDiarization(watsonResult: any): TranscriptionResult[] {
    if (!watsonResult?.results || !watsonResult?.speaker_labels) {
      return [];
    }

    const speakerLabels = watsonResult.speaker_labels;
    const results = watsonResult.results;
    const timestamp = Date.now();

    return results.flatMap((result: any, index: number) => {
      if (!result.alternatives?.[0]) {
        return [];
      }

      const speaker = speakerLabels[index]
        ? `SPEAKER_${speakerLabels[index].speaker}`
        : 'UNKNOWN';

      return [this.mapAlternativeToTranscription(result.alternatives[0], timestamp, speaker)];
    });
  }
}

export default new WatsonService();
