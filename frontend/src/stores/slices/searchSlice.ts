import { StateCreator } from 'zustand';
import { debounce } from 'lodash';

export interface SearchFilters {
  location: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  propertyType: string;
  bedrooms: number | null;
  bathrooms: number | null;
  category: string;
  status: string;
  createdAfter: Date | null;
}

export interface SearchSlice {
  searchQuery: string;
  searchFilters: SearchFilters;
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
}

const searchSlice: StateCreator<SearchSlice> = (set, get) => ({
  searchQuery: '',
  searchFilters: {
    location: '',
    minPrice: 0,
    maxPrice: Infinity,
    minArea: 0,
    maxArea: 0,
    propertyType: '',
    bedrooms: 0,
    bathrooms: 0,
    category: '',
    status: '',
    createdAfter: null,
  },
  setSearchQuery: debounce((query: string) => set({ searchQuery: query }), 300),
  setSearchFilters: (filters: Partial<SearchFilters>) =>
    set({ searchFilters: { ...get().searchFilters, ...filters } }),
});

export default searchSlice;
