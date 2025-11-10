import { request } from '@/services/http';
import type { CreateImageRequest, CreateImageResponse } from './types';

export class ImageService {
  /**
   * @description: 生成图片
   * @return {*}
   */
  public static async createImage(params: CreateImageRequest) {
    return request<CreateImageResponse>({
      url: '/image/generate',
      method: 'POST',
      data: params,
    });
  }
}
