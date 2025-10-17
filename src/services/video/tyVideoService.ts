import { baseFetch } from '../http/baseFetch';
import { TyBaseService } from '../baseServices/tyBaseService';
import type {
  VideoServiceDefinition,
  VideoRequestParams,
  VideoResponse,
  VideoServiceName,
} from './types';
import { waitTask } from '../lib/waitTask';

export class TyVideoService extends TyBaseService implements VideoServiceDefinition {
  name: VideoServiceName = 'video_ty';

  async execute(params: VideoRequestParams): Promise<VideoResponse | undefined> {
    const response = await baseFetch({
      method: 'POST',
      url: this.buildApiUrl('/api/v1/services/aigc/video-generation/video-synthesis'),
      headers: this.getAsyncHeaders(),
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
