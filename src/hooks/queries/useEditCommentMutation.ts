import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchComment } from '@api/post/comment/patchComment';

import { QUERY_KEYS } from '@constants/api';

interface EditCommentParams {
  postId: string;
  commentId: string;
  content: string;
}

// 댓글 수정
export const useEditCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId, content }: EditCommentParams) =>
      patchComment(postId, commentId, content),
    onSuccess: (_, variables) => {
      alert('댓글이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS, variables.postId] });
    },
    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          alert('로그인이 필요합니다.');
        } else if (status === 403) {
          alert('댓글 수정 권한이 없습니다.');
        } else if (status === 404) {
          alert('게시글이나 댓글, 또는 사용자를 찾을 수 없습니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });
};
