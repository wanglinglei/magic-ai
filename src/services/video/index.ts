import { GlmVideoService } from './glmVideoService';
import { TyVideoService } from './tyVideoService';

export const videoServiceNameConfig = {
  video: [
    {
      name: '通义千问 ',
      value: 'video_ty',
    },
    {
      name: '智谱',
      value: 'video_glm',
    },
  ],
};

export { GlmVideoService, TyVideoService };
