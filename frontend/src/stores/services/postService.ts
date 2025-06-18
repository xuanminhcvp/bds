import api from './api';
import { PostCreate, PostResponse } from '../../types/post';

export const createPostAPI = async (postData: PostCreate) => {
  return await api.post<PostResponse>('/post/', postData);
};

export const fetchPostsAPI = async () => {
  return await api.get<PostResponse[]>('/post/');
};

export const fetchPostBySlugAPI = async (slug: string) => {
  return await api.get<PostResponse>(`/post/${slug}/`);
}