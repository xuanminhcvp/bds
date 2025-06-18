import { StateCreator } from 'zustand';
import {
  fetchUserProfileAPI,
  updateUserProfileAPI,
  fetchAllUsersAPI,
  updateUserLockAPI,
  deleteUserAPI
} from '../services/userService';
import { Store } from '../index';
import { UserManagement, AllUserManagement } from '../../types/user';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface UserSlice {
  userProfile: UserProfile | null;
  allUsers: AllUserManagement | null;
  isLoadingUser: boolean;
  errorUser: string | null;
  isFetchedUser: boolean;
  isUpdatingUser: boolean;
  errorUpdatingUser: string | null;
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (
    profileData: Partial<UserProfile>
  ) => Promise<{ success: boolean }>;
  fetchAllUsers: () => Promise<void>;
  updateUserLock: (id: string, is_locked: boolean) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const userSlice: StateCreator<Store, [], [], UserSlice> = (set, get) => ({
  userProfile: null,
  allUsers: null,
  isLoadingUser: false,
  errorUser: null,
  isFetchedUser: false,
  isUpdatingUser: false,
  errorUpdatingUser: null,
  fetchUserProfile: async () => {
    if (get().isFetchedUser) return;
    set({ isLoadingUser: true, errorUser: null });
    try {
      const { data } = await fetchUserProfileAPI();
      set({ userProfile: data, isLoadingUser: false, isFetchedUser: true });
    } catch (error: any) {
      set({
        isLoadingUser: false,
        errorUser: error.response?.data?.message || 'Fetch profile failed',
      });
    }
  },
  updateUserProfile: async (profileData) => {
    set({ isLoadingUser: true, errorUser: null });
    try {
      const { data } = await updateUserProfileAPI(profileData);
      set({ userProfile: data, isLoadingUser: false, user: data });
      return { success: true };
    } catch (error: any) {
      set({
        isLoadingUser: false,
        errorUser: error.response?.data?.message || 'Update profile failed',
      });
      return { success: false };
    }
  },
  fetchAllUsers: async () => {
    set({ isLoadingUser: true, errorUser: null });
    try {
      const { data } = await fetchAllUsersAPI();
      set({ allUsers: data, isLoadingUser: false });
    } catch (error: any) {
      set({
        isLoadingUser: false,
        errorUser: error.response?.data?.message || 'Fetch all users failed',
      });
    }
  },
  updateUserLock: async (id, is_locked) => {
    set({ isUpdatingUser: true, errorUpdatingUser: null });
    try {
      await updateUserLockAPI(id, is_locked);
      const allUsers = get().allUsers?.data;
      if (allUsers) {
        const updatedUsers = allUsers.map((user) =>
          user.id === id ? { ...user, is_locked } : user
        );
        set({ allUsers: { data: updatedUsers, count: updatedUsers.length }, isUpdatingUser: false });
      }
    } catch (error: any) {
      set({
        isUpdatingUser: false,
        errorUpdatingUser: error.response?.data?.message || 'Update user lock failed',
      });
    }
  },
  deleteUser: async (id) => {
    set({ isLoadingUser: true, errorUser: null });
    try {
      await deleteUserAPI(id);
      const allUsers = get().allUsers?.data;
      if (allUsers) {
        const updatedUsers = allUsers.filter((user) => user.id !== id);
        set({ allUsers: { data: updatedUsers, count: updatedUsers.length }, isLoadingUser: false });
      }
    } catch (error: any) {
      set({
        isLoadingUser: false,
        errorUser: error.response?.data?.message || 'Delete user failed',
      });
    }
  },
});

export default userSlice;
