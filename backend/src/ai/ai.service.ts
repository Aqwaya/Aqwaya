import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

/**
 * Structural interfaces for AI Engine responses to enforce strict typing
 */
export interface ChatEngineResponse {
  bot_message?: string;
  profile?: Record<string, unknown>;
  suggestive_responses?: string[];
  ready_to_generate?: boolean;
}

export interface GenerationEngineResponse {
  strategy?: unknown;
  assets?: unknown;
  [key: string]: unknown;
}

export interface GenerateAssetsPayload {
  owner_name: string;
  business_name: string;
  industry: string;
  website_url: string;
  prompt: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly baseUrl =
    process.env.AI_ENGINE_URL || 'http://localhost:8000';

  /**
   * 🍪 Cookie Session Storage Map
   * Maps campaignId -> Flask Session Cookie String
   * Ensures multi-step conversation isolation and context continuity across stateful WS flows
   */
  private sessionCookies = new Map<string, string>();

  /**
   * Dispatches user message prompts to the Flask AI Engine conversational intake loop
   */
  async getChatResponse(
    campaignId: string,
    prompt: string,
  ): Promise<ChatEngineResponse> {
    try {
      const savedCookie = this.sessionCookies.get(campaignId);
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (savedCookie) {
        headers['Cookie'] = savedCookie;
      }

      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) {
        throw new HttpException(
          `AI Engine communication failure: ${response.statusText}`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      // Intercept and preserve session cookie updates dispatched by Flask
      const setCookieHeader = response.headers.get('set-cookie');
      if (setCookieHeader) {
        this.sessionCookies.set(campaignId, setCookieHeader);
      }

      return (await response.json()) as ChatEngineResponse;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      const err = error as Error;
      this.logger.error(
        `Error in getChatResponse for campaign ${campaignId}:`,
        err.stack || err.message || err,
      );
      throw new HttpException(
        'Failed to fetch response from AI Orchestrator',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Triggers the parallel multi-agent specialist generation run
   */
  async generateCampaignAssets(
    payload: GenerateAssetsPayload,
  ): Promise<GenerationEngineResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new HttpException(
          `AI Engine asset generation failure: ${response.statusText}`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      return (await response.json()) as GenerationEngineResponse;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      const err = error as Error;
      this.logger.error(
        'Error in generateCampaignAssets execution:',
        err.stack || err.message || err,
      );
      throw new HttpException(
        'Parallel specialist processing failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Clears tracking context once a conversation context lifecycle terminates
   */
  clearSession(campaignId: string): void {
    this.sessionCookies.delete(campaignId);
  }
}
