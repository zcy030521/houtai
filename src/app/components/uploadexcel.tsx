import React, { useState } from 'react';
import axios from 'axios';
import { message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
axios.defaults.baseURL="http://localhost:3100"

// 分片大小：5MB
const CHUNK_SIZE = 5 * 1024 * 1024;

interface FileChunk {
  chunk: Blob;
  hash: string;
  index: number;
}

const UploadExcel: React.FC = () => {
  const [uploading, setUploading] = useState(false);

  // 计算文件hash，用于秒传
  const calculateHash = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const hash = btoa(e.target?.result as string);
        resolve(hash);
      };
      reader.readAsBinaryString(file);
    });
  };

  // 文件分片
  const createFileChunks = (file: File): FileChunk[] => {
    const chunks: FileChunk[] = [];
    let start = 0;
    let index = 0;

    while (start < file.size) {
      const chunk = file.slice(start, start + CHUNK_SIZE);
      chunks.push({
        chunk,
        hash: `${file.name}-${index}`,
        index
      });
      start += CHUNK_SIZE;
      index++;
    }
    return chunks;
  };

  // 上传分片
  const uploadChunk = async (chunk: FileChunk, fileHash: string) => {
    const formData = new FormData();
    formData.append('chunk', chunk.chunk);
    formData.append('hash', chunk.hash);
    formData.append('fileHash', fileHash);
    formData.append('index', chunk.index.toString());

    try {
      await axios.post('/api/upload/chunk', formData);
    } catch (error) {
      throw new Error(`分片 ${chunk.index} 上传失败`);
    }
  };

  // 合并分片
  const mergeChunks = async (fileHash: string, fileName: string, chunks: number) => {
    try {
      // 修改检查文件存在接口
      const { data: { exists } } = await axios.post('/upload?action=check', {
        fileHash
      });
      
      // 修改分片上传接口
      await axios.post('/upload?action=chunk', formData);
      
      // 修改合并分片接口
      await axios.post('/upload?action=merge', {
        fileHash,
        fileName,
        chunks
      });
      message.success('文件上传成功！');
    } catch (error) {
      message.error('文件合并失败！');
    }
  };

  // 处理文件上传
  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      // 计算文件hash
      const fileHash = await calculateHash(file);
     

      // 文件分片
      const chunks = createFileChunks(file);
      
      // 并发上传分片
      await Promise.all(
        chunks.map(chunk => uploadChunk(chunk, fileHash))
      );

      // 合并分片
      await mergeChunks(fileHash, file.name, chunks.length);
      
    } catch (error) {
      message.error('上传失败！');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Upload
      customRequest={({ file }) => handleUpload(file as File)}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />} loading={uploading}>
        {uploading ? '上传中...' : '选择文件'}
      </Button>
    </Upload>
  );
};

export default UploadExcel;
