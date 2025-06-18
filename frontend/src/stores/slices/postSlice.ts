import { StateCreator, create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { PostCreate, PostResponse } from '../../types/post';
import {
  createPostAPI,
  fetchPostsAPI, 
  fetchPostBySlugAPI
} from '../services/postService';

export interface PostSlice {
  post: PostResponse | null;
  posts: PostResponse[];
  isLoadingPost: boolean;
  errorPost: string | null;
  fetchPostsAPI: () => Promise<void>;
  createPost: (newPost: PostCreate) => Promise<void>;
  fetchPostBySlugAPI: (slug: string) => Promise<PostResponse | null>;
};

export const postSlice: StateCreator<PostSlice> = (set, get) => ({
  post: null,
  posts: [],
  isLoadingPost: false,
  errorPost: null,

  fetchPostsAPI: async () => {
    set({ isLoadingPost: true, errorPost: null });
    try {
      const response = await fetchPostsAPI();
      set({ posts: response.data, isLoadingPost: false });
      console.log('Posts fetched successfully:', response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      set({ errorPost: axiosError.message, isLoadingPost: false });
    }
  },
  createPost: async (newPost: PostCreate) => {
    set({ isLoadingPost: true, errorPost: null });
    try {
      const response = await createPostAPI(newPost);
      set((state) => ({
        posts: [...state.posts, response.data],
        isLoadingPost: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set({ errorPost: axiosError.message, isLoadingPost: false });
    }
  },
  fetchPostBySlugAPI: async (slug: string) => {
    set({ isLoadingPost: true, errorPost: null });
    try {
      const response = await fetchPostBySlugAPI(slug);
      set({ isLoadingPost: false, post: response.data });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      set({ errorPost: axiosError.message, isLoadingPost: false });
      return null;
    }
  },
});

export default postSlice