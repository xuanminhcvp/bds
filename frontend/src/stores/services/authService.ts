import api from './api';
import { User } from '../slices/authSlice';
import { UserAdmin } from '../../types/user';

export const loginAPI = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post('users/login', credentials);
  return response.data as { token: string; user: User };
};

export const loginAdminAPI = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post('users/login/admin', credentials);
  return response.data as { token: string; userAdmin: UserAdmin };
};

export const registerAPI = async (userData: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) => {
  const response = await api.post('users/register', userData);
  return response.data as { user: User };
};
