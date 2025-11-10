<template>
  <div class="h-100vh flex justify-start items-center flex-col">
    <Header />
    <div
      class="w-85% border-1px border-solid border-gray-200 rounded-20px h-80vh p-40px flex justify-start"
    >
      <div class="w-500px">
        <CoreSender ref="coreSenderRef" class="mb-24px" v-model="senderValue">
          <template #prefix>
            <CommonButton
              text="AI提示词"
              @click="handleAiPrompt"
              :disabled="senderValue.length === 0"
            >
              <template #icon>
                <MagicIcon />
              </template>
            </CommonButton>
          </template>
        </CoreSender>
        <div class="w-180px mb-16px">
          <Select
            title="供应商"
            style="width: 100%"
            :options="modelProvider"
            v-model="selectedProvider"
            :disabled="true"
          />
        </div>
        <RadioTag title="分辨率" class="mb-16px" :options="sizeConfig" v-model="selectedSize" />
        <RadioTag
          title="生成数量"
          class="mb-16px"
          :options="numberConfig"
          v-model="selectedNumber"
        />

        <CommonButton class="mt-32px" text="开始生成" @click="handleStartGenerate" />
      </div>
      <div class="flex-1 flex-center border-left ml-24px">
        <div
          v-if="imageUrls.length > 0"
          class="image-container"
          :style="{
            display: 'grid',
            gridTemplateColumns: imageUrls.length === 1 ? '1fr' : 'repeat(2, 1fr)',
            gap: '16px',
            width: '100%',
            height: '100%',
            padding: '16px',
          }"
        >
          <div
            v-for="url in imageUrls"
            :key="url"
            class="image-wrapper"
            :style="{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }"
          >
            <img
              :src="url"
              alt="image"
              class="generated-image"
              :style="{
                maxWidth: imageMaxWidth,
                maxHeight: imageMaxHeight,
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CoreSender } from '@/components/sender';
import { RadioTag, Select, CommonButton } from '@/components/userAction';
import { MagicIcon } from '@/assets/svg';
import { Header } from '@/components/page';
import { modelProvider } from '@/constants/model';
import { sizeConfig, numberConfig } from './modelConfig/tyToImage';
import { imageSystemPrompt } from './modelConfig/constants';
import { ChatService, ImageService } from '@/services';
defineOptions({
  name: 'ImagePage',
});

const selectedProvider = ref('ty');
const selectedSize = ref('1024*1024');
const selectedNumber = ref(1);

const senderValue = ref('');
const coreSenderRef = useTemplateRef('coreSenderRef');

const handleAiPrompt = async () => {
  // 一只小猫在桌子上跳来跳去
  const response = await ChatService.sendMessage({
    provider: 'ty',
    messages: [
      { role: 'system', content: imageSystemPrompt },
      { role: 'user', content: senderValue.value },
    ],
  });
  if (response.success) {
    const dataString = response.data.content;
    const data = JSON.parse(dataString);
    coreSenderRef.value?.setSenderValue(data.prompt);
  }
};
const imageUrls = ref<string[]>([]);
const handleStartGenerate = async () => {
  const response = await ImageService.createImage({
    prompt: senderValue.value,
    size: selectedSize.value,
    n: selectedNumber.value,
    provider: selectedProvider.value,
  });
  if (response.success) {
    imageUrls.value = response.data.imageUrls.map((item: { url: string }) => item.url);
  }
};

// 计算图片的最大宽度和高度
const imageMaxWidth = computed(() => {
  if (imageUrls.value.length === 1) {
    return '800px'; // 单张图片
  } else {
    return '100%'; // 多张图片，让其填满网格单元
  }
});

const imageMaxHeight = computed(() => {
  if (imageUrls.value.length <= 2) {
    return 'calc(80vh - 120px)'; // 1-2张图片
  } else {
    return 'calc((80vh - 136px) / 2)'; // 3-4张图片，高度分成两行，减去 padding 和 gap
  }
});
</script>

<style scoped>
.border-left {
  border-left: 1px solid #e0e0e0;
}
</style>
