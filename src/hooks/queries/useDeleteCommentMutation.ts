import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment, DeleteCommentParams } from '@api/post/comment/deleteComment';

import { QUERY_KEYS } from '@constants/api';

// 댓글 삭제
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentParams) =>
      deleteComment({ postId, commentId }),
    onSuccess: (_, variables) => {
      alert('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS, variables.postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, variables.postId] });
    },
    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          alert('로그인이 필요합니다.');
        } else if (status === 403) {
          alert('댓글 삭제 권한이 없습니다.');
        } else if (status === 404) {
          alert('게시글이나 댓글을 찾을 수 없습니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });
};
