<template>
  <div class="w-100% flex justify-end mb-4">
    <div class="w-70% flex justify-end items-start gap-3">
      <div class="max-w-[85%]">
        <div class="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
          <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ content }}</p>
        </div>
      </div>
      <a-avatar :size="36" style="background-color: #8b5cf6" class="flex-shrink-0">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';

const { content } = defineProps<{
  content: string;
}>();
</script>

<style scoped>
.w-100% {
  width: 100%;
}

.w-70% {
  width: 70%;
}

.mb-4 {
  margin-bottom: 16px;
}

.max-w-\[85\%\] {
  max-width: 85%;
}
</style>
