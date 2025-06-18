import axios from 'axios';

export const uploadImagesTiptap = async (file: File): Promise<string> => {
  try {
    console.log('Starting upload with file:', file);
    if (!file) {
      console.log('No file selected');
      throw new Error('No file selected');
    }
    if (!file.type.startsWith('image/')) {
      throw new Error('Chỉ hỗ trợ file hình ảnh (jpg, png, ...)');
    }

    const formData = new FormData();
    formData.append('file', file);

    // Log FormData để kiểm tra
    for (let [key, value] of formData.entries()) {
      console.log(`FormData: ${key}=${value}`);
    }

    const response = await axios.post(
      'http://127.0.0.1:8000/api/v1/property/upload-images/tiptap',
      formData
    );
    console.log('Upload successful:', response.data.url);
    return response.data.url;
  } catch (error) {
    console.error('Upload error:');
    throw error;
  }
};