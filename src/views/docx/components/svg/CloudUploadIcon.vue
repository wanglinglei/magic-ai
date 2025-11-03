<template>
  <svg :class="className" :style="style" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.413V13H5.5z"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  className?: string;
  style?: string | Record<string, any>;
}

withDefaults(defineProps<Props>(), {
  className: 'w-16 h-16',
  style: 'color: #ff9ebd',
});
</script>

