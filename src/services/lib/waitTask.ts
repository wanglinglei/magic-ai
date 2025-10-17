interface WaitTaskParams {
  taskId: string; // 任务ID
  maxAttempts?: number; // 最大尝试次数
  delay?: number; // 延迟时间
  sign: 'glm' | 'ty'; // 签名
  checkTaskCompleted: (result: any) => boolean; // 检查任务是否完成
  checkTaskFailed?: (result: any) => boolean; // 检查任务是否失败
}

const requestMap = {
  glm: {
    url: `${import.meta.env.VITE_GLM_API_URL}/api/paas/v4/async-result`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GLM_API_KEY}`,
    },
  },
  ty: {
    url: `${import.meta.env.VITE_TY_API_URL}/api/v1/tasks/`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TY_API_KEY}`,
    },
  },
};

export const waitTask = async (params: WaitTaskParams) => {
  const {
    taskId,
    maxAttempts = 60,
    delay = 5000,
    sign,
    checkTaskCompleted,
    checkTaskFailed,
  } = params;
  const { url, headers } = requestMap[sign];
  const requestUrl = url + taskId;
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      throw new Error(`Failed to get task status: ${response.status}`);
    }
    const result = await response.json();
    console.log('result', result);
    if (checkTaskCompleted(result)) {
      return result;
    } else if (checkTaskFailed && checkTaskFailed(result)) {
      throw new Error(`Task failed: ${result.message || 'Unknown error'}`);
    }

    // 等待后继续轮询
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error(`Task timeout: exceeded maximum attempts ${maxAttempts}`);
};
