import { api } from './api';

export const fetchDashboardStatsAPI = async () => {
  return await api.get('/dashboard/stats');
};
