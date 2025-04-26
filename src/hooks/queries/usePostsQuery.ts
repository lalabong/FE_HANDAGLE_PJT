import { useQuery } from '@tanstack/react-query';

import { getPosts } from '@api/post/getPosts';

import { QUERY_KEYS } from '@constants/api';

interface UsePostsQueryParams {
  page: number;
  limit: number;
}

export const usePostsQuery = ({ page, limit }: UsePostsQueryParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS, { page, limit }],
    queryFn: () => getPosts(page, limit),
    placeholderData: (previousData) => previousData,
  });
};
