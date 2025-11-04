<template>
  <div class="radio-tag-container">
    <div class="radio-tag-title mb-12px flex-start">
      <GradientText :text="title" />
    </div>
    <div class="radio-tag-group">
      <div
        v-for="option in options"
        :key="option.value"
        class="radio-tag-item"
        :class="{ active: modelValue === option.value }"
        @click="handleSelect(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GradientText } from '@/components/animationComponents';
interface Option {
  label: string;
  value: string | number;
}

interface Props {
  options: Option[];
  modelValue: string | number;
  title: string;
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleSelect = (value: string | number) => {
  if (value === props.modelValue) return;
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<style scoped>
.radio-tag-group {
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.radio-tag-item {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid transparent;
  background-color: #f3f4f6;
  color: #6b7280;
  transition: all 0.3s ease;
  user-select: none;
}

.radio-tag-item:hover {
  background-color: #e5e7eb;
}

.radio-tag-item.active {
  background-color: #ede9fe;
  border-color: #a78bfa;
  color: #7c3aed;
}

.radio-tag-item.active:hover {
  background-color: #e9d5ff;
  border-color: #9333ea;
}
</style>
