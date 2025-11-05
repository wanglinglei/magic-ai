// 视频时长配置（单位：秒）
export const durationOptions = [
  {
    label: '5秒',
    value: 5,
  },
  {
    label: '10秒',
    value: 10,
  },
];

// 视频质量档位配置
export const qualityConfig = [
  {
    label: '480P',
    value: 480,
  },
  {
    label: '720P',
    value: 720,
  },
  {
    label: '1080P',
    value: 1080,
  },
];

// 模型配置（包含分辨率、质量档位、时长等配置）
export const modelConfig = {
  'wan2.5-t2v-preview': {
    name: 'wan2.5-t2v-preview',
    displayName: 'Wan2.5 T2V Preview',
    defaultResolution: '1920*1080',
    availableQualities: [480, 720, 1080],
    availableDurations: [5, 10],
    defaultDuration: 5,
    durationEditable: true, // 支持修改时长
  },
  'wan2.2-t2v-plus': {
    name: 'wan2.2-t2v-plus',
    displayName: 'Wan2.2 T2V Plus',
    defaultResolution: '1920*1080',
    availableQualities: [480, 1080],
    availableDurations: [5],
    defaultDuration: 5,
    durationEditable: false, // 固定5秒，不支持修改
  },
  'wanx2.1-t2v-turbo': {
    name: 'wanx2.1-t2v-turbo',
    displayName: 'WanX2.1 T2V Turbo',
    defaultResolution: '1280*720',
    availableQualities: [480, 720],
    availableDurations: [5],
    defaultDuration: 5,
    durationEditable: false, // 固定5秒，不支持修改
  },
  'wanx2.1-t2v-plus': {
    name: 'wanx2.1-t2v-plus',
    displayName: 'WanX2.1 T2V Plus',
    defaultResolution: '1280*720',
    availableQualities: [720],
    availableDurations: [5],
    defaultDuration: 5,
    durationEditable: false, // 固定5秒，不支持修改
  },
};

// 480P档位分辨率配置
export const resolution480P = [
  {
    label: '832*480 (16:9)',
    value: '832*480',
    width: 832,
    height: 480,
    aspectRatio: '16:9',
  },
  {
    label: '480*832 (9:16)',
    value: '480*832',
    width: 480,
    height: 832,
    aspectRatio: '9:16',
  },
  {
    label: '624*624 (1:1)',
    value: '624*624',
    width: 624,
    height: 624,
    aspectRatio: '1:1',
  },
];

// 720P档位分辨率配置
export const resolution720P = [
  {
    label: '1280*720 (16:9)',
    value: '1280*720',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
  },
  {
    label: '720*1280 (9:16)',
    value: '720*1280',
    width: 720,
    height: 1280,
    aspectRatio: '9:16',
  },
  {
    label: '960*960 (1:1)',
    value: '960*960',
    width: 960,
    height: 960,
    aspectRatio: '1:1',
  },
  {
    label: '1088*832 (4:3)',
    value: '1088*832',
    width: 1088,
    height: 832,
    aspectRatio: '4:3',
  },
  {
    label: '832*1088 (3:4)',
    value: '832*1088',
    width: 832,
    height: 1088,
    aspectRatio: '3:4',
  },
];

// 1080P档位分辨率配置
export const resolution1080P = [
  {
    label: '1920*1080 (16:9)',
    value: '1920*1080',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
  },
  {
    label: '1080*1920 (9:16)',
    value: '1080*1920',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
  },
  {
    label: '1440*1440 (1:1)',
    value: '1440*1440',
    width: 1440,
    height: 1440,
    aspectRatio: '1:1',
  },
  {
    label: '1632*1248 (4:3)',
    value: '1632*1248',
    width: 1632,
    height: 1248,
    aspectRatio: '4:3',
  },
  {
    label: '1248*1632 (3:4)',
    value: '1248*1632',
    width: 1248,
    height: 1632,
    aspectRatio: '3:4',
  },
];

// 根据质量档位获取分辨率配置
export const getResolutionsByQuality = (quality: number) => {
  switch (quality) {
    case 480:
      return resolution480P;
    case 720:
      return resolution720P;
    case 1080:
      return resolution1080P;
    default:
      return resolution1080P;
  }
};

// 根据模型获取可用的质量档位
export const getAvailableQualitiesByModel = (model: string) => {
  return modelConfig[model as keyof typeof modelConfig]?.availableQualities || [1080];
};

// 根据模型获取可用的时长选项
export const getAvailableDurationsByModel = (model: string) => {
  const config = modelConfig[model as keyof typeof modelConfig];
  if (!config) return [5];

  return config.availableDurations;
};

// 根据模型获取默认时长
export const getDefaultDurationByModel = (model: string) => {
  return modelConfig[model as keyof typeof modelConfig]?.defaultDuration || 5;
};

// 判断某个模型的时长是否可编辑
export const isDurationEditableByModel = (model: string) => {
  return modelConfig[model as keyof typeof modelConfig]?.durationEditable || false;
};

// 根据模型获取时长选项配置（用于UI展示）
export const getDurationOptionsByModel = (model: string) => {
  const availableDurations = getAvailableDurationsByModel(model);
  return durationOptions.filter((option) => availableDurations.includes(option.value));
};

// 根据模型获取质量选项配置（用于UI展示）
export const getQualityOptionsByModel = (model: string) => {
  const availableQualities = getAvailableQualitiesByModel(model);
  return qualityConfig.filter((option) => availableQualities.includes(option.value));
};

// 根据模型和视频质量获取可选分辨率
export const getResolutionsByModelAndQuality = (model: string, quality: number) => {
  // 1. 检查该模型是否支持该质量档位
  const availableQualities = getAvailableQualitiesByModel(model);
  if (!availableQualities.includes(quality)) {
    console.warn(`模型 ${model} 不支持质量档位 ${quality}P`);
    // 返回空数组或者默认质量的分辨率
    return [];
  }

  // 2. 根据质量档位返回对应的分辨率选项
  return getResolutionsByQuality(quality);
};

// 根据模型获取默认分辨率
export const getDefaultResolutionByModel = (model: string) => {
  return modelConfig[model as keyof typeof modelConfig]?.defaultResolution || '1920*1080';
};

// 根据模型和质量获取第一个可用分辨率（用于默认值）
export const getFirstAvailableResolution = (model: string, quality: number) => {
  const resolutions = getResolutionsByModelAndQuality(model, quality);
  return resolutions.length > 0 ? resolutions[0] : null;
};

// 获取所有可用模型的名称列表
export const getAvailableModels = () => {
  return Object.keys(modelConfig);
};

// 获取所有可用模型的配置信息
export const getAllModelConfigs = () => {
  return Object.values(modelConfig);
};

// 获取所有可用模型的选项配置（用于UI展示）
export const getModelOptions = () => {
  return Object.entries(modelConfig).map(([key, config]) => ({
    label: config.displayName,
    value: key,
    name: config.name,
  }));
};

// 根据模型名称获取完整配置
export const getModelConfig = (model: string) => {
  return modelConfig[model as keyof typeof modelConfig] || null;
};
