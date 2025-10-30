export const modelProvider = [
  {
    label: '通义千问',
    value: 'ty',
  },
  {
    label: '智谱',
    value: 'glm',
  },
];

export type ModelProvider = (typeof modelProvider)[number]['value'];

export const MessageRole = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const;

export type TMessageRole = (typeof MessageRole)[keyof typeof MessageRole];
