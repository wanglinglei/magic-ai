/*
 * @Author: wanglinglei
 * @Date: 2025-11-03 09:56:24
 * @Description: 文件处理相关方法
 * @FilePath: /magicAI/src/views/docx/docx.ts
 * @LastEditTime: 2025-11-05 15:08:47
 */
import createReport from 'docx-templates';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { elMessageUtils } from '@/utils';

/**
 * @description: 读取文件内容为 ArrayBuffer
 * @param {File} file - 要读取的文件
 * @return {Promise<ArrayBuffer>} 返回文件的二进制内容
 */
export async function getFileContent(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event) => {
      const result = event.target?.result as ArrayBuffer;
      if (!result) {
        reject(new Error('文件内容为空'));
        return;
      }
      resolve(result);
    };
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
  });
}

/**
 * @description: 解析DOCX模板文件，从中提取可替换的变量
 * @param {File} file - DOCX模板文件
 * @return {Promise<string>} 返回包含变量的JSON字符串
 */
export async function parseDocxTemplateToJson(file: File): Promise<string> {
  try {
    const content = await getFileContent(file);
    const zip = await JSZip.loadAsync(content);
    const documentXml = await zip.file('word/document.xml')?.async('text');

    if (!documentXml) {
      elMessageUtils.error('无法读取文档内容');
      throw new Error('无法读取文档内容');
    }

    const textContent = documentXml
      .replace(/<[^>]+>/g, ' ') // 移除所有 XML 标签
      .replace(/\s+/g, ' ') // 合并多个空格
      .trim();

    // 使用正则表达式提取 {xxx} 格式的变量
    // 支持中文、英文、数字、下划线、点号等字符
    const regex = /\{([^{}]+)\}/g;
    const matches = textContent.match(regex);

    if (!matches || matches.length === 0) {
      elMessageUtils.error('未找到可替换变量');
      return '';
    }

    const jsonData: Record<string, any> = {};
    matches.forEach((match) => {
      const key = match.replace(/[{}]/g, '').trim();
      jsonData[key] = '';
    });

    return JSON.stringify(jsonData);
  } catch (error) {
    console.error('解析DOCX文件失败：', error);
    elMessageUtils.error('文件读取失败');
    throw new Error('文件读取失败');
  }
}

/**
 * @description: 合并两个 DOCX 文档
 * @param {Uint8Array} doc1 - 第一个文档的二进制数据
 * @param {Uint8Array} doc2 - 第二个文档的二进制数据
 * @return {Promise<Uint8Array>} 返回合并后的文档
 */
export async function mergeDocuments(doc1: Uint8Array, doc2: Uint8Array): Promise<Uint8Array> {
  try {
    // 加载两个文档
    const zip1 = await JSZip.loadAsync(doc1);
    const zip2 = await JSZip.loadAsync(doc2);

    // 获取两个文档的 document.xml
    const doc1Xml = await zip1.file('word/document.xml')?.async('text');
    const doc2Xml = await zip2.file('word/document.xml')?.async('text');

    if (!doc1Xml || !doc2Xml) {
      throw new Error('无法读取文档内容');
    }

    // 提取第二个文档的 body 内容（去掉根标签）
    const doc2BodyMatch = doc2Xml.match(/<w:body[^>]*>(.*?)<\/w:body>/s);
    if (!doc2BodyMatch) {
      throw new Error('无法解析第二个文档的 body 内容');
    }

    const doc2Body = doc2BodyMatch[1];

    // 将第二个文档的内容插入到第一个文档的 body 中
    const mergedXml = doc1Xml.replace(/(<w:body[^>]*>)(.*?)(<\/w:body>)/s, `$1$2${doc2Body}$3`);

    // 更新第一个文档的 document.xml
    zip1.file('word/document.xml', mergedXml);

    // 复制第二个文档中的其他资源（图片、样式等）
    const entries = Object.entries(zip2.files);
    for (const [filePath, file] of entries) {
      if (filePath.startsWith('word/') && !filePath.includes('document.xml')) {
        const content = await file.async('uint8array');
        zip1.file(filePath, content);
      }
    }

    // 生成合并后的文档
    const result = await zip1.generateAsync({ type: 'uint8array' });
    return result;
  } catch (error) {
    console.error('合并文档时出错：', error);
    throw error;
  }
}

/**
 * @description: 生成单个合并文档（为每条数据生成一页，合并到一个文档中）
 * @param {Array<Record<string, any>>} jsonData - 数据数组
 * @param {File} templateFile - 模板文件
 * @param {string} outputFileName - 输出文件名（不含扩展名）
 * @return {Promise<void>} 生成完成后自动下载
 */
export async function generateSingleDocument(
  jsonData: Array<Record<string, any>>,
  templateFile: File,
  outputFileName: string = '生成的文档',
): Promise<void> {
  try {
    if (!jsonData || jsonData.length === 0) {
      elMessageUtils.error('没有数据需要处理');
      throw new Error('没有数据需要处理');
    }

    // 为每条数据生成单独的页面
    const pageBuffers: Uint8Array[] = [];
    const templateContent = await getFileContent(templateFile);

    for (let i = 0; i < jsonData.length; i++) {
      const data = jsonData[i];

      // 使用 docx-templates 生成单页文档
      const report = await createReport({
        template: new Uint8Array(templateContent),
        data: data,
        cmdDelimiter: ['{', '}'], // 明确指定模板分隔符
        noSandbox: true, // 在浏览器环境中使用 Function 而不是 vm.Script
      });

      pageBuffers.push(report);
    }

    // 合并所有页面
    if (pageBuffers.length > 0) {
      // 使用第一个页面作为基础
      const firstBuffer = pageBuffers[0];
      if (!firstBuffer) {
        throw new Error('第一页文档生成失败');
      }
      let finalBuffer: Uint8Array = firstBuffer;

      // 合并其他页面
      for (let i = 1; i < pageBuffers.length; i++) {
        const nextBuffer = pageBuffers[i];
        if (nextBuffer) {
          finalBuffer = await mergeDocuments(finalBuffer, nextBuffer);
        }
      }

      // 下载合并后的文档
      const blob = new Blob([finalBuffer as BlobPart], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(blob, `${outputFileName}.docx`);
      elMessageUtils.success('单个文档生成成功');
    }
  } catch (error) {
    console.error('生成单个文档失败:', error);
    elMessageUtils.error(`生成失败: ${error instanceof Error ? error.message : '未知错误'}`);
    throw error;
  }
}

/**
 * @description: 生成多个独立文档（为每条数据生成一个独立的文档）
 * @param {Array<Record<string, any>>} jsonData - 数据数组
 * @param {File} templateFile - 模板文件
 * @param {string} outputFileName - 输出文件名前缀（不含扩展名）
 * @return {Promise<void>} 生成完成后自动下载（单个文档直接下载，多个文档打包成ZIP）
 */
export async function generateMultipleDocuments(
  jsonData: Array<Record<string, any>>,
  templateFile: File,
  outputFileName: string = '生成的文档',
): Promise<void> {
  try {
    if (!jsonData || jsonData.length === 0) {
      elMessageUtils.error('没有数据需要处理');
      throw new Error('没有数据需要处理');
    }

    const templateContent = await getFileContent(templateFile);

    // 如果只有一条数据，直接下载单个文档
    if (jsonData.length === 1) {
      const firstData = jsonData[0];
      if (!firstData) {
        throw new Error('数据为空');
      }

      const generatedDoc = await createReport({
        template: new Uint8Array(templateContent),
        data: firstData,
        cmdDelimiter: ['{', '}'],
        noSandbox: true, // 在浏览器环境中使用 Function 而不是 vm.Script
      });

      // 如果数据中包含 name 字段，拼接到文件名中
      let fileName = outputFileName;
      const dataName = firstData.name || firstData['姓名'] || '';
      if (dataName) {
        fileName = `${fileName}-${dataName}`;
      }

      const blob = new Blob([generatedDoc as BlobPart], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(blob, `${fileName}.docx`);
      elMessageUtils.success('文档生成成功');
      return;
    }

    // 多个文档，打包成 ZIP
    const zip = new JSZip();

    // 逐个生成文档并添加到 ZIP
    for (let i = 0; i < jsonData.length; i++) {
      const currentData = jsonData[i];
      if (!currentData) {
        continue;
      }

      const generatedDoc = await createReport({
        template: new Uint8Array(templateContent),
        data: currentData,
        cmdDelimiter: ['{', '}'],
        noSandbox: true, // 在浏览器环境中使用 Function 而不是 vm.Script
      });

      // 使用数据中的 name 字段或索引作为文件名
      const itemId = currentData.name || currentData['姓名'] || i + 1;
      zip.file(`${outputFileName}-${itemId}.docx`, generatedDoc);
    }

    // 生成 ZIP 文件并下载
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${outputFileName}.zip`);
    elMessageUtils.success(`成功生成 ${jsonData.length} 个文档`);
  } catch (error) {
    console.error('生成多个文档失败:', error);
    elMessageUtils.error(`生成失败: ${error instanceof Error ? error.message : '未知错误'}`);
    throw error;
  }
}

/**
 * @description: 使用数据替换DOCX模板中的变量，生成新文档
 * @param {File} templateFile - DOCX模板文件
 * @param {Record<string, any>} data - 替换数据
 * @return {Promise<Uint8Array>} 返回生成的DOCX文件Buffer
 */
export async function replaceDocxTemplate(
  templateFile: File,
  data: Record<string, any>,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };

    reader.onload = async (event) => {
      try {
        const templateContent = event.target?.result as ArrayBuffer;
        if (!templateContent) {
          reject(new Error('文件内容为空'));
          return;
        }

        // 使用 docx-templates 生成文档
        const report = await createReport({
          template: new Uint8Array(templateContent),
          data: data,
          cmdDelimiter: ['{', '}'], // 使用 {xxx} 作为模板分隔符
          noSandbox: true, // 在浏览器环境中使用 Function 而不是 vm.Script
        });

        resolve(report);
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
 * @return {Promise<Uint8Array[]>} 返回生成的DOCX文件Buffer数组
 */
export async function batchGenerateDocx(
  templateFile: File,
  dataList: Array<Record<string, any>>,
): Promise<Uint8Array[]> {
  const results: Uint8Array[] = [];

  for (const data of dataList) {
    try {
      const buffer = await replaceDocxTemplate(templateFile, data);
      results.push(buffer);
    } catch (error) {
      console.error('生成文档失败：', error);
      throw error;
    }
  }

  return results;
}
