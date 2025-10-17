<template>
  <div class="flex justify-start items-center">
    <div v-if="title" class="mr-4">{{ title }}</div>
    <a-select style="width: 120px" :value="value" :options="options" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
const { options, title, value } = defineProps<{
  options: {
    label: string;
    value: string;
  }[];
  title?: string;
  value?: string;
}>();

const emits = defineEmits<{
  (e: 'update:value', value: string): void;
}>();

const handleChange = (value: string) => {
  emits('update:value', value);
};
</script>

<style></style>
