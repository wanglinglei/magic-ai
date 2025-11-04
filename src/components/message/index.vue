<template>
  <BubbleList :list="list" :max-height="maxHeight" class="h500px">
    <template #avatar="{ item }">
      <div class="avatar-wrapper">
        <el-icon :size="30">
          <user v-if="item.role === MessageRole.USER" />
          <user-filled v-else />
        </el-icon>
      </div>
    </template>
  </BubbleList>
</template>

<script setup lang="ts">
import { BubbleList } from 'vue-element-plus-x';
import { MessageRole } from '@/constants';
import { User, UserFilled } from '@element-plus/icons';
import type { Message } from '@/services/chat/types';
import type { TMessageRole } from '@/constants';
import type { BubbleListItemProps, BubbleListProps } from 'vue-element-plus-x/types/BubbleList';
const { messages = [] } = defineProps<{
  messages: Message[];
  maxHeight?: string;
}>();

const list = computed<(BubbleListItemProps & { role: TMessageRole })[]>(() => {
  return messages.map((item) => ({
    ...item,
    placement: item.role === MessageRole.USER ? 'end' : 'start',
  }));
});
</script>

<style></style>
