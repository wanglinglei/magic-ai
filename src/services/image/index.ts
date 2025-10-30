import { request } from '@/services/http';
import type { CreateImageRequest } from './types';

export class ImageService {
  /**
   * @description: 生成图片
   * @return {*}
   */
  async createImage(params: CreateImageRequest) {
    return request<string>({
      url: '/image/createImage',
      method: 'POST',
      data: params,
    });
  }
}
