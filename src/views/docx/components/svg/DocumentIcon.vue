<template>
  <svg :class="className" :style="style" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"
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

