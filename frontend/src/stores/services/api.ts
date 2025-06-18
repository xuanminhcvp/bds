import axios, { AxiosInstance } from 'axios';
import useRealEstateStore from '../index';

export const api: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = useRealEstateStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useRealEstateStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
