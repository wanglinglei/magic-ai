<template>
  <div class="left-logo flex justify-start items-center">
    <img class="w-60px h-60px rounded-10px" :src="logoPng" alt="logo" />
    <div class="ml-16px">
      <div class="text-24px font-bold">
        <GradientText :text="APP_INFO.name" />
      </div>
      <div class="text-16px text-gray-500">{{ APP_INFO.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GradientText } from '@/components/animationComponents';
import logoPng from '@/assets/images/logo/logo1.png';

const APP_INFO = {
  name: import.meta.env.VITE_APP_NAME,
  description: import.meta.env.VITE_APP_DESCRIPTION,
};
</script>

<style></style>
