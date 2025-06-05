// src/types/post.ts
import { PostStatus } from "../constants/postStatus";

export interface Post {
  id: number;
  title: string;
  content: string;
  status: PostStatus;
  authorId?: number;
  categoryId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostFilter {
  status?: PostStatus;
  keyword?: string;
  categoryId?: number;
  dateRange?: { start: string; end: string };
}

export interface PostPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}