<template>
  <div>
    <div v-if="title" class="select-title mb-12px flex-start">
      <GradientText :text="title" />
    </div>
    <el-select v-model="value" placeholder="Select" style="width: 240px" :disabled="disabled">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { GradientText } from '@/components/animationComponents';
const props = defineProps<{
  options: { label: string; value: string }[];
  modelValue: string;
  title: string;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style></style>
