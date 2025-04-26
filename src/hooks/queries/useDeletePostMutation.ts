import { deletePost } from '@/api/post/deletePost';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/constants/path';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 게시글 삭제
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      alert('게시글이 삭제되었습니다.');
      navigate(PATH.ROOT);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          alert('삭제 권한이 없습니다.');
        } else if (status === 404) {
          alert('게시글을 찾을 수 없습니다.');
        } else {
          alert('게시글 삭제 중 오류가 발생했습니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });
};
