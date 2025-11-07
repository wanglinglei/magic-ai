import { request } from '@/services/http';

export class GeneralService {
  /**
   * @description: 获取图形验证码
   * @return {*}
   */
  public static async getCaptcha() {
    return request<{ image: string }>({
      url: '/general/captcha',
      method: 'GET',
    });
  }
}
