import api from './api';
import { UserProfile } from '../slices/userSlice';

export const fetchUserProfileAPI = async () => {
  return await api.get('users/me/');
};

export const updateUserProfileAPI = async (
  profileData: Partial<UserProfile>
) => {
  return await api.put('/users/me', profileData);
};

// API for admin to fetch all users
export const fetchAllUsersAPI = async () => {
  return await api.get('/users/');
};

export const updateUserLockAPI = async (id: string, is_locked: boolean) => {
  return await api.patch(`/users/${id}`, { is_locked });
};

export const deleteUserAPI = async (id: string) => {
  return await api.delete(`/users/${id}`);
};
