import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { EditPostParams, patchPost } from '@api/post/patchPost';

import { ERROR_MESSAGES, PATH, QUERY_KEYS, STATUS_CODES, SUCCESS_MESSAGES } from '@constants/index';

// 게시글 수정
export const useEditPostMutation = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ postId, payload }: EditPostParams) => patchPost({ postId, payload }),

    onSuccess: (_, variables) => {
      alert(SUCCESS_MESSAGES.POST.UPDATE);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, variables.postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      navigate(`${PATH.DETAIL_POST(variables.postId)}`);
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
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    },
  });
};
