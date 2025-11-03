/*
 * @Author: wanglinglei
 * @Date: 2025-11-03 09:56:24
 * @Description: 文件处理相关方法
 * @FilePath: /magicAI/src/utils/docx.ts
 * @LastEditTime: 2025-11-03 11:17:12
 */
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { elMessageUtils } from '@/utils';
/**
 * @description: 解析DOCX模板文件，从中提取可替换的变量
 * @param {File} file - DOCX模板文件
 * @return {Promise<string[]>} 返回提取到的变量名数组
 */
export function parseDocxTemplateToJson(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      elMessageUtils.error('文件读取失败');
      reject(new Error('文件读取失败'));
    };

    reader.onload = (event) => {
      try {
        // 1. 获取文件的二进制内容
        const content = event.target?.result as ArrayBuffer;
        if (!content) {
          elMessageUtils.error('文件内容为空');
          reject(new Error('文件内容为空'));
          return;
        }

        // 2. 使用 PizZip 解压 DOCX 文件（DOCX 是 ZIP 格式）
        const zip = new PizZip(content);

        // 3. 使用 docxtemplater 解析模板
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        // 4. 获取所有标签（变量）
        const tags = doc.getFullText();
        console.log('文档完整内容：', tags);

        // 5. 使用正则表达式提取 {xxx} 格式的变量
        // 支持中文、英文、数字、下划线、点号等字符
        const regex = /\{([^{}]+)\}/g;
        const matches = tags.match(regex);

        if (!matches || matches.length === 0) {
          elMessageUtils.error('未找到可替换变量');
          resolve('[]');
          return;
        }

        // console.log('matches', matches);
        let jsonData: Record<string, any>[] = [];
        matches.forEach((match) => {
          let key = match.replace(/[{}]/g, '').trim();
          jsonData.push({
            [key]: '',
          });
        });

        resolve(JSON.stringify(jsonData));
      } catch (error) {
        console.error('解析DOCX文件失败：', error);
        reject(error);
      }
    };

    // 读取文件为 ArrayBuffer（二进制数据）
    reader.readAsArrayBuffer(file);
  });
}

/**
 * @description: 使用数据替换DOCX模板中的变量
 * @param {File} templateFile - DOCX模板文件
 * @param {Record<string, any>} data - 替换数据
 * @return {Promise<Blob>} 返回生成的DOCX文件Blob
 */
export function replaceDocxTemplate(templateFile: File, data: Record<string, any>): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };

    reader.onload = (event) => {
      try {
        const content = event.target?.result as ArrayBuffer;
        if (!content) {
          reject(new Error('文件内容为空'));
          return;
        }

        // 解压 DOCX 文件
        const zip = new PizZip(content);

        // 创建 docxtemplater 实例
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        // 替换模板变量
        doc.render(data);

        // 生成新的 DOCX 文件
        const output = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        resolve(output);
      } catch (error) {
        console.error('替换DOCX模板失败：', error);
        reject(error);
      }
    };

    reader.readAsArrayBuffer(templateFile);
  });
}

/**
 * @description: 批量生成DOCX文档（每条数据生成一个文档）
 * @param {File} templateFile - DOCX模板文件
 * @param {Array<Record<string, any>>} dataList - 数据列表
 * @return {Promise<Blob[]>} 返回生成的DOCX文件Blob数组
 */
export async function batchGenerateDocx(
  templateFile: File,
  dataList: Array<Record<string, any>>,
): Promise<Blob[]> {
  const results: Blob[] = [];

  for (const data of dataList) {
    try {
      const blob = await replaceDocxTemplate(templateFile, data);
      results.push(blob);
    } catch (error) {
      console.error('生成文档失败：', error);
      throw error;
    }
  }

  return results;
}
