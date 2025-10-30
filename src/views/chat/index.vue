<template>
  <div>
    <h1>Chat</h1>
    <main class="w-70% mx-auto">
      <BubbleList :list="list" max-height="350px" />
      <Sender
        v-model="senderValue"
        variant="updown"
        clearable
        allow-speech
        @submit="handleSubmit"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BubbleList, Sender } from 'vue-element-plus-x';
import type { Message } from '@/services/chat/types';
import { ChatService } from '@/services/chat';
import { MessageRole, type TMessageRole } from '@/constants';

const list = ref<Array<Message & { placement: string }>>([]);
const senderValue = ref('');
const handleSubmit = async (value: string) => {
  console.log(value);

  const message = {
    role: MessageRole.USER,
    content: value,
    placement: 'end',
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
      placement: 'start',
    });
  }
};
</script>

<style></style>
