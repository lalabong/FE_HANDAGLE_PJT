import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postComment, PostCommentParams } from '@api/post/comment/postComment';

import { ERROR_MESSAGES, QUERY_KEYS, STATUS_CODES, SUCCESS_MESSAGES } from '@constants/index';

// 댓글 생성
export const useCreateCommentMutation = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: PostCommentParams) => postComment({ postId, content }),

    onSuccess: () => {
      alert(SUCCESS_MESSAGES.COMMENT.CREATE);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS, postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId] });
    },

    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === STATUS_CODES.UNAUTHORIZED) {
          alert(ERROR_MESSAGES.COMMON.UNAUTHORIZED);
        } else if (status === STATUS_CODES.NOT_FOUND) {
          alert(ERROR_MESSAGES.POST.NOT_FOUND);
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    },
  });
};
