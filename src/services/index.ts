import { videoGenerator } from './video';
export { videoGenerator };

import { ServiceRegistry, ServiceExecutor } from './http';
import { GlmChatService, TyChatService } from './chat/index';

const serviceRegistry = new ServiceRegistry();
serviceRegistry.registerService(new GlmChatService());
serviceRegistry.registerService(new TyChatService());

serviceRegistry.configureFeatureServices({
  chat: ['chat_glm', 'chat_ty'],
});

const serviceExecutor = new ServiceExecutor(serviceRegistry);

class ServiceController {
  async executeService(feature: string, selectedService: string, params: any) {
    return await serviceExecutor.executeFeatureService(feature, selectedService, params);
  }
}

const serviceController = new ServiceController();
export { serviceController };
