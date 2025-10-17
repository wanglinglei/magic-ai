import { baseFetch } from '../http/baseFetch';
import type {
  VideoServiceDefinition,
  VideoRequestParams,
  VideoResponse,
  VideoServiceName,
} from './types';
import { waitTask } from '../lib/waitTask';

export class TyVideoService implements VideoServiceDefinition {
  name: VideoServiceName = 'video_ty';
  TY_API_KEY = import.meta.env.VITE_TY_API_KEY;
  TY_API_URL = import.meta.env.VITE_TY_API_URL;

  constructor() {}

  async execute(params: VideoRequestParams): Promise<VideoResponse | undefined> {
    const response = await baseFetch({
      method: 'POST',
      url: `${this.TY_API_URL}/api/v1/services/aigc/video-generation/video-synthesis`,
      headers: {
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'enable',
        Authorization: `Bearer ${this.TY_API_KEY}`,
      },
      body: {
        prompt: params.prompt,
      },
    });
    if (response?.output?.task_id) {
      const taskResponse = await waitTask({
        taskId: response.output.task_id,
        sign: 'ty',
        checkTaskCompleted: (result) => result.output?.task_status === 'SUCCEEDED',
      });
      if (taskResponse?.output?.video_url) {
        return {
          videoUrl: taskResponse.output.video_url,
        };
      }
    }
  }
}
