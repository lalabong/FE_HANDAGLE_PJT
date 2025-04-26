import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postPost } from '@api/post/postPost';

import { QUERY_KEYS } from '@constants/api';
import { PATH } from '@constants/path';

// 게시글 생성
export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      postPost({ title, content }),

    onSuccess: (data) => {
      alert('게시글이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      navigate(`${PATH.DETAIL_POST(data.id)}`);
    },

    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          alert('필수 입력 항목이 누락되었습니다.');
        } else if (status === 401) {
          alert('로그인이 필요합니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });
};
