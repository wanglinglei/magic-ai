/*
 * @Author: wanglinglei
 * @Date: 2025-11-03 10:47:11
 * @Description: element-plus 消息提示相关方法
 * @FilePath: /magicAI/src/utils/elMessage.ts
 * @LastEditTime: 2025-11-03 16:10:20
 */

import { ElMessage } from 'element-plus';

export class ElMessageUtils {
  success(message: string) {
    ElMessage.success(message);
  }

  error(message: string) {
    ElMessage.error(message);
  }

  warning(message: string) {
    ElMessage.warning(message);
  }

  info(message: string) {
    ElMessage.info(message);
  }
}

export const elMessageUtils = new ElMessageUtils();
