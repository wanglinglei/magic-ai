import { baseFetch } from '../http/baseFetch';
import type {
  VideoServiceDefinition,
  VideoRequestParams,
  VideoResponse,
  VideoServiceName,
} from './types';
import { waitTask } from '../lib/waitTask';

export class GlmVideoService implements VideoServiceDefinition {
  name: VideoServiceName = 'video_glm';
  GLM_API_KEY = import.meta.env.VITE_GLM_API_KEY;
  GLM_API_URL = import.meta.env.VITE_GLM_API_URL;

  constructor() {}

  async execute(params: VideoRequestParams): Promise<VideoResponse | undefined> {
    const response = await baseFetch({
      method: 'POST',
      url: `${this.GLM_API_URL}/api/paas/v4/videos/generations`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.GLM_API_KEY}`,
      },
      body: {
        prompt: params.prompt,
      },
    });
    if (response?.output?.task_id) {
      const taskResponse = await waitTask({
        taskId: response.output.task_id,
        sign: 'glm',
        checkTaskCompleted: (result) => !!result.video_result?.[0]?.url,
      });
      if (taskResponse?.video_result?.[0]?.url) {
        return {
          videoUrl: taskResponse.video_result[0].url,
        };
      }
    }
    return undefined;
  }
}
