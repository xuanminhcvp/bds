import { StateCreator } from 'zustand';
import { fetchDashboardStatsAPI } from '../services/dashboardService';

export interface DashboardStats {
  totalProperties: number;
  totalFavorites: number;
  walletBalance: number;
}

export interface DashboardSlice {
  dashboardStats: DashboardStats;
  isLoadingDashboard: boolean;
  errorDashboard: string | null;
  isFetchedDashboard: boolean;
  fetchDashboardStats: () => Promise<void>;
}

const dashboardSlice: StateCreator<DashboardSlice> = (set, get) => ({
  dashboardStats: { totalProperties: 0, totalFavorites: 0, walletBalance: 0 },
  isLoadingDashboard: false,
  errorDashboard: null,
  isFetchedDashboard: false,
  fetchDashboardStats: async () => {
    if (get().isFetchedDashboard) return;
    set({ isLoadingDashboard: true, errorDashboard: null });
    try {
      const { data } = await fetchDashboardStatsAPI();
      set({
        dashboardStats: data,
        isLoadingDashboard: false,
        isFetchedDashboard: true,
      });
    } catch (error: any) {
      set({
        isLoadingDashboard: false,
        errorDashboard: error.response?.data?.message || 'Fetch stats failed',
      });
    }
  },
});

export default dashboardSlice;
