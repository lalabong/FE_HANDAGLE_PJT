import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getComments, GetCommentsParams } from '@api/post/comment/getComments';

import { QUERY_KEYS } from '@constants/api';

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
        if (status === 401) {
          alert('로그인이 필요합니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
      console.error('댓글 목록 불러오기 오류:', error);
    }
  }, [query.error]);

  return query;
};
