import { request } from '@/services/http';
import type { SendMessageRequest, Message } from './types';

export class ChatService {
  /**
   * @description: 发送消息
   * @return {*}
   */
  public static async sendMessage(params: SendMessageRequest) {
    return request<Message>({
      url: '/chat/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    });
  }
}
