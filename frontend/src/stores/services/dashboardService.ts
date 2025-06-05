import { api } from './api';
import { DashboardStats } from '../slices/dashboardSlice';

export const fetchDashboardStatsAPI = async () => {
  return await api.get('/dashboard/stats');
};