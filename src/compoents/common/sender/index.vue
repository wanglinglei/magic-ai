<template>
  <div class="w-100% p-16px flex justify-between items-end">
    <a-textarea
      v-model:value="inputPrompt"
      :placeholder="placeholder"
      :auto-size="{ minRows: 3 }"
    />
    <a-button
      class="ml-16px"
      :disabled="!inputPrompt"
      type="primary"
      :loading="loading"
      @click="emits('send', inputPrompt)"
      >{{ buttonText }}</a-button
    >
  </div>
</template>

<script setup lang="ts">
const inputPrompt = ref('');

const {
  loading = false,
  buttonText = '发送',
  placeholder = '请输入提示词...',
} = defineProps<{
  loading: boolean;
  buttonText?: string;
  placeholder?: string;
}>();

const emits = defineEmits<{
  (e: 'send', value: string): void;
}>();

const clearInput = () => {
  inputPrompt.value = '';
};

defineExpose({
  clearInput,
});
</script>

<style></style>
