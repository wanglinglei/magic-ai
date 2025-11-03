<template>
  <PageContainer>
    <div
      class="min-h-[calc(100vh-200px)] py-12"
      style="background: linear-gradient(135deg, #fef5f9 0%, #fff0f8 50%, #fef5f9 100%)"
    >
      <div class="w-80% mx-auto">
        <!-- 使用说明 -->
        <div class="mb-8 bg-white rounded-20px p-8 shadow-sm">
          <h2 class="text-20px font-bold mb-4" style="color: #ff6b9d">使用说明</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">
            上传您的DOCX模板文件和JSON数据，系统将根据模板和数据生成新的文档。支持两种生成模式：
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>
              <span class="font-medium">单个文档：</span>所有数据合并到一个文档中，每条数据生成一页
            </li>
            <li><span class="font-medium">多个文档：</span>为每条数据生成一个独立的文档</li>
          </ul>
        </div>

        <!-- 模板文件和JSON数据输入 -->
        <div class="grid grid-cols-2 gap-6 mb-8">
          <UploadCard
            v-model:file="templateFile"
            title="上传模板文件"
            placeholder="拖放DOCX文件到此处，或点击上传"
            :file-types="DOCX_FILE_TYPE"
            :max-size="10 * 1024 * 1024"
          />
          <JsonDataCard
            v-model:json-data="templateJsonData"
            v-model:json-error="templateJsonError"
            :disabled="true"
          />
        </div>

        <!-- 模板文件和JSON数据输入 -->
        <div class="grid grid-cols-2 gap-6 mb-8">
          <UploadCard
            v-model:file="contentFile"
            title="上传内容文件"
            placeholder="拖放DOCX文件到此处，或点击上传"
            :file-types="DOCX_FILE_TYPE"
            :max-size="10 * 1024 * 1024"
          />
          <JsonDataCard v-model:json-data="contentJsonData" v-model:json-error="contentJsonError" />
        </div>

        <!-- 输出文件名设置 -->
        <div class="bg-white rounded-20px p-8 shadow-sm mb-8">
          <div class="flex items-center mb-6">
            <DocumentsIcon class="w-6 h-6 mr-2" />
            <h3 class="text-18px font-bold" style="color: #ff6b9d">输出文件名设置</h3>
          </div>

          <div class="mb-4">
            <label class="block text-14px text-gray-700 mb-3"> 输出文件名（不包含扩展名） </label>
            <input
              v-model="outputFileName"
              type="text"
              class="w-full box-border px-5 py-4 border-2 border-solid border-pink-200 rounded-12px text-15px focus:outline-none focus:border-pink-400 transition-colors"
              placeholder="生成的文档"
            />
          </div>
          <p class="text-14px text-gray-500">单个文档：文件名.docx</p>
          <p class="text-14px text-gray-500">多个文档：文件名.zip</p>
          <ul class="list-disc list-inside space-y-2 text-gray-500 text-12px">
            <li>文件名-姓名.docx</li>
            <li>文件名-姓名.docx</li>
          </ul>
        </div>

        <!-- 生成按钮 -->
        <div class="flex justify-center gap-6">
          <button
            @click="generateSingleDocument"
            :disabled="!canGenerate"
            class="px-12 py-5 rounded-full text-16px font-bold shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style="background: linear-gradient(135deg, #ff9ebd 0%, #ff6b9d 100%); color: white"
          >
            <div class="flex items-center">
              <DocumentIcon class="w-5 h-5 mr-2" style="color: white" />
              生成单个文档
            </div>
          </button>

          <button
            @click="generateMultipleDocuments"
            :disabled="!canGenerate"
            class="px-12 py-5 rounded-full text-16px font-bold shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style="background: linear-gradient(135deg, #ffa8c8 0%, #ff7fab 100%); color: white"
          >
            <div class="flex items-center">
              <DocumentsIcon class="w-5 h-5 mr-2" style="color: white" />
              生成多个文档
            </div>
          </button>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { PageContainer } from '@/components/page';
import { ElMessage } from 'element-plus';
import UploadCard from './components/uoloadCard.vue';
import JsonDataCard from './components/jsonDataCard.vue';
import { DocumentIcon, DocumentsIcon } from './components/svg';
import { DOCX_FILE_TYPE } from '@/constants';
import { parseDocxTemplateToJson } from '@/utils/docx';
import { DocxService } from '@/services/docx';

// 文件上传相关
const templateFile = ref<File | null>(null);

// JSON数据相关
const templateJsonData = ref('');
const templateJsonError = ref('');

watch(
  () => templateFile.value,
  (newVal) => {
    if (newVal) {
      parseDocxTemplateToJson(newVal)
        .then((data) => {
          templateJsonData.value = data;
        })
        .catch((e) => {
          templateJsonError.value = e;
        });
    }
  },
);

const contentFile = ref<File | null>(null);

const contentJsonData = ref('');
const contentJsonError = ref('');

watch(
  () => contentFile.value,
  (newVal) => {
    if (newVal) {
      processContentFile();
    }
  },
);

/**
 * @description: 处理内容文件
 * @return {*}
 */
const processContentFile = async () => {
  if (!contentFile.value) {
    console.error('contentFile 为空');
    return;
  }

  console.log('准备上传的文件信息：', {
    name: contentFile.value.name,
    size: contentFile.value.size,
    type: contentFile.value.type,
  });
  console.log('模板JSON数据：', templateJsonData.value);

  const formData = new FormData();
  // 添加文件，第三个参数指定文件名
  formData.append('rawDocument', contentFile.value, contentFile.value.name);
  formData.append('templateJson', templateJsonData.value);

  // 调试：打印 FormData 内容
  console.log('FormData 内容：');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await DocxService.processContentData(formData);
    if (response.success) {
      const data = response.data || [];
      contentJsonData.value = JSON.stringify(data);
    }
  } catch (error) {
    console.error('处理文件失败：', error);
    throw error;
  }
};

// 输出文件名
const outputFileName = ref('生成的文档');

// 检查是否可以生成
const canGenerate = computed(() => {
  return templateFile.value && templateJsonData.value.trim() && !templateJsonError.value;
});

// 生成单个文档
const generateSingleDocument = async () => {
  if (!canGenerate.value) return;

  try {
    ElMessage.info('正在生成单个文档...');
    // TODO: 实现实际的文档生成逻辑
    // 调用后端API，传递模板文件和JSON数据
    await new Promise((resolve) => setTimeout(resolve, 1500)); // 模拟异步操作
    ElMessage.success('文档生成成功！');
  } catch (error) {
    ElMessage.error('文档生成失败，请重试');
    console.error(error);
  }
};

// 生成多个文档
const generateMultipleDocuments = async () => {
  if (!canGenerate.value) return;

  try {
    ElMessage.info('正在生成多个文档...');
    // TODO: 实现实际的文档生成逻辑
    // 调用后端API，传递模板文件和JSON数据
    await new Promise((resolve) => setTimeout(resolve, 1500)); // 模拟异步操作
    ElMessage.success('文档生成成功！');
  } catch (error) {
    ElMessage.error('文档生成失败，请重试');
    console.error(error);
  }
};
</script>

<style scoped></style>
