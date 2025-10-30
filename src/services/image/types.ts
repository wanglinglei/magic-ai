import type { ModelProvider } from '@/constants';
export interface CreateImageRequest {
  prompt: string;
  model?: string;
  size?: string;
  provider?: ModelProvider;
}

export interface CreateImageResponse {
  imageUrls: { url: string }[];
}
