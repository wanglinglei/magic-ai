/**
 * @description: 用户注册请求
 * @return {*}
 */
export interface RegisterRequest {
  username: string;
  password: string;
  captcha: string;
  gender?: string; // 性别：male-男，female-女，other-其他
}

/**
 * @description: 用户名密码登录请求
 * @return {*}
 */
export interface LoginByUsernameRequest {
  username: string;
  password: string;
  captcha: string;
}

/**
 * @description: 用户信息
 * @return {*}
 */
export interface User {
  id: string;
  authScope: string;
  username: string;
  nickname: string;
  email?: string;
  avatar?: string;
  province?: string;
  city?: string;
  gender?: string; // 性别：male-男，female-女，other-其他
  status: number;
  createTime: string;
  updateTime: string;
}

export interface LoginUserResponse {
  accessToken: string;
  userInfo: User;
}

export interface LoginByEmailRequest {
  email: string;
  emailCode: string;
}

export interface GetUserListRequest {
  page: number;
  pageSize: number;
}

export interface GetUserListResponse {
  list: User[];
  total: number;
  page: number;
  pageSize: number;
}
