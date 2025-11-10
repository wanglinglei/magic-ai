/*
 * @Author: wanglinglei
 * @Date: 2025-11-06 11:20:51
 * @Description: 用户服务
 * @FilePath: /magicAI/src/services/user/index.ts
 * @LastEditTime: 2025-11-10 16:00:00
 */
import { request } from '@/services/http';
import type {
  LoginByUsernameRequest,
  LoginUserResponse,
  User,
  RegisterRequest,
  LoginByEmailRequest,
} from './types';
export class UserService {
  /**
   * @description: 用户注册
   * @param {RegisterRequest} params
   * @return {*}
   */
  public static async register(params: RegisterRequest) {
    return request<boolean>({
      url: '/user/register',
      method: 'POST',
      data: params,
    });
  }
  /**
   * @description: 用户名密码登录
   * @param {LoginByUsernameRequest} params
   * @return {*}
   */
  public static async loginByUsername(params: LoginByUsernameRequest) {
    return request<LoginUserResponse>({
      url: '/user/login',
      method: 'POST',
      data: params,
    });
  }

  public static async loginByEmail(params: LoginByEmailRequest) {
    return request<LoginUserResponse>({
      url: '/user/emailLogin',
      method: 'POST',
      data: params,
    });
  }

  /**
   * @description:支付宝授权登录
   * @param {string} authCode
   * @return {*}
   */
  public static async loginByAlipay(authCode: string) {
    return request<LoginUserResponse>({
      url: '/alipay-auth/login',
      method: 'POST',
      data: { authCode },
    });
  }

  /**
   * @description: 退出登录
   * @return {*}
   */
  public static async logout() {
    return request<boolean>({
      url: '/user/logout',
      method: 'POST',
    });
  }

  /**
   * @description: 获取用户信息
   * @return {*}
   */
  public static async getUserInfo() {
    return request<User>({
      url: '/user/profile',
      method: 'GET',
    });
  }

  public static async updateUserInfo(params: User) {
    return request<boolean>({
      url: '/user/update',
      method: 'POST',
      data: params,
    });
  }
}
