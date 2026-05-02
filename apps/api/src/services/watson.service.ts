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
  private speechToText: SpeechToTextV1;
  private modelName: string;

  constructor() {
    // Initialize Watson Speech-to-Text
    this.speechToText = new SpeechToTextV1({
      authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_API_KEY || '',
      }),
      serviceUrl: process.env.WATSON_SERVICE_URL || '',
    });

    // Use medical vocabulary model if available
    this.modelName = process.env.WATSON_MODEL || 'en-US_BroadbandModel';
  }

  /**
   * Transcribe audio file
   */
  async transcribeAudio(audioBuffer: Buffer, contentType: string = 'audio/webm'): Promise<TranscriptionResult[]> {
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

      if (!response.result.results || response.result.results.length === 0) {
        logger.warn('No transcription results from Watson');
        return [];
      }

      const transcriptions: TranscriptionResult[] = [];

      for (const result of response.result.results) {
        if (result.alternatives && result.alternatives.length > 0) {
          const alternative = result.alternatives[0];
          
          transcriptions.push({
            text: alternative.transcript || '',
            confidence: alternative.confidence || 0,
            timestamp: Date.now(),
          });
        }
      }

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
    const transcriptions: TranscriptionResult[] = [];

    if (!watsonResult.results || !watsonResult.speaker_labels) {
      return transcriptions;
    }

    const speakerLabels = watsonResult.speaker_labels;
    const results = watsonResult.results;

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.alternatives && result.alternatives.length > 0) {
        const alternative = result.alternatives[0];
        
        // Find corresponding speaker label
        let speaker = 'UNKNOWN';
        if (speakerLabels[i]) {
          speaker = `SPEAKER_${speakerLabels[i].speaker}`;
        }

        transcriptions.push({
          text: alternative.transcript || '',
          confidence: alternative.confidence || 0,
          speaker,
          timestamp: Date.now(),
        });
      }
    }

    return transcriptions;
  }
}

export default new WatsonService();

// Made with Bob
