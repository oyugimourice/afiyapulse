import { EventEmitter } from 'events';
import { AgentType, AgentStatus, AgentMessage } from '@afiyapulse/shared-types';
import logger from '../config/logger';

export interface AgentConfig {
  name: string;
  type: AgentType;
  description: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AgentContext {
  consultationId: string;
  patientId: string;
  doctorId: string;
  transcripts: Array<{
    text: string;
    speaker: string;
    timestamp: Date;
  }>;
  metadata?: Record<string, any>;
}

export abstract class BaseAgent extends EventEmitter {
  protected name: string;
  protected type: AgentType;
  protected description: string;
  protected status: AgentStatus;
  protected model: string;
  protected temperature: number;
  protected maxTokens: number;

  constructor(config: AgentConfig) {
    super();
    this.name = config.name;
    this.type = config.type;
    this.description = config.description;
    this.status = 'idle';
    this.model = config.model || 'gpt-4';
    this.temperature = config.temperature || 0.7;
    this.maxTokens = config.maxTokens || 2000;
  }

  /**
   * Get agent information
   */
  getInfo() {
    return {
      name: this.name,
      type: this.type,
      description: this.description,
      status: this.status,
      model: this.model,
    };
  }

  /**
   * Update agent status
   */
  protected updateStatus(status: AgentStatus, message?: string) {
    this.status = status;
    this.emit('status', {
      agent: this.name,
      type: this.type,
      status,
      message,
      timestamp: new Date(),
    });

    logger.info(`[${this.name}] Status: ${status}${message ? ` - ${message}` : ''}`);
  }

  /**
   * Send agent message
   */
  protected sendMessage(message: Omit<AgentMessage, 'timestamp'>) {
    const fullMessage: AgentMessage = {
      ...message,
      timestamp: new Date(),
    };

    this.emit('message', fullMessage);
    logger.info(`[${this.name}] Message: ${message.content.substring(0, 100)}...`);
  }

  /**
   * Handle errors
   */
  protected handleError(error: Error, context?: string) {
    const errorMessage = `${context ? `${context}: ` : ''}${error.message}`;
    
    this.updateStatus('error', errorMessage);
    this.emit('error', {
      agent: this.name,
      type: this.type,
      error: errorMessage,
      timestamp: new Date(),
    });

    logger.error(`[${this.name}] Error: ${errorMessage}`, error);
  }

  /**
   * Process agent task (to be implemented by subclasses)
   */
  abstract process(context: AgentContext): Promise<any>;

  /**
   * Validate context before processing
   */
  protected validateContext(context: AgentContext): void {
    if (!context.consultationId) {
      throw new Error('Consultation ID is required');
    }
    if (!context.patientId) {
      throw new Error('Patient ID is required');
    }
    if (!context.doctorId) {
      throw new Error('Doctor ID is required');
    }
    if (!context.transcripts || context.transcripts.length === 0) {
      throw new Error('Transcripts are required');
    }
  }

  /**
   * Extract relevant information from transcripts
   */
  protected extractTranscriptText(context: AgentContext): string {
    return context.transcripts
      .map((t) => `[${t.speaker}]: ${t.text}`)
      .join('\n');
  }

  /**
   * Format prompt with context
   */
  protected formatPrompt(template: string, variables: Record<string, any>): string {
    let prompt = template;
    
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      prompt = prompt.replace(new RegExp(placeholder, 'g'), String(value));
    }

    return prompt;
  }

  /**
   * Call LLM (to be implemented with actual LLM provider)
   */
  protected async callLLM(prompt: string, systemPrompt?: string): Promise<string> {
    // This will be implemented with actual LLM provider (OpenAI, Anthropic, etc.)
    // For now, return a placeholder
    throw new Error('LLM provider not implemented');
  }

  /**
   * Parse structured output from LLM response
   */
  protected parseStructuredOutput<T>(response: string, schema: any): T {
    try {
      // Remove markdown code blocks if present
      const cleaned = response
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);
      
      // Basic validation against schema (can be enhanced with Zod or similar)
      return parsed as T;
    } catch (error) {
      logger.error(`[${this.name}] Failed to parse structured output:`, error);
      throw new Error('Failed to parse LLM response');
    }
  }

  /**
   * Retry logic for LLM calls
   */
  protected async retryLLM(
    fn: () => Promise<string>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<string> {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        logger.warn(`[${this.name}] LLM call failed (attempt ${i + 1}/${maxRetries}):`, error);
        
        if (i < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
        }
      }
    }

    throw lastError || new Error('LLM call failed after retries');
  }

  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    this.removeAllListeners();
    this.updateStatus('idle');
  }
}

// Made with Bob
