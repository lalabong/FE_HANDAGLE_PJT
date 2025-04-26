import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postComment } from '@api/post/comment/postComment';

import { QUERY_KEYS } from '@constants/api';

// 댓글 생성
export const useCreateCommentMutation = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postComment(postId, content),
    onSuccess: () => {
      alert('댓글이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS, postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId] });
    },
    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
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
