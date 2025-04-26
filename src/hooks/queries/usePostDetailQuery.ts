import { useQuery } from '@tanstack/react-query';

import { getPostDetail } from '@api/post/getPostDetail';

import { QUERY_KEYS } from '@constants/api';

// 게시글 상세 조회
export const usePostDetailQuery = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });
};
