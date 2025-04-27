import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { Post } from '@/types/post';

export interface GetPostsParams {
  page: number;
  limit: number;
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
export const getPosts = async ({ page, limit }: GetPostsParams): Promise<PostsResponse> => {
  return api.get<PostsResponse>(API_ENDPOINTS.POSTS.BASE, {
    params: {
      page,
      limit,
    },
  });
};
