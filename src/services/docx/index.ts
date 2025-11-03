import { request } from '@/services/http';

export class DocxService {
  public static async processContentData(params: FormData) {
    return request<string>({
      url: '/docx-process/processData',
      method: 'POST',
      data: params,
      // 不要手动设置 Content-Type，让浏览器自动设置（包含 boundary）
    });
  }
}
