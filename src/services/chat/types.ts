import type { ModelProvider, TMessageRole } from '@/constants';

export interface SendMessageRequest {
  model?: string;
  provider: ModelProvider;
  messages: Message[];
}

export interface Message {
  role: TMessageRole;
  content: string;
}
