import { request } from './request';

const api = '/compatible-mode/v1/chat/completions';

interface ChatRequestParams {
  messages: {
    role: 'user' | 'assistant' | 'system';
    content: string;
  }[];
  model?: string;
}

export const chat = (params: ChatRequestParams) => {
  const { messages, model = 'qwen-plus' } = params;
  return request({
    method: 'POST',
    api,
    body: {
      messages,
      model,
    },
  });
};
