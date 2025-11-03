<template>
  <div class="bg-white rounded-20px p-8 shadow-sm">
    <div class="flex items-center mb-6">
      <CodeIcon class="w-6 h-6 mr-2" />
      <h3 class="text-18px font-bold" style="color: #ff6b9d">输入JSON数据</h3>
    </div>

    <div class="mb-4">
      <textarea
        :value="formattedJsonData"
        @input="handleInput"
        class="w-full box-border h-270px p-4 border-2 border-gray-200 rounded-12px font-mono text-13px resize-none focus:outline-none focus:border-pink-300 transition-colors"
        :class="{ 'border-red-300': jsonError }"
        placeholder='示例: [{"name":"张三","age":25},{"name":"李四","age":30}]'
      ></textarea>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-13px" :class="jsonError ? 'text-red-400' : 'text-gray-400'">
        {{ jsonError || '请输入组格式的JSON数据' }}
      </p>
      <p v-if="!jsonError && jsonData" class="text-13px font-medium" style="color: #ff6b9d">
        已验证
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CodeIcon } from './svg';

interface Props {
  jsonData?: string;
  jsonError?: string;
}

interface Emits {
  (e: 'update:jsonData', data: string): void;
  (e: 'update:jsonError', error: string): void;
}

const { jsonData, jsonError } = defineProps<Props>();

const formattedJsonData = computed(() => {
  if (!jsonData) return '';
  if (jsonError) return jsonError;
  try {
    return JSON.stringify(JSON.parse(jsonData), null, 2);
  } catch (e) {
    return '';
  }
});

const emit = defineEmits<Emits>();

const jsonFileInput = ref<HTMLInputElement | null>(null);

// 处理输入
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  const data = target.value;
  emit('update:jsonData', data);
  validateJson(data);
};

// 验证JSON
const validateJson = (data: string) => {
  if (!data.trim()) {
    emit('update:jsonError', '');
    return;
  }
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      emit('update:jsonError', '请输入数组格式的JSON数据');
    } else if (parsed.length === 0) {
      emit('update:jsonError', '数组不能为空');
    } else {
      emit('update:jsonError', '');
    }
  } catch (e) {
    emit('update:jsonError', 'JSON格式错误');
  }
};
</script>

<style scoped>
/* 自定义滚动条 */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #ffb3c9;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #ff9ebd;
}
</style>
