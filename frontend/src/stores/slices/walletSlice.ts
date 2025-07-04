import { StateCreator } from 'zustand';
import {
  fetchWalletAPI,
  depositAPI,
  paymentAPI,
} from '../services/walletService';

export interface Transaction {
  type: 'deposit' | 'paynment';
  amount: number;
  date: string;
}

export interface Wallet {
  balance: number;
}

export interface WalletSlice {
  wallet: Wallet;
  isLoadingWallet: boolean;
  errorWallet: string | null;
  isFetchedWallet: boolean;
  fetchWallet: () => Promise<void>;
  deposit: (amount: number) => Promise<{ success: boolean; error?: string }>;
  payment: (amount: number) => Promise<{ success: boolean; error?: string }>;
}

const walletSlice: StateCreator<WalletSlice> = (set, get) => ({
  wallet: { balance: 0 },
  isLoadingWallet: false,
  errorWallet: null,
  isFetchedWallet: false,
  fetchWallet: async () => {
    if (get().isFetchedWallet) return;
    set({ isLoadingWallet: true, errorWallet: null });
    try {
      const { data } = await fetchWalletAPI();
      set({ wallet: data, isLoadingWallet: false, isFetchedWallet: true });
    } catch (error: any) {
      set({
        wallet: { balance: 0 },
        isLoadingWallet: false,
        errorWallet: error.response?.data?.message || 'Fetch wallet failed',
      });
    }
  },
  deposit: async (amount) => {
    set({ isLoadingWallet: true, errorWallet: null });
    try {
      const { data } = await depositAPI(amount);
      set({ wallet: data, isLoadingWallet: false, isFetchedWallet: true });
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Deposit failed';
      set({ isLoadingWallet: false, errorWallet: message });
      return { success: false, error: message };
    }
  },
  payment: async (amount) => {
    set({ isLoadingWallet: true, errorWallet: null });
    try {
      const { data } = await paymentAPI(amount);
      set({ wallet: data, isLoadingWallet: false, isFetchedWallet: true });
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Payment failed';
      set({ isLoadingWallet: false, errorWallet: message });
      return { success: false, error: message };
    }
  }
});

export default walletSlice;
