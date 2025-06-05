import apitoken from './api';
import { UserProfile } from '../slices/userSlice';

export const fetchUserProfileAPI = async () => {
  return await apitoken.get('users/me/');
};

export const updateUserProfileAPI = async (profileData: Partial<UserProfile>) => {
  return await apitoken.put('/users/profile', profileData);
};