import axios from 'axios';

export const uploadImages = async (files: File[]): Promise<string[]> => {
  if (files.length === 0) return [];
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  const response = await axios.post(
    'http://127.0.0.1:8000/api/v1/property/upload-images',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.image_paths;
};
