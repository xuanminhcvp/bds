import { StateCreator } from 'zustand';

export interface PropertyFilterSlice {
  filterProperty: {
    property_type: string;
    category: string;
    price: { min: number | null; max: number | null };
    area: { min: number | null; max: number | null };
    bedrooms: number | null;
    bathrooms: number | null;
    title: string;
    address: string | null;
    created_at: string | null;
  };
  setFilterProperty: (newFilters: Partial<PropertyFilterSlice['filterProperty']>) => void;
  clearFilterProperty: () => void;
}

const usePropertyFilterSlice: StateCreator<PropertyFilterSlice> = ((set) => ({
  filterProperty: {
    property_type: '',
    category: '',
    price: { min: null, max: null },
    area: { min: null, max: null },
    bedrooms: null,
    bathrooms: null,
    address: null,
    title: '',
    created_at: null,
  },
  setFilterProperty: (newFilters) =>
    set((state) => ({
      filterProperty: { ...state.filterProperty, ...newFilters },
    })),
  clearFilterProperty: () =>
    set({
      filterProperty: {
        property_type: '',
        category: '',
        price: { min: null, max: null },
        area: { min: null, max: null },
        bedrooms: null,
        bathrooms: null,
        address: null,
        created_at: null,
        title: '',
      },
    }),
}));

export default usePropertyFilterSlice;