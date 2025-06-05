import api from './api';
import { Wallet } from '../slices/walletSlice';

export const fetchWalletAPI = async () => {
  return await api.get('/wallets/');
};

export const depositAPI = async (amount: number) => {
  return await api.post('/wallets/deposit', { amount });
};

export const withdrawAPI = async (amount: number) => {
  return await api.post('/wallet/withdraw', { amount });
};