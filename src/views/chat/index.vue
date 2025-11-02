<template>
  <div class="h-100vh">
    <Header />
    <main class="w-70% mx-auto relative h-full">
      <Messages :messages="list" />

      <div class="absolute bottom-200px left-0 w-full">
        <Sender
          v-model="senderValue"
          variant="updown"
          clearable
          allow-speech
          @submit="handleSubmit"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Sender } from 'vue-element-plus-x';
import type { Message } from '@/services/chat/types';
import { ChatService } from '@/services/chat';
import { MessageRole, type TMessageRole } from '@/constants';
import Messages from '@/components/message/index.vue';
import { Header, Footer, PageContainer } from '@/components/page';
const list = ref<Message[]>([]);
const senderValue = ref('');
const handleSubmit = async (value: string) => {
  console.log(value);

  const message = {
    role: MessageRole.USER,
    content: value,
  };
  list.value.push(message);
  const res = await ChatService.sendMessage({
    messages: list.value.map((item) => ({
      role: item.role,
      content: item.content,
    })),
    provider: 'ty',
  });
  if (res.success) {
    list.value.push({
      role: MessageRole.ASSISTANT,
      content: res.data.content,
    });
  }
};
</script>

<style></style>
