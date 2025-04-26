import { useQuery } from '@tanstack/react-query';

import { getComments } from '@api/post/comment/getComments';

import { QUERY_KEYS } from '@constants/api';

// 댓글 목록 조회
export const useGetCommentsQuery = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_COMMENTS, postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
};
