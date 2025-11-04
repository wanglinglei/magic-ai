<template>
  <Sender
    v-model="senderValue"
    variant="updown"
    clearable
    allow-speech
    :placeholder="placeholder"
    @submit="handleSubmit"
    ref="senderRef"
  >
    <template #header>
      <div>
        <slot name="header"></slot>
      </div>
    </template>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
  </Sender>
</template>

<script setup lang="ts">
import { Sender } from 'vue-element-plus-x';

const { modelValue = '', placeholder = '请输入内容' } = defineProps<{
  modelValue?: string;
  placeholder?: string;
}>();
const senderValue = ref(modelValue);
const slots = useSlots();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit', value: string): void;
}>();
const handleSubmit = (value: string) => {
  emit('submit', value);
};

onMounted(() => {
  if (slots.header) {
    openHeader();
  }
});

const senderRef = useTemplateRef('senderRef');
const closeHeader = () => {
  senderRef.value?.closeHeader();
};
const openHeader = () => {
  senderRef.value?.openHeader();
};
defineExpose({
  closeHeader,
  openHeader,
});
</script>

<style></style>
