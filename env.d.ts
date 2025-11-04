/// <reference types="vite/client" />

// 为 docx-templates 库添加 Buffer 类型声明
import { Buffer } from 'buffer';

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}
