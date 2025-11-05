<template>
  <div class="h-100vh flex justify-start items-center flex-col">
    <Header />
    <div
      class="w-85% border-1px border-solid border-gray-200 rounded-20px h-80vh p-40px flex justify-start"
    >
      <div class="w-500px">
        <CoreSender ref="coreSenderRef" class="mb-24px" v-model="senderValue">
          <template #prefix>
            <button
              class="ai-prompt-button flex items-center gap-8px px-16px py-8px rounded-8px text-14px font-medium transition-all hover:opacity-90"
              @click="handleAiPrompt"
              :disabled="senderValue.length === 0"
            >
              <MagicIcon />
              <span>AI提示词</span>
            </button>
          </template>
        </CoreSender>
        <div class="w-180px mb-16px">
          <Select
            title="供应商"
            style="width: 100%"
            :options="modelProvider"
            v-model="selectedProvider"
          />
        </div>
        <div class="w-180px mb-16px">
          <Select
            title="模型"
            style="width: 100%"
            :options="modelOptions"
            v-model="selectedModel"
          />
        </div>
        <RadioTag
          title="质量"
          class="mb-16px"
          :options="qualityOptions"
          v-model="selectedQuality"
        />
        <RadioTag
          v-if="selectedProvider === 'glm'"
          title="分辨率"
          class="mb-16px"
          :options="resolutionOptions"
          v-model="selectedResolution"
        />
        <RadioTag title="fps" class="mb-16px" :options="fpsConfig" v-model="selectedFps" />
        <RadioTag
          title="时长"
          class="mb-16px"
          :options="durationOptions"
          v-model="selectedDuration"
        />

        <button
          class="ai-prompt-button flex items-center justify-center gap-8px px-16px py-8px rounded-8px text-14px font-medium transition-all hover:opacity-90 mt-24px"
          @click="handleStartGenerate"
        >
          <span>开始生成</span>
        </button>
      </div>
      <div class="flex-1 flex-center border-left ml-24px">
        <div
          v-if="resultVideoUrl"
          class="mt-24px ml-80px border-1px border-solid border-gray-200 rounded-20px p-24px"
        >
          <video
            :src="resultVideoUrl"
            :style="{ width: videoDisplaySize.width, height: videoDisplaySize.height }"
            controls
            class="rounded-12px shadow-lg"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CoreSender } from '@/components/sender';
import { RadioTag, Select } from '@/components/userAction';
import { MagicIcon } from '@/assets/svg';
import { Header } from '@/components/page';
import {
  getModelOptions,
  getQualityOptionsByModel,
  getResolutionsByModelAndQuality,
  getDurationOptionsByModel,
} from './modelConfig/tyToVideo';
import {
  glmQualityConfig,
  glmSizeConfig,
  glmDurationConfig,
  fpsConfig,
} from './modelConfig/glmToVideo';
import { systemPrompt } from './modelConfig/constants';
import { ChatService, VideoService, type GenerateVideoRequest } from '@/services';
import { modelProvider } from '@/constants/model';
defineOptions({
  name: 'VideoPage',
});

// 模型选择
const selectedProvider = ref('ty');
const modelOptions = getModelOptions();
const selectedModel = ref('wan2.5-t2v-preview');

// 质量选择
const qualityOptions = computed(() => {
  if (selectedProvider.value === 'glm') {
    return glmQualityConfig;
  }
  return getQualityOptionsByModel(selectedModel.value);
});
const selectedQuality = ref(1080);

// 分辨率选择
const resolutionOptions = computed(() => {
  if (selectedProvider.value === 'glm') {
    return glmSizeConfig;
  }
  return getResolutionsByModelAndQuality(selectedModel.value, selectedQuality.value);
});
const selectedResolution = ref('1920*1080');

// 时长选择
const durationOptions = computed(() => {
  if (selectedProvider.value === 'glm') {
    return glmDurationConfig;
  }
  return getDurationOptionsByModel(selectedModel.value);
});
const selectedDuration = ref(5);

// fps选择

const selectedFps = ref(30);

const senderValue = ref('');
const coreSenderRef = useTemplateRef('coreSenderRef');
const handleSubmit = (value: string) => {};

const handleAiPrompt = async () => {
  // 一只小猫在桌子上跳来跳去
  const response = await ChatService.sendMessage({
    provider: 'ty',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: senderValue.value },
    ],
  });
  if (response.success) {
    const dataString = response.data.content;
    const data = JSON.parse(dataString);
    coreSenderRef.value?.setSenderValue(data.prompt);
  }
};

const resultVideoUrl = ref('');

// 计算视频显示尺寸
const videoDisplaySize = computed(() => {
  // 解析分辨率字符串，格式如 "1920*1080"
  const parts = selectedResolution.value.split('*').map(Number);
  const width = parts[0] || 1920;
  const height = parts[1] || 1080;

  // 设置最大显示宽度（根据容器宽度）
  const maxWidth = 800;

  // 计算缩放比例
  let displayWidth = width;
  let displayHeight = height;

  if (width > maxWidth) {
    const scale = maxWidth / width;
    displayWidth = maxWidth;
    displayHeight = Math.round(height * scale);
  }

  return {
    width: `${displayWidth}px`,
    height: `${displayHeight}px`,
  };
});

const generateParams = () => {
  if (selectedProvider.value === 'glm') {
    return {
      size: selectedResolution.value.replace('*', 'x'),
      duration: selectedDuration.value,
      audio: true,
      fps: selectedFps.value,
      quality: selectedQuality.value,
      provider: selectedProvider.value,
      model: 'CogVideoX-Flash',
      with_audio: true,
      watermark_enabled: false,
    };
  } else {
    return {
      provider: selectedProvider.value,
      model: selectedModel.value,
      input: {
        prompt: senderValue.value,
      },
      parameters: {
        size: selectedResolution.value,
        duration: selectedDuration.value,
        audio: true,
      },
    };
  }
};

/**
 * @description: 开始生成视频
 * @return {*}
 */
const handleStartGenerate = async () => {
  const params: GenerateVideoRequest = generateParams();
  const response = await VideoService.generateVideo(params);
  if (response.success) {
    resultVideoUrl.value = response.data.videoUrl;
  }
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

.border-left {
  border-left: 1px solid #e0e0e0;
}
</style>
