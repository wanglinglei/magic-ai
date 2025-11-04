<template>
  <div class="h-100vh flex-col-center">
    <div class="w-80% border-1px border-solid border-gray-200 rounded-20px h-80vh p-40px">
      <div class="w-500px">
        <CoreSender class="mb-24px" v-model="senderValue" @submit="handleSubmit">
          <template #prefix>
            <button
              class="ai-prompt-button flex items-center gap-8px px-16px py-8px rounded-8px text-14px font-medium transition-all hover:opacity-90"
              :disabled="senderValue.length === 0"
              @click="handleAiPrompt"
            >
              <MagicIcon />
              <span>AI提示词</span>
            </button>
          </template>
        </CoreSender>
        <div class="w-180px mb-24px">
          <Select
            title="模型"
            style="width: 100%"
            :options="modelOptions"
            v-model="selectedModel"
          />
        </div>
        <RadioTag
          title="质量"
          class="mb-24px"
          :options="qualityOptions"
          v-model="selectedQuality"
        />
        <RadioTag
          title="分辨率"
          class="mt-24px"
          :options="resolutionOptions"
          v-model="selectedResolution"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CoreSender } from '@/components/sender';
import { RadioTag, Select } from '@/components/userAction';
import { MagicIcon } from '@/assets/svg';
import {
  getModelOptions,
  getQualityOptionsByModel,
  getResolutionsByModelAndQuality,
} from './modelConfig/textToVideo';

defineOptions({
  name: 'VideoPage',
});

// 模型选择
const modelOptions = getModelOptions();
const selectedModel = ref('wan2.5-t2v-preview');

// 质量选择
const qualityOptions = computed(() => {
  return getQualityOptionsByModel(selectedModel.value);
});
const selectedQuality = ref(1080);

// 分辨率选择
const resolutionOptions = computed(() => {
  return getResolutionsByModelAndQuality(selectedModel.value, selectedQuality.value);
});
const selectedResolution = ref('1920×1080');

const senderValue = ref('');
const handleSubmit = (value: string) => {
  console.log(value);
};

const handleAiPrompt = () => {
  console.log('AI提示词');
  // 这里可以添加 AI 提示词的逻辑
};
</script>

<style scoped>
.ai-prompt-button {
  background-color: #f3e8ff;
  color: #9333ea;
  border: 2px solid #a855f7;
  outline: none;
  cursor: pointer;
}

.ai-prompt-button:hover {
  background-color: #e9d5ff;
  border-color: #9333ea;
}

.ai-prompt-button:active {
  background-color: #ddd6fe;
  border-color: #7e22ce;
}
</style>
