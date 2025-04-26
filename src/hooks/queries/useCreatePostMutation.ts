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
      postPost(title, content),

    onSuccess: (data) => {
      alert('게시글이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      navigate(`${PATH.DETAIL_POST(data.id)}`);
    },

    onError: (error) => {
      alert('게시글 등록 중 오류가 발생했습니다.');
      console.error('게시글 등록 오류:', error);
    },
  });
};
