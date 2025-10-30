interface RequestOptions {
  url: string;
  method: string;
  data: any;
  headers?: Record<string, string>;
}

export interface Response<T> {
  success: boolean;
  data: T;
  message: string;
  code: number;
}

const BASE_URL = import.meta.env.VITE_API_URL;
export async function request<T>(options: RequestOptions): Promise<Response<T>> {
  const { url, method, data, headers } = options;
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    body: JSON.stringify(data),
    headers: headers,
  });
  if (!response.ok)
    throw new Error(`${BASE_URL}${url} request failed with status: ${response.status}`);
  return response.json() as Promise<Response<T>>;
}
