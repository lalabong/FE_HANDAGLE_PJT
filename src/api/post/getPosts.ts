import { api } from '@api/api';

export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  viewCount: number;
  commentCount: number;
  isAuthor: boolean;
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

export const getPosts = async (page: number, limit: number): Promise<PostsResponse> => {
  return api.get<PostsResponse>('/api/posts', {
    params: {
      page,
      limit,
    },
  });
};
