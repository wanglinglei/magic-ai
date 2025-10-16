<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Header />
    <main class="w-90% mx-auto py-6">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Header Section -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-semibold text-gray-900">AI Video Generator</h1>
              <p class="text-sm text-gray-500">Transform your ideas into stunning videos</p>
            </div>
          </div>
        </div>

        <!-- Video Input Section -->
        <div class="p-6">
          <div class="space-y-4">
            <!-- Input Area -->
            <div class="bg-gray-50 rounded-xl p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Describe your video concept
              </label>
              <Sender ref="senderRef" :loading="loading" @send="handleSend" />
            </div>

            <!-- Generated Video Display -->
            <div v-if="generatedVideo" class="bg-gray-50 rounded-xl p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Generated Video</h3>
              <div class="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  v-if="generatedVideo.url"
                  :src="generatedVideo.url"
                  controls
                  class="w-full h-full"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p class="text-gray-500">Generating your video...</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Example Prompts -->
            <div v-if="!generatedVideo" class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="prompt in examplePrompts"
                :key="prompt"
                @click="handleExampleClick(prompt)"
                class="p-3 bg-purple-50 border border-purple-200 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
              >
                <p class="text-sm text-purple-700">{{ prompt }}</p>
              </div>
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
import { Sender } from '@/compoents/common';
import { videoGenerator } from '@/services';

const loading = ref(false);
const senderRef = ref<InstanceType<typeof Sender>>();
const generatedVideo = ref<{url: string, prompt: string} | null>(null);

const examplePrompts = [
  "A serene landscape with rolling hills and a sunset",
  "A futuristic city with flying cars and neon lights",
  "A cozy coffee shop with people working on laptops",
  "An underwater scene with colorful coral and fish"
];

const handleSend = async (value: string) => {
  loading.value = true;
  generatedVideo.value = { url: '', prompt: value }; // Placeholder

  try {
    const res = await videoGenerator({
      prompt: value,
    });

    if (res) {
      // Simulate video generation - replace with actual API response
      setTimeout(() => {
        generatedVideo.value = {
          url: res.videoUrl || '#',
          prompt: value
        };
        loading.value = false;
      }, 3000);
    } else {
      loading.value = false;
      generatedVideo.value = null;
    }

    senderRef.value?.clearInput();
    console.log('res', res);
  } catch (error) {
    loading.value = false;
    generatedVideo.value = null;
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
.w-90% {
  width: 90%;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>
