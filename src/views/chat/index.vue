<template>
  <div class="h-100vh">
    <Header />
    <main class="w-70% mx-auto relative h-full">
      <Messages :messages="list" />

      <div class="absolute bottom-200px left-0 w-full">
        <CoreSender v-model="senderValue" @submit="handleSubmit">
          <template #header>
            <div class="flex justify-start gap-12px p-24px flex-wrap">
              <button
                v-for="(item, index) in languageStyle"
                :key="item.id"
                @click="selectStyle(item.id)"
                class="px-20px py-10px rounded-full text-14px font-medium transition-all cursor-pointer border-2 border-solid hover:scale-105"
                :class="[
                  selectedStyleId === item.id ? getSelectedStyle(index) : getDefaultStyle(index),
                ]"
              >
                {{ item.name }}
              </button>
            </div>
          </template>
        </CoreSender>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { languageStyle, getDefaultStyle, getSelectedStyle, getSystemPrompt } from './languageStyle';
import { CoreSender } from '@/components/sender';
import type { Message } from '@/services/chat/types';
import { ChatService } from '@/services/chat';
import { MessageRole } from '@/constants';
import Messages from '@/components/message/index.vue';
import { Header } from '@/components/page';

defineOptions({
  name: 'ChatPage',
});

const list = ref<Message[]>([]);
const senderValue = ref('');
const selectedStyleId = ref<string>(''); // 默认选中第一个

/**
 * @description: 选择风格
 * @param {*} styleId
 * @return {*}
 */
const selectStyle = (styleId: string) => {
  selectedStyleId.value = styleId;
  const selectedStyle = languageStyle.find((item) => item.id === styleId);
  console.log('选中的风格：', selectedStyle?.name);
  // 这里可以添加更多的逻辑，比如更新系统提示词等
};

const handleSubmit = async (value: string) => {
  console.log(value);

  const message = {
    role: MessageRole.USER,
    content: value,
  };
  list.value.push(message);

  const contentMessages = list.value.map((item) => ({
    role: item.role,
    content: item.content,
  }));
  const systemPrompt = getSystemPrompt(selectedStyleId.value);
  if (systemPrompt) {
    contentMessages.unshift({
      role: MessageRole.SYSTEM,
      content: systemPrompt,
    });
  }

  const res = await ChatService.sendMessage({
    messages: contentMessages,
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

<style scoped>
button {
  outline: none;
}
</style>
