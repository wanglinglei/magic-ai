<template>
  <div class="w-100% flex justify-start mb-4">
    <div class="w-70% flex justify-start items-start gap-3">
      <a-avatar class="flex-shrink-0" :size="36" style="background-color: #f3f4f6">
        <template #icon>
          <RobotOutlined style="color: #6b7280" />
        </template>
      </a-avatar>
      <div class="max-w-[85%]">
        <div class="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
          <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RobotOutlined } from '@ant-design/icons-vue';

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
