import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { User } from '@/types/user';

export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  viewCount: number;
  commentCount: number;
  isAuthor: boolean;
  content: string;
  author: User;
}

interface PostsResponse {
  items: Post[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

// 게시글 목록 조회
export const getPosts = async (page: number, limit: number): Promise<PostsResponse> => {
  return api.get<PostsResponse>(API_ENDPOINTS.POSTS.BASE, {
    params: {
      page,
      limit,
    },
  });
};
