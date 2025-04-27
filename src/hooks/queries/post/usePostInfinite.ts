import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '@api/post/getPosts';

import { QUERY_KEYS } from '@constants/index';

import { Post } from '@/types/post';

interface PostInfiniteResponse {
  content: Post[];
  last: boolean;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
}

export const usePostInfinite = (isArchived: boolean = false) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POSTS, { isArchived }],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPosts({
        page: pageParam,
        limit: 10,
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
