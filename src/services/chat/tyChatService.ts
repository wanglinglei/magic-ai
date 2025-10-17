import type { ServiceDefinition } from '../http/types';
import { baseFetch } from '../http/baseFetch';
import type {
  ChatServiceDefinition,
  ChatRequestParams,
  ChatMessage,
  ChatServiceName,
} from './types';

export class TyChatService implements ChatServiceDefinition {
  name: ChatServiceName = 'chat_ty';
  TY_API_KEY = import.meta.env.VITE_TY_API_KEY;
  TY_API_URL = import.meta.env.VITE_TY_API_URL;

  constructor() {}

  async execute(params: ChatRequestParams) {
    const { messages, model = 'qwen-plus' } = params;
    const response = await baseFetch({
      method: 'POST',
      url: `${this.TY_API_URL}/compatible-mode/v1/chat/completions`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.TY_API_KEY}`,
      },
      body: {
        messages,
        model,
      },
    });
    if (response?.choices?.[0]?.message) {
      return response.choices[0].message;
    }
  }
}
