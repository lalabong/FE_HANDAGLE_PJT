import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { deletePost } from '@api/post/deletePost';

import { ERROR_MESSAGES, PATH, QUERY_KEYS, STATUS_CODES, SUCCESS_MESSAGES } from '@constants/index';

// 게시글 삭제
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (postId: string) => deletePost({ postId }),

    onSuccess: () => {
      alert(SUCCESS_MESSAGES.POST.DELETE);
      navigate(PATH.ROOT);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },

    onError: (error: any) => {
      if (error.status) {
        const status = error.status;
        if (status === STATUS_CODES.BAD_REQUEST) {
          alert(ERROR_MESSAGES.COMMON.REQUIRED_FIELD);
        } else if (status === STATUS_CODES.UNAUTHORIZED) {
          alert(ERROR_MESSAGES.COMMON.UNAUTHORIZED);
        } else if (status === STATUS_CODES.NOT_FOUND) {
          alert(ERROR_MESSAGES.POST.NOT_FOUND);
        } else {
          alert(ERROR_MESSAGES.POST.DELETE_ERROR);
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    },
  });
};
