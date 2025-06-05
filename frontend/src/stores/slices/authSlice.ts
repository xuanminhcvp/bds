import { StateCreator } from 'zustand';
import { loginAPI, registerAPI } from '../services/authService';
import { Store } from '../index';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface AuthSlice {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  isLoadingAuth: boolean;
  errorAuth: string | null;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (userData: { email: string; password: string; name: string; phone: string }) => Promise<{ success: boolean; error?: string }>;
}

const authSlice: StateCreator<Store, [], [], AuthSlice> = (set, get) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  isLoadingAuth: false,
  errorAuth: null,
  login: async (credentials) => {
    const { isAuthenticated } = get();
    if (isAuthenticated) {
      return { success: true }; 
    }
    set({ isLoadingAuth: true, errorAuth: null });
    try {
      const { token, user } = await loginAPI(credentials);
      set({ isAuthenticated: true, token, user, isLoadingAuth: false });
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      set({ isLoadingAuth: false, errorAuth: message });
      return { success: false, error: message };
    }
  },  
  logout: () => {
    set({ isAuthenticated: false, token: null, user: null, userProfile: null });
  },
  register: async (userData) => {
    set({ isLoadingAuth: true, errorAuth: null });
    try {
      const { user } = await registerAPI(userData);
      set({ user, isLoadingAuth: false });
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      set({ isLoadingAuth: false, errorAuth: message });
      return { success: false, error: message };
    }
  },
});

export default authSlice;