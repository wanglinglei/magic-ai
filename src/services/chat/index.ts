import { GlmChatService } from './glmChatService';
import { TyChatService } from './tyChatService';

export const chatServiceNameConfig = {
  chat: [
    {
      name: '通义千问 ',
      value: 'chat_ty',
    },
    {
      name: '智谱',
      value: 'chat_glm',
    },
  ],
};

export { GlmChatService, TyChatService };
