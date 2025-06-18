import { create, StoreApi } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import authSlice, { AuthSlice } from './slices/authSlice';
import userSlice, { UserSlice } from './slices/userSlice';
import walletSlice, { WalletSlice } from './slices/walletSlice';
import propertySlice, { PropertySlice } from './slices/propertySlice';
import searchSlice, { SearchSlice } from './slices/searchSlice';
import dashboardSlice, { DashboardSlice } from './slices/dashboardSlice';
import transactionSlice, { TransactionSlice } from './slices/transactionSlice';
import notificationSlice, { NotificationSlice } from './slices/notificationSlice';
import projectSlice, { ProjectSlice } from './slices/projectSlice';
import postSlice, { PostSlice } from './slices/postSlice';
import usePostFilterSlice, { PostFilterSlice } from './slices/postFilterSlice';
import useProjectFilterSlice, { ProjectFilterSlice } from './slices/projectFilterSlice';
import usePropertyFilterSlice, { PropertyFilterSlice } from './slices/propertyFilterSlice';

export interface Store
  extends AuthSlice,
    UserSlice,
    WalletSlice,
    PropertySlice,
    SearchSlice,
    DashboardSlice,
    TransactionSlice,
    NotificationSlice,
    ProjectSlice,
    PostSlice,
    PostFilterSlice,
    ProjectFilterSlice,
    PropertyFilterSlice {
  clearError: () => void;
}

const useRealEstateStore = create<Store>()(
  devtools(
    persist(
      (set, get, api: StoreApi<Store>) => ({
        ...authSlice(set, get, api),
        ...userSlice(set, get, api),
        ...walletSlice(set, get, api),
        ...propertySlice(set, get, api),
        ...searchSlice(set, get, api),
        ...dashboardSlice(set, get, api),
        ...transactionSlice(set, get, api),
        ...notificationSlice(set, get, api),
        ...projectSlice(set, get, api),
        ...postSlice(set, get, api),
        ...usePostFilterSlice(set, get, api),
        ...useProjectFilterSlice(set, get, api),
        ...usePropertyFilterSlice(set, get, api),
        clearError: () =>
          set({
            errorAuth: null,
            errorUser: null,
            errorWallet: null,
            errorProperty: null,
            errorDashboard: null,
            errorTransactions: null,
            errorNotification: null,
            errorPost: null,
          }),
      }),
      {
        name: 'real-estate-store',
        version: 1,
        partialize: (state) => ({
          token: state.token,
          user: state.user,
          userProfile: state.userProfile,
          property: state.property,
          isFetchedProperty: state.isFetchedProperty,
          isAuthenticated: state.isAuthenticated,
          filterProperty: state.filterProperty,
          filterProject: state.filterProject
        }),
        storage: createJSONStorage(() => localStorage),
        migrate: (persistedState: unknown, version: number) => {
          if (version < 1) {
            const state = persistedState as Partial<Store>;
            return { ...state, favoriteProperties: [] } as Store;
          }
          return persistedState as Store;
        },
      }
    )
  )
);

export default useRealEstateStore;
