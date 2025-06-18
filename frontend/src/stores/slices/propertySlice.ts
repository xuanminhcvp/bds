import { StateCreator } from 'zustand';
import { Property, PropertyCreate } from '../type/PropertyType';
import {
  fetchPropertyAPI,
  addPropertyAPI,
  updatePropertyAPI,
  deletePropertyAPI,
  getPropertyByIdAPI,
  getPropertyByUserAPI,
  extendPropertyAPI,
  updatePropertyStatusAPI,
} from '../services/propertyService';
import { PropertyFilterSlice } from './propertyFilterSlice';

export interface PropertySlice {
  property: Property[];
  propertyDetail: Property | null;
  isLoadingProperty: boolean;
  errorProperty: string | null;
  isFetchedProperty: boolean;
  userproperty: Property[];
  fetchProperty: (filter?: PropertyFilterSlice['filterProperty']) => Promise<void>;
  addProperty: (
    property_create: PropertyCreate
  ) => Promise<{ success: boolean; error?: string }>;
  updateProperty: (params: {
    property_id: number;
    updated_Property: Partial<Property>;
  }) => Promise<void>;
  fetchPropertyByUser: () => Promise<void>;
  deleteProperty: (property_id: number) => Promise<void>;
  extendProperty: (property_id: number, amount: number) => Promise<void>;
  updatePropertyStatus: (
    property_id: number,
    status: string
  ) => Promise<void>;
  getPropertyById: (property_id: number) => Promise<Property | undefined>;
}

export const usePropertySlice: StateCreator<PropertySlice> = (set, get) => ({
  property: [],
  propertyDetail: null,
  isLoadingProperty: false,
  errorProperty: null,
  isFetchedProperty: false,
  userproperty: [],
  fetchProperty: async (filterProperty) => {
    set({ isLoadingProperty: true, errorProperty: null });
    try {
      const response = await fetchPropertyAPI(filterProperty);
      set({
        property: response.data.result,
        isLoadingProperty: false,
        isFetchedProperty: true,
      });
    } catch (error: any) {
      set({
        errorProperty: error.message || 'Loi khi lay du lieu ',
        isLoadingProperty: false,
        isFetchedProperty: false,
      });
    }
  },

  addProperty: async (property_create: PropertyCreate) => {
    set({ isLoadingProperty: true, errorProperty: null });
    try {
      const response = await addPropertyAPI(property_create);
      set({
        isLoadingProperty: false,
        errorProperty: null,
      });
      return { success: true, error: undefined, Response: response };
    } catch (error: any) {
      set({
        isLoadingProperty: false,
        errorProperty: error.message || 'Loi khi add Property',
      });
      return { success: false, error: error.message || 'Loi khi add Property' };
    }
  },

  updateProperty: async ({
    property_id,
    updated_Property,
  }: {
    property_id: number;
    updated_Property: Partial<Property>;
  }) => {
    set({ isLoadingProperty: true, errorProperty: null });
    try {
      const response = await updatePropertyAPI(property_id, updated_Property);
      set((state) => ({
        property: state.property.map((item) =>
          item.property_id === property_id
            ? { ...item, ...updated_Property }
            : item
        ),
        isLoadingProperty: false,
        errorProperty: null,
      }));
    } catch (error: any) {
      set({
        isLoadingProperty: false,
        errorProperty: error.message || 'Loi khi cap nhat property',
      });
      throw error;
    }
  },

  deleteProperty: async (property_id: number) => {
    set({
      isLoadingProperty: true,
      errorProperty: null,
    });
    try {
      const response = await deletePropertyAPI(property_id);
      set((state) => ({
        property: state.property.filter((item) => item.property_id !== property_id),
        isLoadingProperty: false,
        errorProperty: null,
      }));
    } catch (error: any) {
      set({
        isLoadingProperty: false,
        errorProperty: error.message || 'loi khi xoa Property',
      });
    }
  },
  getPropertyById: async (property_id: number) => {
    set({
      isLoadingProperty: true,
      errorProperty: null,
    });
    try {
      const response = await getPropertyByIdAPI(property_id);
      set({
        propertyDetail: response.data,
        isLoadingProperty: false,
        errorProperty: null,
      });
      return response.data;
    } catch (error: any) {
      set({
        isLoadingProperty: false,
        errorProperty: error.message || 'loi khi get by property_id',
      });
    }
  },
  fetchPropertyByUser: async () => {
    set({ isLoadingProperty: true, errorProperty: null });
    try {
      const response = await getPropertyByUserAPI();
      set({
        userproperty: response.data,
        isLoadingProperty: false,
        errorProperty: null,
      });
    } catch (error: any) {
      set({
        isLoadingProperty: false,
        errorProperty: error.message || 'Loi khi lay du lieu user property',
      });
    }
  },
  extendProperty: async (property_id: number, days: number) => {
    set({ isLoadingProperty: true, errorProperty: null });
    try {
      const response = await extendPropertyAPI(property_id, days);
      set((state) => ({
        userproperty: state.property.map((item) =>
          item.property_id === property_id
           ? {
                ...item,
                expires_at: new Date(
                  new Date(item.expires_at).setDate(
                    new Date(item.expires_at).getDate() + days
                  )
                ).toISOString(),
              }
            : item
        ),
        isLoadingProperty: false,
        errorProperty: null,
      }));
    } catch (error: any) {
      set({
        isLoadingProperty: false,
        errorProperty: error.message || 'Loi khi gia han Property',
      });
    }
  },
  updatePropertyStatus: async (property_id: number, status: string) => {
    set({ isLoadingProperty: true, errorProperty: null });
    try {
      await updatePropertyStatusAPI(property_id, status);
      set((state) => ({
        property: state.property.map((item) =>
          item.property_id === property_id ? { ...item, status } : item
        ),
        isLoadingProperty: false,
        errorProperty: null,
      }));
    } catch (error: any) {
      set({
        isLoadingProperty: false,
        errorProperty: error.message || 'Loi khi cap nhat trang thai property',
      });
    }
  },
});

export default usePropertySlice;
