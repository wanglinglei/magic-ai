<template>
  <button
    class="common-button flex items-center justify-center gap-8px px-16px py-8px rounded-8px text-14px font-medium transition-all hover:opacity-90"
    :style="{ width }"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot name="icon"></slot>
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
const {
  text = '',
  disabled = false,
  width = 'auto',
} = defineProps<{
  text: string;
  disabled?: boolean;
  width?: string;
  height?: string;
}>();
const emits = defineEmits(['click']);

const handleClick = () => {
  emits('click');
};
</script>

<style lang="less" scoped>
.common-button {
  background-color: #f3e8ff;
  color: #9333ea;
  border: 2px solid #a855f7;
  outline: none;
  cursor: pointer;
}

.common-button:hover {
  background-color: #e9d5ff;
  border-color: #9333ea;
}

.common-button:active {
  background-color: #ddd6fe;
  border-color: #7e22ce;
}
</style>
