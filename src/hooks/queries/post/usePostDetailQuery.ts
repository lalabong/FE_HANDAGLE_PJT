import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getPostDetail, GetPostDetailParams } from '@api/post/getPostDetail';

import { ERROR_MESSAGES, QUERY_KEYS, STATUS_CODES } from '@constants/index';

// 게시글 상세 조회
export const usePostDetailQuery = ({ postId }: GetPostDetailParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
    queryFn: () => getPostDetail({ postId }),
    enabled: !!postId,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as any;
      if (error.response) {
        const status = error.response.status;
        if (status === STATUS_CODES.UNAUTHORIZED) {
          alert(ERROR_MESSAGES.COMMON.UNAUTHORIZED);
        } else if (status === STATUS_CODES.NOT_FOUND) {
          alert(ERROR_MESSAGES.POST.NOT_FOUND);
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    }
  }, [query.error]);

  return query;
};
