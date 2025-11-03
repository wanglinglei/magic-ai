<template>
  <div class="bg-white rounded-20px p-8 shadow-sm">
    <div class="flex items-center mb-6">
      <AttachmentIcon class="w-6 h-6 mr-2" />
      <h3 class="text-18px font-bold" style="color: #ff6b9d">{{ title }}</h3>
    </div>

    <div
      class="upload-area border-3 border-dashed rounded-16px p-12 text-center cursor-pointer transition-all hover:border-pink-400 hover:bg-pink-50"
      :class="{ 'border-pink-400 bg-pink-50': isDragging }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleFileDrop"
      @click="triggerFileUpload"
    >
      <input
        ref="fileInput"
        type="file"
        :accept="acceptString"
        class="hidden"
        @change="handleFileSelect"
      />
      <div class="flex flex-col items-center">
        <CloudUploadIcon class="w-16 h-16 mb-4" />
        <p v-if="!file" class="text-16px font-medium text-gray-600 mb-2">
          {{ placeholder }}
        </p>
        <p v-else class="text-16px font-medium mb-2" style="color: #ff6b9d">
          {{ file.name }}
        </p>
        <p class="text-13px text-gray-400">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { AttachmentIcon, CloudUploadIcon } from './svg';

interface FileTypeConfig {
  /** 文件扩展名列表，例如：['.docx', '.doc'] */
  extensions: string[];
  /** MIME类型列表（可选），例如：['application/pdf'] */
  mimeTypes?: string[];
  /** 显示的文件类型描述，例如：'DOCX' */
  label: string;
}

interface Props {
  /** 当前上传的文件 */
  file?: File | null;
  /** 卡片标题 */
  title?: string;
  /** 上传区域占位提示文本 */
  placeholder?: string;
  /** 文件类型配置 */
  fileTypes?: FileTypeConfig;
  /** 文件大小限制（字节），默认10MB */
  maxSize?: number;
  /** 自定义描述文本 */
  description?: string;
}

interface Emits {
  (e: 'update:file', file: File | null): void;
}

const props = withDefaults(defineProps<Props>(), {
  file: null,
  title: '上传文件',
  placeholder: '拖放文件到此处，或点击上传',
  fileTypes: () => ({
    extensions: ['.docx'],
    mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    label: 'DOCX',
  }),
  maxSize: 10 * 1024 * 1024, // 10MB
  description: '',
});

const emit = defineEmits<Emits>();

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

// 计算 accept 属性值
const acceptString = computed(() => {
  const extensions = props.fileTypes.extensions.join(',');
  const mimeTypes = props.fileTypes.mimeTypes?.join(',') || '';
  return mimeTypes ? `${extensions},${mimeTypes}` : extensions;
});

// 计算描述文本
const description = computed(() => {
  if (props.description) {
    return props.description;
  }
  const sizeInMB = (props.maxSize / (1024 * 1024)).toFixed(0);
  const formats = props.fileTypes.extensions.join('、');
  return `支持 ${formats} 格式，最大 ${sizeInMB}MB`;
});

// 触发文件上传
const triggerFileUpload = () => {
  fileInput.value?.click();
};

// 处理文件选择
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file && validateFile(file)) {
      emit('update:file', file);
      ElMessage.success('文件上传成功');
    }
  }
};

// 处理文件拖放
const handleFileDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (file && validateFile(file)) {
      emit('update:file', file);
      ElMessage.success('文件上传成功');
    }
  }
};

// 处理拖拽进入
const handleDragOver = () => {
  isDragging.value = true;
};

// 处理拖拽离开
const handleDragLeave = () => {
  isDragging.value = false;
};

// 验证文件扩展名
const validateExtension = (fileName: string): boolean => {
  const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return props.fileTypes.extensions.some((ext) => ext.toLowerCase() === extension);
};

// 验证MIME类型
const validateMimeType = (fileType: string): boolean => {
  if (!props.fileTypes.mimeTypes || props.fileTypes.mimeTypes.length === 0) {
    return true; // 如果没有配置MIME类型，则不验证
  }
  return props.fileTypes.mimeTypes.includes(fileType);
};

// 验证文件
const validateFile = (file: File): boolean => {
  // 验证文件扩展名
  if (!validateExtension(file.name)) {
    const formats = props.fileTypes.extensions.join('、');
    ElMessage.error(`请上传 ${formats} 格式的文件`);
    return false;
  }

  // 验证MIME类型
  if (!validateMimeType(file.type)) {
    ElMessage.error(`文件类型不正确，请上传 ${props.fileTypes.label} 文件`);
    return false;
  }

  // 验证文件大小
  if (file.size > props.maxSize) {
    const sizeInMB = (props.maxSize / (1024 * 1024)).toFixed(0);
    ElMessage.error(`文件大小不能超过 ${sizeInMB}MB`);
    return false;
  }

  return true;
};
</script>

<style scoped>
.upload-area {
  border-color: #ffc0cb;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #ff9ebd;
  background-color: #fff5f8;
}
</style>
