<template>
  <div class="h-100vh">
    <Header />
    <main class="w-70% mx-auto relative h-full">
      <Messages :messages="list" />

      <div class="absolute bottom-200px left-0 w-full">
        <CoreSender v-model="senderValue" @submit="handleSubmit">
          <template #header>
            <div class="flex flex-col gap-10px">
              <div v-for="item in languageStyle" :key="item.id" class="flex items-center gap-10px">
                <div class="w-10px h-10px rounded-full"></div>
                <div class="text-14px font-bold">{{ item.name }}</div>
              </div>
            </div>
          </template>
        </CoreSender>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { languageStyle } from './languageStyle';
import { CoreSender } from '@/components/sender';
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
