import { request } from '@/services/http';
import type { TyGenerateVideoRequest, GlmGenerateVideoRequest } from './types';
export class VideoService {
  /**
   * @description: 生成视频
   * @return {*}
   */
  public static async generateVideo(params: TyGenerateVideoRequest | GlmGenerateVideoRequest) {
    return request<{ videoUrl: string }>({
      url: '/video/generate',
      method: 'POST',
      data: params,
    });
  }
}
