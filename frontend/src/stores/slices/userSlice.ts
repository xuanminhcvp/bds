import { StateCreator } from 'zustand';
import { fetchUserProfileAPI, updateUserProfileAPI } from '../services/userService';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface UserSlice {
  userProfile: UserProfile | null;
  isLoadingUser: boolean;
  errorUser: string | null;
  isFetchedUser: boolean;
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}

const userSlice: StateCreator<UserSlice> = (set, get) => ({
  userProfile: null,
  isLoadingUser: false,
  errorUser: null,
  isFetchedUser: false,
  fetchUserProfile: async () => {
    if (get().isFetchedUser) return;
    set({ isLoadingUser: true, errorUser: null });
    try {
      const { data } = await fetchUserProfileAPI();
      set({ userProfile: data, isLoadingUser: false, isFetchedUser: true });
    } catch (error: any) {
      set({ isLoadingUser: false, errorUser: error.response?.data?.message || 'Fetch profile failed' });
    }
  },
  updateUserProfile: async (profileData) => {
    set({ isLoadingUser: true, errorUser: null });
    try {
      const { data } = await updateUserProfileAPI(profileData);
      set({ userProfile: data, isLoadingUser: false });
    } catch (error: any) {
      set({ isLoadingUser: false, errorUser: error.response?.data?.message || 'Update profile failed' });
    }
  },
});

export default userSlice;