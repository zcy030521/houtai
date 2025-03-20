import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface UploadsProps {
  imglist?: string[];
  onImagesChange?: (images: string[]) => void;
  isEditMode?: boolean;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC<UploadsProps> = ({ imglist = [], onImagesChange, isEditMode = false }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Initialize fileList when imglist changes
  useEffect(() => {
    if (imglist && imglist.length > 0) {
      const newFileList = imglist.map((url, index) => ({
        uid: `-${index}`,
        name: url.split('/').pop() || `image-${index}.png`,
        status: 'done' as const,
        url,
      }));
      setFileList(newFileList);
    }
  }, [imglist]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // Check if user is trying to remove the last image when in edit mode
    if (isEditMode && fileList.length === 1 && newFileList.length === 0) {
      message.warning('至少需要保留一张商品图片');
      return;
    }
    
    setFileList(newFileList);
    
    // Get existing uploaded images
    const existingImages = newFileList
      .filter(file => file.status === 'done' && file.url)
      .map(file => file.url);
      
    // Get newly uploaded images with response urls
    const newImages = newFileList
      .filter(file => file.status === 'done' && file.response?.url)
      .map(file => file.response.url);
    
    // Combine all images
    const allImages = [...existingImages, ...newImages];
    
    // Update parent component with all images
    if (onImagesChange) {
      onImagesChange(allImages);
    }
  };

  const beforeUpload = (file: FileType) => {
    // Optional validation logic can go here
    return true;
  };

  // Custom remove handler to prevent removing when only one image in edit mode
  const onRemove = (file: UploadFile) => {
    if (isEditMode && fileList.length <= 1) {
      alert('至少需要保留一张商品图片');
      return false; // Prevent removal
    }
    return true; // Allow removal
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        action="http://localhost:3100/uploadimage"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        onRemove={onRemove}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default App;