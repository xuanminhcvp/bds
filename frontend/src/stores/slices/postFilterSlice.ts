import { StateCreator } from 'zustand';

interface PostFilter {
  category: string;
  tags: string[];
  published_at: string | null;
  title: string;
}

export interface PostFilterSlice {
  filterPost: PostFilter;
  setFilterPost: (newFilters: Partial<PostFilter>) => void;
  clearFilterPost: () => void;
}

const usePostFilterSlice: StateCreator<PostFilterSlice> = ((set, get) => ({
  filterPost: {
    category: '',
    tags: [],
    published_at: null,
    title: '',
  },
  setFilterPost: (newFilters) =>
    set((state) => ({
      filterPost: { ...state.filterPost, ...newFilters },
    })),
  clearFilterPost: () =>
    set({
      filterPost: {
        category: '',
        tags: [],
        published_at: null,
        title: '',
      },
    }),
}));
export default usePostFilterSlice;