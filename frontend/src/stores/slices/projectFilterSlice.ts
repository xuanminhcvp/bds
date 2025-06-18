import { StateCreator } from 'zustand';

export interface ProjectFilterSlice {
  filterProject: {
    status: string;
    area: { min: number | null; max: number | null };
    address: string | null;
    created_at: string | null;
  };
  setFilterProject: (newFilters: Partial<ProjectFilterSlice['filterProject']>) => void;
  clearFilterProject: () => void;
}

const useProjectFilterSlice: StateCreator<ProjectFilterSlice> = ((set) => ({
  filterProject: {
    status: '',
    area: { min: null, max: null },
    address: null,
    created_at: null,
  },
  setFilterProject: (newFilters) =>
    set((state) => ({
      filterProject: { ...state.filterProject, ...newFilters },
    })),
  clearFilterProject: () =>
    set({
      filterProject: {
        status: '',
        area: { min: null, max: null },
        address: null,
        created_at: null,
      },
    }),
}));

export default useProjectFilterSlice;