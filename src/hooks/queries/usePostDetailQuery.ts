import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getPostDetail } from '@api/post/getPostDetail';

import { QUERY_KEYS } from '@constants/api';

// 게시글 상세 조회
export const usePostDetailQuery = (postId: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as any;
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          alert('인증이 필요합니다.');
        } else if (status === 404) {
          alert('게시글을 찾을 수 없습니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }, [query.error]);

  return query;
};
