<!--
 * @Author: wanglinglei
 * @Date: 2025-11-03 09:49:00
 * @Description: 代码图标
 * @FilePath: /magicAI/src/views/docx/components/svg/CodeIcon.vue
 * @LastEditTime: 2025-11-03 14:45:57
-->
<template>
  <svg :class="className" :style="style" fill="currentColor" viewBox="0 0 20 20">
    <path
      fill-rule="evenodd"
      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
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
  className: 'w-6 h-6',
  style: 'color: #ff6b9d',
});
</script>
