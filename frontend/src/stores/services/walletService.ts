import api from './api';

export const fetchWalletAPI = async () => {
  return await api.get('/wallets/');
};

export const depositAPI = async (amount: number) => {
  return await api.post('/wallets/deposit', { amount });
};

export const paymentAPI = async (amount: number) => {
  return await api.post('/wallets/payment', { amount });
};
