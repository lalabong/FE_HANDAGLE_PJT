import { useQuery } from '@tanstack/react-query';

import { getPosts, GetPostsParams } from '@api/post/getPosts';

import { QUERY_KEYS } from '@constants/index';

export const usePostsQuery = ({ page, limit }: GetPostsParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS, { page, limit }],
    queryFn: () => getPosts({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
};
