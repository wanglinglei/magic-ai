<template>
  <div>
    <Sender ref="senderRef" :loading="loading" @send="handleSend" />
  </div>
</template>

<script setup lang="ts">
import { Sender } from '@/compoents/common';
import { videoGenerator } from '@/services';
const loading = ref(false);
const senderRef = ref<InstanceType<typeof Sender>>();

const handleSend = async (value: string) => {
  loading.value = true;
  const res = await videoGenerator({
    prompt: value,
  });
  senderRef.value?.clearInput();
  loading.value = false;
  if (res) {
    console.log('res', res);
  }
};
</script>

<style></style>
