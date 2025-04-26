import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DeleteCommentParams, deleteComment } from '@api/post/comment/deleteComment';

import { QUERY_KEYS } from '@constants/api';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@constants/messages';
import { STATUS_CODES } from '@constants/statusCodes';

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
      if (error.response) {
        const status = error.response.status;
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
