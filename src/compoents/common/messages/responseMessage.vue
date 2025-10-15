<template>
  <div class="w-70% flex justify-start items-start">
    <a-avatar class="flex-shrink-0" :size="30" style="background-color: #87d068">
      <template #icon>
        <UserOutlined />
      </template>
    </a-avatar>
    <div class="p-5px text-16px">{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';

const { content } = defineProps<{
  content: string;
}>();
</script>

<style></style>
