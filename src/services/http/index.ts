interface RequestOptions {
  url: string;
  method: string;
  data?: unknown;
  headers?: Record<string, string>;
}

export interface Response<T> {
  success: boolean;
  data: T;
  message: string;
  code: number;
}

import { elMessageUtils } from '@/utils/elMessage';
import { ErrorCode } from './constants';
import { useUserStore } from '@/stores';

const BASE_URL = import.meta.env.VITE_API_URL;
export async function request<T>(options: RequestOptions): Promise<Response<T>> {
  const { url, method, data, headers = {} } = options;

  // 判断 data 是否为 FormData，如果是则直接使用，否则 JSON 序列化
  const isFormData = data instanceof FormData;
  const body = isFormData ? data : JSON.stringify(data);

  // 如果不是 FormData，需要设置 Content-Type
  const requestHeaders = isFormData
    ? headers // FormData 不设置 Content-Type，让浏览器自动设置
    : {
        'Content-Type': 'application/json',
        ...headers,
      };

  const userStore = useUserStore();
  const accessToken = userStore.accessToken;
  if (accessToken) {
    requestHeaders['Authorization'] = accessToken;
  }
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    body,
    headers: requestHeaders,
    credentials: 'include', // 携带 cookie 和其他凭证信息
  });
  const resData = await response.json();
  if (!response.ok) {
    const { message, errorCode } = resData;
    if (
      errorCode === ErrorCode.TOKEN_EXPIRED ||
      errorCode === ErrorCode.TOKEN_INVALID ||
      errorCode === ErrorCode.UNAUTHORIZED
    ) {
      elMessageUtils.error(message);
      userStore.logout();
      return resData as Promise<Response<T>>;
    }
  }
  return resData as Promise<Response<T>>;
}
