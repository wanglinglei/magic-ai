/*
 * @Author: wanglinglei
 * @Date: 2025-11-03 10:47:11
 * @Description: element-plus 消息提示相关方法
 * @FilePath: /magicAI/src/utils/elMessage.ts
 * @LastEditTime: 2025-11-03 10:52:18
 */

import { ElMessage } from 'element-plus';

export class ElMessageUtils {
  static success(message: string) {
    ElMessage.success(message);
  }

  static error(message: string) {
    ElMessage.error(message);
  }

  static warning(message: string) {
    ElMessage.warning(message);
  }

  static info(message: string) {
    ElMessage.info(message);
  }
}

export const elMessageUtils = new ElMessageUtils();
