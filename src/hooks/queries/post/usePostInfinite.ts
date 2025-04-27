import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '@api/post/getPosts';

import { API_DEFAULTS, QUERY_KEYS } from '@constants/index';

import { Post } from '@/types/post';

interface PostInfiniteResponse {
  content: Post[];
  last: boolean;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
}

export const usePostInfinite = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPosts({
        page: pageParam,
        limit: API_DEFAULTS.POSTS.LIMIT,
      });

      return {
        content: response.items,
        last: pageParam >= response.meta.totalPages,
        pageNumber: pageParam,
        totalElements: response.meta.totalItems,
        totalPages: response.meta.totalPages,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PostInfiniteResponse) => {
      if (lastPage.last) return undefined;
      return lastPage.pageNumber + 1;
    },
  });
};
