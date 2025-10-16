<template>
  <div class="w-100% p-4">
    <div class="flex gap-3 items-end">
      <div class="flex-1">
        <a-textarea
          v-model:value="inputPrompt"
          :placeholder="placeholder"
          :auto-size="{ minRows: 3, maxRows: 6 }"
          class="custom-textarea"
          :bordered="false"
          style="background: #f8fafc; border-radius: 12px; padding: 12px 16px;"
        />
      </div>
      <a-button
        :disabled="!inputPrompt || loading"
        type="primary"
        :loading="loading"
        @click="emits('send', inputPrompt)"
        class="send-button"
        style="
          height: 44px;
          padding: 0 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
          border: none;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2);
        "
      >
        <template #icon v-if="!loading">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </template>
        {{ buttonText }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const inputPrompt = ref('');

const {
  loading = false,
  buttonText = '发送',
  placeholder = '请输入您的问题...',
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

<style scoped>
.w-100% {
  width: 100%;
}

.p-4 {
  padding: 16px;
}

.custom-textarea:focus-within {
  background: white !important;
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.1) !important;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3) !important;
}

.send-button:disabled {
  background: #e5e7eb !important;
  box-shadow: none !important;
}
</style>
