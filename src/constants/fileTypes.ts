/**
 * 文件类型配置
 */

export interface FileTypeConfig {
  /** 文件扩展名列表 */
  extensions: string[];
  /** MIME类型列表（可选） */
  mimeTypes?: string[];
  /** 显示的文件类型描述 */
  label: string;
}

/**
 * DOCX文件类型配置
 */
export const DOCX_FILE_TYPE: FileTypeConfig = {
  extensions: ['.docx'],
  mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  label: 'DOCX',
};

/**
 * DOC文件类型配置（支持旧版Word）
 */
export const DOC_FILE_TYPE: FileTypeConfig = {
  extensions: ['.doc', '.docx'],
  mimeTypes: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  label: 'Word文档',
};

/**
 * PDF文件类型配置
 */
export const PDF_FILE_TYPE: FileTypeConfig = {
  extensions: ['.pdf'],
  mimeTypes: ['application/pdf'],
  label: 'PDF',
};

/**
 * 图片文件类型配置
 */
export const IMAGE_FILE_TYPE: FileTypeConfig = {
  extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  label: '图片',
};

/**
 * Excel文件类型配置
 */
export const EXCEL_FILE_TYPE: FileTypeConfig = {
  extensions: ['.xlsx', '.xls'],
  mimeTypes: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ],
  label: 'Excel',
};

/**
 * JSON文件类型配置
 */
export const JSON_FILE_TYPE: FileTypeConfig = {
  extensions: ['.json'],
  mimeTypes: ['application/json'],
  label: 'JSON',
};

/**
 * 视频文件类型配置
 */
export const VIDEO_FILE_TYPE: FileTypeConfig = {
  extensions: ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'],
  mimeTypes: ['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/x-ms-wmv'],
  label: '视频',
};

/**
 * 音频文件类型配置
 */
export const AUDIO_FILE_TYPE: FileTypeConfig = {
  extensions: ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
  mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/flac'],
  label: '音频',
};

/**
 * 压缩文件类型配置
 */
export const ZIP_FILE_TYPE: FileTypeConfig = {
  extensions: ['.zip', '.rar', '.7z', '.tar', '.gz'],
  mimeTypes: ['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed'],
  label: '压缩文件',
};

