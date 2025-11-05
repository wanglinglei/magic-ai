<template>
  <div class="h-100vh">
    <Header />
    <main class="w-70% mx-auto relative h-full">
      <Messages :messages="list" />

      <div class="absolute bottom-200px left-0 w-full">
        <CoreSender v-model="senderValue" @submit="handleSubmit" ref="coreSenderRef">
          <template #header>
            <div class="p-24px">
              <div class="mb-16px flex-between">
                <div>
                  <GradientText text="选择风格" class="text-24px font-bold" />
                </div>
                <button
                  @click="resetStyle"
                  class="px-20px py-8px rounded-full text-13px font-medium transition-all cursor-pointer border-2 border-solid hover:scale-105"
                  :class="[
                    selectedStyleId === ''
                      ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white border-orange-400 shadow-lg'
                      : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100',
                  ]"
                >
                  <span class="flex items-center gap-4px">
                    <span>重置</span>
                  </span>
                </button>
              </div>
              <div class="flex justify-start gap-12px flex-wrap">
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
            </div>
          </template>
          <template #prefix>
            <div class="px-24px py-12px flex items-center">
              <button
                class="w-48px h-48px flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:scale-110 group border-0 outline-none"
                style="border: none"
                title="设置"
                @click="changeSettingPanel"
              >
                <SettingIcon />
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
import { languageStyle, getSystemPrompt } from './languageStyle';
import { GradientText } from '@/components/animationComponents';
import { CoreSender } from '@/components/sender';
import type { Message } from '@/services/chat/types';
import { ChatService } from '@/services/chat';
import { MessageRole } from '@/constants';
import Messages from '@/components/message/index.vue';
import { Header } from '@/components/page';
import { SettingIcon } from '@/assets/svg';
defineOptions({
  name: 'ChatPage',
});

// 根据索引返回不同的默认样式（未选中状态）
const getDefaultStyle = (index: number) => {
  const styles = [
    'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
    'bg-cyan-50 text-cyan-600 border-cyan-200 hover:bg-cyan-100',
    'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
    'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100',
    'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100',
  ];
  return styles[index % styles.length];
};

// 根据索引返回不同的选中样式
const getSelectedStyle = (index: number) => {
  const styles = [
    'bg-blue-500 text-white border-blue-500 shadow-lg',
    'bg-cyan-500 text-white border-cyan-500 shadow-lg',
    'bg-purple-500 text-white border-purple-500 shadow-lg',
    'bg-pink-500 text-white border-pink-500 shadow-lg',
    'bg-amber-500 text-white border-amber-500 shadow-lg',
  ];
  return styles[index % styles.length];
};

const coreSenderRef = useTemplateRef('coreSenderRef');
const settingPanelVisible = ref(true);
const changeSettingPanel = () => {
  if (settingPanelVisible.value) {
    coreSenderRef.value?.closeHeader();
    settingPanelVisible.value = false;
  } else {
    coreSenderRef.value?.openHeader();
    settingPanelVisible.value = true;
  }
};
const senderValue = ref('');
const selectedStyleId = ref<string>(''); // 默认选中第一个

const resetStyle = () => {
  selectedStyleId.value = '';
};
/**
 * @description: 选择风格
 * @param {*} styleId
 * @return {*}
 */
const selectStyle = (styleId: string) => {
  selectedStyleId.value = styleId;
};

const list = ref<Message[]>([]);
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
    coreSenderRef.value?.setSenderValue('');
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
