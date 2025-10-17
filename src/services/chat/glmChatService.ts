import type { ServiceDefinition } from '../http/types';
import { baseFetch } from '../http/baseFetch';
import type {
  ChatServiceDefinition,
  ChatRequestParams,
  ChatServiceName,
  ChatMessage,
} from './types';

export class GlmChatService implements ChatServiceDefinition {
  name: ChatServiceName = 'chat_glm';
  GLM_API_KEY = import.meta.env.VITE_GLM_API_KEY;
  GLM_API_URL = import.meta.env.VITE_GLM_API_URL;

  constructor() {}

  async execute(params: ChatRequestParams): Promise<ChatMessage | undefined> {
    const { messages, model = 'glm-4.5' } = params;
    const response = await baseFetch({
      method: 'POST',
      url: `${this.GLM_API_URL}/api/paas/v4/chat/completions`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.GLM_API_KEY}`,
      },
      body: {
        messages,
        model,
      },
    });
    console.log('glm response', response);
    if (response?.choices?.[0]?.message) {
      return response.choices[0].message;
    }
  }
}
