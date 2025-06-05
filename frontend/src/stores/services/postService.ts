import api from './api';
import { PostFilter, Post } from '../slices/postSlice'

export const get_postsAPI = async (params: { page: number; limit: number} & PostFilter ) => {
    const response = await api.get<{ posts: Post[] }>('/posts', { params: params,}
    );
    return response.data;
};