import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditCommentParams, patchComment } from '@api/post/comment/patchComment';

import { ERROR_MESSAGES, QUERY_KEYS, STATUS_CODES, SUCCESS_MESSAGES } from '@constants/index';

// 댓글 수정
export const useEditCommentMutation = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId, content }: EditCommentParams) =>
      patchComment({ postId, commentId, content }),

    onSuccess: () => {
      alert(SUCCESS_MESSAGES.COMMENT.UPDATE);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS, postId] });
    },

    onError: (error: any) => {
      if (error.status) {
        const status = error.status;
        if (status === STATUS_CODES.BAD_REQUEST) {
          alert(ERROR_MESSAGES.COMMON.REQUIRED_FIELD);
        } else if (status === STATUS_CODES.UNAUTHORIZED) {
          alert(ERROR_MESSAGES.COMMON.UNAUTHORIZED);
        } else if (status === STATUS_CODES.NOT_FOUND) {
          alert(ERROR_MESSAGES.COMMENT.NOT_FOUND);
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    },
  });
};
