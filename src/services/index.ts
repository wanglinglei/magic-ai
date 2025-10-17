import { videoGenerator } from './video';
export { videoGenerator };

import { ServiceRegistry, ServiceExecutor } from './http';
import { GlmChatService, TyChatService, chatServiceNameConfig } from './chat/index';
import { GlmVideoService, TyVideoService, videoServiceNameConfig } from './video/index';

const serviceRegistry = new ServiceRegistry();
serviceRegistry.registerService(new GlmChatService());
serviceRegistry.registerService(new TyChatService());
serviceRegistry.registerService(new GlmVideoService());
serviceRegistry.registerService(new TyVideoService());

serviceRegistry.configureFeatureServices({
  ...chatServiceNameConfig,
  ...videoServiceNameConfig,
});

const serviceExecutor = new ServiceExecutor(serviceRegistry);

class ServiceController {
  async executeService(feature: string, selectedService: string, params: any) {
    return await serviceExecutor.executeFeatureService(feature, selectedService, params);
  }
}

const serviceController = new ServiceController();
export { serviceController };
