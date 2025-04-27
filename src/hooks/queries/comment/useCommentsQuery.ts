import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getComments, GetCommentsParams } from '@api/post/comment/getComments';

import { ERROR_MESSAGES, QUERY_KEYS, STATUS_CODES } from '@constants/index';

// 댓글 목록 조회
export const useGetCommentsQuery = ({ postId }: GetCommentsParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_COMMENTS, postId],
    queryFn: () => getComments({ postId }),
    enabled: !!postId,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as any;
      if (error.response) {
        const status = error.response.status;
        if (status === STATUS_CODES.UNAUTHORIZED) {
          alert(ERROR_MESSAGES.COMMON.UNAUTHORIZED);
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    }
  }, [query.error]);

  return query;
};
