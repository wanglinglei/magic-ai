<template>
  <div class="w-100% flex justify-end">
    <div class="w-70% flex justify-end items-start">
      <div class="p-5px text-16px">{{ content }}</div>
      <a-avatar :size="30" style="background-color: #87d068">
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

<style></style>
