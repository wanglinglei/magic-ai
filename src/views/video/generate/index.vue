<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Header />
    <main class="w-90% mx-auto py-6">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Header Section -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl flex items-center justify-center"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-semibold text-gray-900">AI Video Generator</h1>
              <p class="text-sm text-gray-500">Transform your ideas into stunning videos</p>
            </div>
          </div>
        </div>

        <Messages :messages="messages" />

        <!-- Video Input Section -->
        <div class="p-6">
          <div class="space-y-4">
            <!-- Input Area -->
            <div class="bg-gray-50 rounded-xl p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Describe your video concept
              </label>
              <Sender ref="senderRef" :loading="loading" @send="handleSend">
                <template #senderHeader>
                  <SelectOption
                    :options="videoServiceNameConfig.video"
                    title="模型"
                    v-model:value="selectedModel"
                  />
                </template>
              </Sender>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Header, Footer } from '@/compoents/page';
import { Sender, Messages, SelectOption } from '@/compoents/common';
import { serviceController } from '@/services';
import { videoServiceNameConfig } from '@/services/video/index';
const testVideoUrl =
  'https://maas-watermark-prod.cn-wlcb.ufileos.com/1760685375310_watermark.mp4?UCloudPublicKey=TOKEN_75a9ae85-4f15-4045-940f-e94c0f82ae90&Signature=TqSVDUFW0zkEwFnuYks8qnLhr4E%3D&Expires=1760771775';
const loading = ref(false);
const senderRef = ref<InstanceType<typeof Sender>>();
// const generatedVideo = ref<{ url: string; prompt: string } | null>(null);
const messages = ref<
  { role: 'user' | 'assistant'; content: string; type: 'text' | 'image' | 'video' }[]
>([
  { role: 'user', content: 'A serene landscape with rolling hills and a sunset', type: 'text' },
  { role: 'assistant', content: testVideoUrl, type: 'video' },
]);

const selectedModel = ref('video_glm');

const handleSend = async (value: string) => {
  loading.value = true;
  messages.value.push({ role: 'user', content: value, type: 'text' });
  try {
    const res = await serviceController.executeService('video', 'video_ty', {
      prompt: value,
    });
    console.log('res', res);
    loading.value = false;
    messages.value.push({ role: 'assistant', content: testVideoUrl, type: 'video' });
    if (res?.data?.videoUrl) {
      messages.value.push({ role: 'assistant', content: res.data.videoUrl, type: 'video' });
      senderRef.value?.clearInput();
    }
  } catch (error) {
    loading.value = false;
    console.error('Error generating video:', error);
  }
};

const handleExampleClick = (prompt: string) => {
  if (senderRef.value) {
    // We need to trigger the send action with the example prompt
    handleSend(prompt);
  }
};
</script>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>
