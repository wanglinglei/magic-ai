import { request } from '@/services/http';
import type { GenerateVideoRequest } from './types';
export class VideoService {
  /**
   * @description: 生成视频
   * @return {*}
   */
  public static async generateVideo(params: GenerateVideoRequest) {
    return request<{ videoUrl: string }>({
      url: '/video/generate',
      method: 'POST',
      data: params,
    });
  }
}
