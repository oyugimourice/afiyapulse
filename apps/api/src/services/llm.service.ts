import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import logger from '../config/logger';
import { AppError } from '../middleware/error.middleware';

export type LLMProvider = 'openai' | 'anthropic';

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class LLMService {
  private openai: OpenAI | null = null;
  private anthropic: Anthropic | null = null;

  constructor() {
    // Initialize OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }

    // Initialize Anthropic if API key is available
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  /**
   * Generate completion using specified LLM provider
   */
  async generateCompletion(
    messages: LLMMessage[],
    config: LLMConfig
  ): Promise<LLMResponse> {
    try {
      if (config.provider === 'openai') {
        return await this.generateOpenAICompletion(messages, config);
      } else if (config.provider === 'anthropic') {
        return await this.generateAnthropicCompletion(messages, config);
      } else {
        throw new Error(`Unsupported LLM provider: ${config.provider}`);
      }
    } catch (error) {
      logger.error('LLM generation error:', error);
      throw new AppError('Failed to generate LLM completion', 500);
    }
  }

  /**
   * Generate completion using OpenAI
   */
  private async generateOpenAICompletion(
    messages: LLMMessage[],
    config: LLMConfig
  ): Promise<LLMResponse> {
    if (!this.openai) {
      throw new Error('OpenAI client not initialized');
    }

    const response = await this.openai.chat.completions.create({
      model: config.model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 2000,
      top_p: config.topP || 1,
    });

    const choice = response.choices[0];
    if (!choice || !choice.message) {
      throw new Error('No response from OpenAI');
    }

    return {
      content: choice.message.content || '',
      usage: response.usage
        ? {
            promptTokens: response.usage.prompt_tokens,
            completionTokens: response.usage.completion_tokens,
            totalTokens: response.usage.total_tokens,
          }
        : undefined,
    };
  }

  /**
   * Generate completion using Anthropic Claude
   */
  private async generateAnthropicCompletion(
    messages: LLMMessage[],
    config: LLMConfig
  ): Promise<LLMResponse> {
    if (!this.anthropic) {
      throw new Error('Anthropic client not initialized');
    }

    // Extract system message if present
    const systemMessage = messages.find((m) => m.role === 'system');
    const conversationMessages = messages.filter((m) => m.role !== 'system');

    const response = await this.anthropic.messages.create({
      model: config.model,
      max_tokens: config.maxTokens || 2000,
      temperature: config.temperature || 0.7,
      system: systemMessage?.content,
      messages: conversationMessages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
    });

    const content = response.content[0];
    if (!content || content.type !== 'text') {
      throw new Error('No text response from Anthropic');
    }

    return {
      content: content.text,
      usage: {
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens,
        totalTokens: response.usage.input_tokens + response.usage.output_tokens,
      },
    };
  }

  /**
   * Generate structured JSON output
   */
  async generateStructuredOutput<T>(
    messages: LLMMessage[],
    config: LLMConfig,
    schema?: any
  ): Promise<T> {
    // Add instruction to return JSON
    const enhancedMessages = [
      ...messages,
      {
        role: 'user' as const,
        content: 'Please respond with valid JSON only, no additional text or markdown.',
      },
    ];

    const response = await this.generateCompletion(enhancedMessages, config);

    try {
      // Remove markdown code blocks if present
      const cleaned = response.content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      // TODO: Add schema validation with Zod if schema is provided

      return parsed as T;
    } catch (error) {
      logger.error('Failed to parse structured output:', error);
      throw new AppError('Failed to parse LLM response as JSON', 500);
    }
  }

  /**
   * Stream completion (for real-time responses)
   */
  async *streamCompletion(
    messages: LLMMessage[],
    config: LLMConfig
  ): AsyncGenerator<string> {
    if (config.provider === 'openai') {
      yield* this.streamOpenAICompletion(messages, config);
    } else if (config.provider === 'anthropic') {
      yield* this.streamAnthropicCompletion(messages, config);
    } else {
      throw new Error(`Unsupported LLM provider: ${config.provider}`);
    }
  }

  /**
   * Stream OpenAI completion
   */
  private async *streamOpenAICompletion(
    messages: LLMMessage[],
    config: LLMConfig
  ): AsyncGenerator<string> {
    if (!this.openai) {
      throw new Error('OpenAI client not initialized');
    }

    const stream = await this.openai.chat.completions.create({
      model: config.model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 2000,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  }

  /**
   * Stream Anthropic completion
   */
  private async *streamAnthropicCompletion(
    messages: LLMMessage[],
    config: LLMConfig
  ): AsyncGenerator<string> {
    if (!this.anthropic) {
      throw new Error('Anthropic client not initialized');
    }

    const systemMessage = messages.find((m) => m.role === 'system');
    const conversationMessages = messages.filter((m) => m.role !== 'system');

    const stream = await this.anthropic.messages.create({
      model: config.model,
      max_tokens: config.maxTokens || 2000,
      temperature: config.temperature || 0.7,
      system: systemMessage?.content,
      messages: conversationMessages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
      stream: true,
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        yield event.delta.text;
      }
    }
  }

  /**
   * Count tokens (approximate)
   */
  estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  /**
   * Validate API keys
   */
  validateConfiguration(): { openai: boolean; anthropic: boolean } {
    return {
      openai: !!this.openai,
      anthropic: !!this.anthropic,
    };
  }
}

export default new LLMService();

// Made with Bob
