<template>
  <div class="h-100vh flex-col-center">
    <div class="w-80% border-1px border-solid border-gray-200 rounded-20px h-80vh p-40px">
      <div class="w-500px">
        <CoreSender class="mb-24px" v-model="senderValue" @submit="handleSubmit">
          <template #prefix>
            <div class="w-180px">
              <Select style="width: 100%" :options="modelOptions" v-model="selectedModel" />
            </div>
          </template>
        </CoreSender>
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
import {
  getModelOptions,
  getQualityOptionsByModel,
  getResolutionsByModelAndQuality,
} from './modelConfig/textToVideo';

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
</script>

<style></style>
