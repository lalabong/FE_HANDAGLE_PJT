import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DeleteCommentParams, deleteComment } from '@api/post/comment/deleteComment';

import { ERROR_MESSAGES, QUERY_KEYS, STATUS_CODES, SUCCESS_MESSAGES } from '@constants/index';

// 댓글 삭제
export const useDeleteCommentMutation = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentParams) =>
      deleteComment({ postId, commentId }),

    onSuccess: () => {
      alert(SUCCESS_MESSAGES.COMMENT.DELETE);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS, postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId] });
    },

    onError: (error: any) => {
      if (error.status) {
        const status = error.status;
        if (status === STATUS_CODES.UNAUTHORIZED) {
          alert(ERROR_MESSAGES.COMMON.UNAUTHORIZED);
        } else if (status === STATUS_CODES.NOT_FOUND) {
          alert(ERROR_MESSAGES.COMMENT.NOT_FOUND);
        } else {
          alert(ERROR_MESSAGES.COMMENT.DELETE_ERROR);
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    },
  });
};
