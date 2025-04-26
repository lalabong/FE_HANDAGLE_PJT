import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { patchPost } from '@api/post/patchPost';

import { QUERY_KEYS } from '@constants/api';
import { PATH } from '@constants/path';

interface EditPostParams {
  postId: string;
  title: string;
  content: string;
}

// 게시글 수정
export const useEditPostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ postId, title, content }: EditPostParams) => patchPost(postId, title, content),
    onSuccess: (_, variables) => {
      alert('게시글이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, variables.postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      navigate(`${PATH.DETAIL_POST(variables.postId)}`);
    },
    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          alert('필수 입력 항목이 누락되었습니다.');
        } else if (status === 401) {
          alert('로그인이 필요합니다.');
        } else if (status === 404) {
          alert('게시글을 찾을 수 없습니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });
};
