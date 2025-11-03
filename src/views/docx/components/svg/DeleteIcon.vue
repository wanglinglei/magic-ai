<!--
 * @Author: wanglinglei
 * @Date: 2025-11-03 14:44:02
 * @Description: 删除图标
 * @FilePath: /magicAI/src/views/docx/components/svg/DeleteIcon.vue
 * @LastEditTime: 2025-11-03 14:45:25
-->
<template>
  <svg :class="className" :style="style" fill="currentColor" viewBox="0 0 20 20" v-bind="$attrs">
    <path
      fill-rule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  className?: string;
  style?: string | Record<string, any>;
}

withDefaults(defineProps<Props>(), {
  className: 'w-5 h-5',
  style: 'color: #ff6b9d',
});
</script>
