import axios from 'axios';
import { PropertyResponse } from '../types/property';

const API_BASE_URL = 'http://localhost:8000/v1/api';

export const getProperties = async (): Promise<PropertyResponse[]> => {
    try {
      const response = await axios.get<PropertyResponse[]>(`${API_BASE_URL}/properties`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách property:', error);
      throw error;
    }
  };

  