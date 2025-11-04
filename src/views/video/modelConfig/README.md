# 视频生成配置使用文档

本文档详细说明了视频生成功能的配置常量和工具方法的使用方式。

## 📋 目录

- [配置常量](#配置常量)
- [模型配置](#模型配置)
- [工具方法](#工具方法)
- [使用示例](#使用示例)

---

## 配置常量

### 1. 时长配置 `durationOptions`

视频时长选项配置，单位：秒

```typescript
[
  { label: '5秒', value: 5 },
  { label: '10秒', value: 10 }
]
```

### 2. 质量档位配置 `qualityConfig`

视频质量档位配置

```typescript
[
  { label: '480P', value: 480 },
  { label: '720P', value: 720 },
  { label: '1080P', value: 1080 }
]
```

### 3. 分辨率配置

#### 480P 档位 `resolution480P`
- 832×480 (16:9) - 横屏
- 480×832 (9:16) - 竖屏
- 624×624 (1:1) - 方形

#### 720P 档位 `resolution720P`
- 1280×720 (16:9) - 横屏
- 720×1280 (9:16) - 竖屏
- 960×960 (1:1) - 方形
- 1088×832 (4:3) - 标准横屏
- 832×1088 (3:4) - 标准竖屏

#### 1080P 档位 `resolution1080P`
- 1920×1080 (16:9) - 高清横屏
- 1080×1920 (9:16) - 高清竖屏
- 1440×1440 (1:1) - 高清方形
- 1632×1248 (4:3) - 高清标准横屏
- 1248×1632 (3:4) - 高清标准竖屏

---

## 模型配置

### 支持的模型 `modelConfig`

| 模型名称 | 显示名称 | 默认分辨率 | 支持质量 | 支持时长 | 时长可编辑 |
|---------|---------|-----------|---------|---------|-----------|
| wan2.5-t2v-preview | Wan2.5 T2V Preview | 1920×1080 | 480P, 720P, 1080P | 5秒, 10秒 | ✅ |
| wan2.2-t2v-plus | Wan2.2 T2V Plus | 1920×1080 | 480P, 1080P | 5秒 | ❌ |
| wanx2.1-t2v-turbo | WanX2.1 T2V Turbo | 1280×720 | 480P, 720P | 5秒 | ❌ |
| wanx2.1-t2v-plus | WanX2.1 T2V Plus | 1280×720 | 720P | 5秒 | ❌ |

---

## 工具方法

### 🎬 模型相关方法

#### `getAvailableModels()`
获取所有可用模型的名称列表

```typescript
const models = getAvailableModels();
// ['wan2.5-t2v-preview', 'wan2.2-t2v-plus', 'wanx2.1-t2v-turbo', 'wanx2.1-t2v-plus']
```

#### `getAllModelConfigs()`
获取所有模型的完整配置信息

```typescript
const configs = getAllModelConfigs();
// 返回所有模型的配置对象数组
```

#### `getModelOptions()`
获取格式化的模型选项（用于UI下拉框）

```typescript
const options = getModelOptions();
// [
//   { label: 'Wan2.5 T2V Preview', value: 'wan2.5-t2v-preview', name: 'wan2.5-t2v-preview' },
//   { label: 'Wan2.2 T2V Plus', value: 'wan2.2-t2v-plus', name: 'wan2.2-t2v-plus' },
//   ...
// ]
```

#### `getModelConfig(model: string)`
根据模型名称获取完整配置

```typescript
const config = getModelConfig('wan2.5-t2v-preview');
// {
//   name: 'wan2.5-t2v-preview',
//   displayName: 'Wan2.5 T2V Preview',
//   defaultResolution: '1920×1080',
//   availableQualities: [480, 720, 1080],
//   availableDurations: [5, 10],
//   defaultDuration: 5,
//   durationEditable: true
// }
```

### 📊 质量相关方法

#### `getAvailableQualitiesByModel(model: string)`
获取某个模型支持的质量档位数组

```typescript
const qualities = getAvailableQualitiesByModel('wan2.5-t2v-preview');
// [480, 720, 1080]
```

#### `getQualityOptionsByModel(model: string)`
获取某个模型的质量选项配置（用于UI展示）

```typescript
const options = getQualityOptionsByModel('wan2.5-t2v-preview');
// [
//   { label: '480P', value: 480 },
//   { label: '720P', value: 720 },
//   { label: '1080P', value: 1080 }
// ]
```

### 🎥 分辨率相关方法

#### `getResolutionsByQuality(quality: number)`
根据质量档位获取分辨率选项

```typescript
const resolutions = getResolutionsByQuality(1080);
// 返回 1080P 的所有分辨率选项
```

#### `getResolutionsByModelAndQuality(model: string, quality: number)`
根据模型和质量档位获取可选分辨率

```typescript
const resolutions = getResolutionsByModelAndQuality('wan2.5-t2v-preview', 1080);
// 返回该模型支持的 1080P 分辨率选项
// 如果模型不支持该质量，返回空数组并输出警告
```

#### `getDefaultResolutionByModel(model: string)`
获取某个模型的默认分辨率

```typescript
const resolution = getDefaultResolutionByModel('wan2.5-t2v-preview');
// '1920×1080'
```

#### `getFirstAvailableResolution(model: string, quality: number)`
获取某个模型和质量档位下的第一个可用分辨率

```typescript
const resolution = getFirstAvailableResolution('wan2.5-t2v-preview', 1080);
// { label: '1920×1080 (16:9)', value: '1920×1080', width: 1920, height: 1080, aspectRatio: '16:9' }
```

### ⏱️ 时长相关方法

#### `getAvailableDurationsByModel(model: string)`
获取某个模型支持的时长数组

```typescript
const durations = getAvailableDurationsByModel('wan2.5-t2v-preview');
// [5, 10]
```

#### `getDurationOptionsByModel(model: string)`
获取某个模型的时长选项配置（用于UI展示）

```typescript
const options = getDurationOptionsByModel('wan2.5-t2v-preview');
// [{ label: '5秒', value: 5 }, { label: '10秒', value: 10 }]
```

#### `getDefaultDurationByModel(model: string)`
获取某个模型的默认时长

```typescript
const duration = getDefaultDurationByModel('wan2.5-t2v-preview');
// 5
```

#### `isDurationEditableByModel(model: string)`
判断某个模型的时长是否可编辑

```typescript
const editable = isDurationEditableByModel('wan2.5-t2v-preview');
// true

const editable2 = isDurationEditableByModel('wan2.2-t2v-plus');
// false (该模型时长固定为5秒，不支持修改)
```

---

## 使用示例

### 示例1：构建视频生成表单

```vue
<template>
  <div class="video-generator">
    <!-- 模型选择 -->
    <select v-model="selectedModel" @change="onModelChange">
      <option v-for="option in modelOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <!-- 质量选择 -->
    <select v-model="selectedQuality" @change="onQualityChange">
      <option v-for="option in qualityOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <!-- 分辨率选择 -->
    <select v-model="selectedResolution">
      <option v-for="option in resolutionOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <!-- 时长选择 -->
    <select v-model="selectedDuration" :disabled="!durationEditable">
      <option v-for="option in durationOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  getModelOptions,
  getQualityOptionsByModel,
  getResolutionsByModelAndQuality,
  getDurationOptionsByModel,
  isDurationEditableByModel,
  getAvailableQualitiesByModel,
  getDefaultDurationByModel,
  getFirstAvailableResolution,
} from './cosntants';

// 选中的值
const selectedModel = ref('wan2.5-t2v-preview');
const selectedQuality = ref(1080);
const selectedResolution = ref('1920×1080');
const selectedDuration = ref(5);

// 模型选项
const modelOptions = getModelOptions();

// 质量选项（根据选中的模型动态变化）
const qualityOptions = computed(() => {
  return getQualityOptionsByModel(selectedModel.value);
});

// 分辨率选项（根据选中的模型和质量动态变化）
const resolutionOptions = computed(() => {
  return getResolutionsByModelAndQuality(selectedModel.value, selectedQuality.value);
});

// 时长选项（根据选中的模型动态变化）
const durationOptions = computed(() => {
  return getDurationOptionsByModel(selectedModel.value);
});

// 时长是否可编辑（根据选中的模型动态变化）
const durationEditable = computed(() => {
  return isDurationEditableByModel(selectedModel.value);
});

// 当模型改变时，重置其他选项
const onModelChange = () => {
  // 1. 重置质量为第一个可用质量
  const availableQualities = getAvailableQualitiesByModel(selectedModel.value);
  selectedQuality.value = availableQualities[0];

  // 2. 重置时长为默认时长
  selectedDuration.value = getDefaultDurationByModel(selectedModel.value);

  // 3. 重置分辨率为第一个可用分辨率
  const firstResolution = getFirstAvailableResolution(selectedModel.value, selectedQuality.value);
  if (firstResolution) {
    selectedResolution.value = firstResolution.value;
  }
};

// 当质量改变时，重置分辨率
const onQualityChange = () => {
  const firstResolution = getFirstAvailableResolution(selectedModel.value, selectedQuality.value);
  if (firstResolution) {
    selectedResolution.value = firstResolution.value;
  }
};

// 初始化表单
onModelChange();
</script>
```

### 示例2：验证用户输入

```typescript
import {
  getAvailableModels,
  getAvailableQualitiesByModel,
  getResolutionsByModelAndQuality,
  getAvailableDurationsByModel,
} from './cosntants';

// 验证模型是否有效
function validateModel(model: string): boolean {
  const availableModels = getAvailableModels();
  return availableModels.includes(model);
}

// 验证质量是否被模型支持
function validateQuality(model: string, quality: number): boolean {
  const availableQualities = getAvailableQualitiesByModel(model);
  return availableQualities.includes(quality);
}

// 验证分辨率是否被模型和质量支持
function validateResolution(model: string, quality: number, resolution: string): boolean {
  const availableResolutions = getResolutionsByModelAndQuality(model, quality);
  return availableResolutions.some((r) => r.value === resolution);
}

// 验证时长是否被模型支持
function validateDuration(model: string, duration: number): boolean {
  const availableDurations = getAvailableDurationsByModel(model);
  return availableDurations.includes(duration);
}

// 完整的表单验证
function validateForm(formData: {
  model: string;
  quality: number;
  resolution: string;
  duration: number;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!validateModel(formData.model)) {
    errors.push('无效的模型');
  }

  if (!validateQuality(formData.model, formData.quality)) {
    errors.push('该模型不支持选中的质量档位');
  }

  if (!validateResolution(formData.model, formData.quality, formData.resolution)) {
    errors.push('该模型和质量档位不支持选中的分辨率');
  }

  if (!validateDuration(formData.model, formData.duration)) {
    errors.push('该模型不支持选中的时长');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
```

### 示例3：动态生成表单配置

```typescript
import {
  getAllModelConfigs,
  getQualityOptionsByModel,
  getResolutionsByModelAndQuality,
  getDurationOptionsByModel,
} from './cosntants';

// 生成完整的表单配置
function generateFormConfig() {
  const configs = getAllModelConfigs();

  return configs.map((modelConfig) => {
    const modelName = modelConfig.name;

    return {
      model: {
        name: modelName,
        displayName: modelConfig.displayName,
      },
      qualities: getQualityOptionsByModel(modelName),
      resolutions: modelConfig.availableQualities.map((quality) => ({
        quality,
        options: getResolutionsByModelAndQuality(modelName, quality),
      })),
      durations: getDurationOptionsByModel(modelName),
      durationEditable: modelConfig.durationEditable,
    };
  });
}

// 使用
const formConfigs = generateFormConfig();
console.log(formConfigs);
```

---

## 💡 最佳实践

### 1. 级联选择逻辑

当用户选择模型时，应该自动更新可用的质量、分辨率和时长选项：

```typescript
// 推荐的级联更新顺序
1. 用户选择模型 → 自动选择第一个可用质量
2. 质量改变 → 自动选择第一个可用分辨率
3. 根据模型判断时长是否可编辑 → 禁用/启用时长选择
```

### 2. 错误处理

始终验证用户的选择是否有效：

```typescript
const resolutions = getResolutionsByModelAndQuality(model, quality);
if (resolutions.length === 0) {
  // 该组合不可用，提示用户重新选择
  showError('该模型不支持选中的质量档位，请重新选择');
}
```

### 3. 默认值设置

使用提供的默认值方法来初始化表单：

```typescript
const defaultQuality = getAvailableQualitiesByModel(model)[0];
const defaultDuration = getDefaultDurationByModel(model);
const defaultResolution = getFirstAvailableResolution(model, defaultQuality);
```

---

## ⚠️ 注意事项

1. **费用计算**：`费用 = 单价（基于分辨率）× 时长（秒）`
2. **模型限制**：部分模型的时长固定为5秒且不支持修改
3. **质量档位**：不同模型支持的质量档位不同，需要动态获取
4. **分辨率选项**：分辨率选项取决于质量档位，需要先选择质量再选择分辨率

---

## 🔗 相关文件

- `cosntants.ts` - 配置常量和工具方法
- `index.vue` - 视频生成页面组件

---

## 📝 更新日志

- 2025-11-04: 初始版本，包含所有基础配置和方法

