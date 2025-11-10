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

  /**
   * @description: 发送邮箱验证码
   * @param {object} params
   * @return {*}
   */
  public static async sendEmailCode(params: { email: string }) {
    return request<{ code: string }>({
      url: '/general/emailCode',
      method: 'POST',
      data: params,
    });
  }
}
