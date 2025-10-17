<template>
  <div>
    <div v-for="item in messages" :key="item.content">
      <UserMessge v-if="item.role === 'user'" :content="item.content" />
      <ResponseMessage :type="item.type" v-if="item.role === 'assistant'" :content="item.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import UserMessge from './userMessge.vue';
import ResponseMessage from './responseMessage.vue';
const {
  messages = [
    {
      role: 'user',
      content: '你好',
      type: 'text',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      role: '"assistant"',
      content: '你好',
      type: 'text',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
  ],
} = defineProps<{
  messages: {
    role: 'user' | 'assistant';
    content: string;
    type: 'text' | 'image' | 'video';
    avatar?: string;
  }[];
}>();
</script>

<style></style>
