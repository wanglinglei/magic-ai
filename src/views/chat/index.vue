<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Header />
    <main class="w-90% mx-auto py-6">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Messages Container -->
        <div class="h-[600px] overflow-y-auto p-6 space-y-4">
          <Messages :messages="messages" />
        </div>

        <!-- Sender Component -->
        <div class="border-t border-gray-100 p-4 bg-gray-50/50">
          <Sender ref="senderRef" :loading="loading" @send="handleSend" />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Header, Footer } from '@/compoents/page';
import { Sender, Messages } from '@/compoents/common';
import { serviceController } from '@/services';
const loading = ref(false);
const senderRef = ref<InstanceType<typeof Sender>>();
const messages = ref<
  Array<{ role: 'user' | 'assistant'; content: string; type: 'text' | 'image'; avatar?: string }>
>([]);

const handleSend = async (value: string) => {
  loading.value = true;
  messages.value.push({ role: 'user', content: value, type: 'text' });
  const res = await serviceController.executeService('chat', 'chat_glm', {
    messages: messages.value,
  });
  loading.value = false;
  if (res) {
    messages.value.push({ ...res.data, type: 'text' });
    senderRef.value?.clearInput();
  }
};
</script>

<style scoped>
/* Custom scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

.w-90% {
  width: 90%;
}
</style>
