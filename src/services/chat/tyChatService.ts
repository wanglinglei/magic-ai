import type { ServiceDefinition } from '../http/types';
import { baseFetch } from '../http/baseFetch';
import type {
  ChatServiceDefinition,
  ChatRequestParams,
  ChatMessage,
  ChatServiceName,
} from './types';

const TY_API_KEY = import.meta.env.VITE_TY_API_KEY;
const TY_API_URL = import.meta.env.VITE_TY_API_URL;

export class TyChatService implements ChatServiceDefinition {
  name: ChatServiceName = 'chat_ty';

  constructor() {}

  async execute(params: ChatRequestParams) {
    console.log('TY_API_KEY', TY_API_KEY);
    console.log('TY_API_URL', TY_API_URL);
    const { messages, model = 'qwen-plus' } = params;
    const response = await baseFetch({
      method: 'POST',
      url: `${TY_API_URL}/compatible-mode/v1/chat/completions`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TY_API_KEY}`,
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
