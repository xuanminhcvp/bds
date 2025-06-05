import { StateCreator } from "zustand";
import { debounce } from 'lodash';
import axios, { AxiosError } from "axios";

export enum PostStatus {
  PENDING = "pending",
  APPROVED = "approved",
  WAITING_PAYMENT = "waiting_payment",
  DRAFT = "draft",
  ACTIVE = "active",
}

export interface Post {
  post_id: string;
  title: string;
  description: string | null;
  price: number;
  area: number;
  address: string;
  property_type: string;
  category: string;
  status: PostStatus;
  user_id: string;
  create_at: string;
  update_at: string;
  expires_at: string;
  view: number;
  image?: string[]
}

export interface PostFilter {
  status?: PostStatus;
  keyword?: string;
  category?: string; 
  minPrice?: number;
  maxPrice?: number;
  dateRange?: { start: string; end: string };
  page?: number;
  pageSize?: number;
}

export interface PostPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PostSlice {
  posts: Post[];
  pagination: PostPagination;
  filters: PostFilter;
  isLoadingPost: boolean;
  errorPost: { message: string; code?: number } | null;
  fetchPosts: (options?: { page?: number; limit?: number; filters?: PostFilter }) => Promise<void>;
  setFilters: (filters: PostFilter) => void;
  mergeFilters: (partial: Partial<PostFilter>) => void;
  resetFilters: () => void;
  createPost: (data: Omit<Post, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updatePost: (id: number, data: Partial<Omit<Post, "id" | "createdAt" | "updatedAt">>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

const DEFAULT_PAGE_SIZE = 20; 

const defaultFilters: PostFilter = {
  status: undefined,
  category: "",
  keyword: "",
  minPrice: undefined,
  maxPrice: undefined,
  dateRange: undefined,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const postSlice: StateCreator<PostSlice> = (set, get) => ({
  posts: [],
  pagination: {
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    total: 0,
    totalPages: 0,
  },
  filters: defaultFilters,
  isLoadingPost: false,
  errorPost: null,

  fetchPosts: async (options = {}) => {
    const { page, limit, filters } = options;
    const currentFilters = filters ?? get().filters;
    set({ isLoadingPost: true, errorPost: null });
    try {
      const response = await fetchPostsAPI({
        page: page ?? get().pagination.page,
        limit: limit ?? get().pagination.limit,
        ...currentFilters,
      });
      set({
        posts: response.data,
        pagination: {
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages,
        },
        filters: currentFilters,
        isLoadingPost: false,
      });
    } catch (error: any) {
      set({
        isLoadingPost: false,
        errorPost: {
          message: error?.response?.data?.message || "Fetch posts failed",
          code: error?.response?.status,
        },
      });
    }
  },

  setFilters: debounce((filters: PostFilter) => {
    set({ filters, pagination: { ...get().pagination, page: 1 } });
    get().fetchPosts({ page: 1, filters });
  }, 300),

  mergeFilters: debounce((partial: Partial<PostFilter>) => {
    set((state) => ({
      filters: { ...state.filters, ...partial },
      pagination: { ...state.pagination, page: 1 },
    }));
    get().fetchPosts({ page: 1, filters: { ...get().filters, ...partial } });
  }, 300),

  resetFilters: () => {
    set({ filters: defaultFilters, pagination: { ...get().pagination, page: 1 } });
    get().fetchPosts({ page: 1, filters: defaultFilters });
  },
  createPost: async (newPost) => {
    set({ isLoadingPost: true, errorPost: null });
    try {
      const createdPost = await createPostAPI(newPost);
      set((state) => ({
        posts: [createdPost.data, ...state.posts].slice(0, state.pagination.limit),
        pagination: { ...state.pagination, total: state.pagination.total + 1 },
        isLoadingPost: false,
      }));
    } catch (error: any) {
      set({
        isLoadingPost: false,
        errorPost: {
          message: error?.response?.data?.message || "Create post failed",
          code: error?.response?.status,
        },
      });
    }
  },
  updatePost: async (id, updateData) => {
    set({ isLoadingPost: true, errorPost: null });
    try {
      const updatedPost = await updatePostAPI(id, updateData);
      set((state) => ({
        posts: state.posts.map((post) => (post.post_id === id ? { ...post, ...updatedPost.data } : post)),
        isLoadingPost: false,
      }));
    } catch (error: any) {
      set({
        isLoadingPost: false,
        errorPost: {
          message: error?.response?.data?.message || "Update post failed",
          code: error?.response?.status,
        },
      });
    }
  },
  deletePost: async (id) => {
    set({ isLoadingPost: true, errorPost: null });
    try {
      await deletePostAPI(id);
      const { page, total, limit } = get().pagination;
      const newTotal = total - 1;
      const newPage = Math.max(1, Math.min(page, Math.ceil(newTotal / limit)));
      get().fetchPosts({ page: newPage, filters: get().filters });
    } catch (error: any) {
      set({
        isLoadingPost: false,
        errorPost: {
          message: error?.response?.data?.message || "Delete post failed",
          code: error?.response?.status,
        },
      });
    }
  },

});