import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postPost } from '@api/post/postPost';

import { ERROR_MESSAGES, PATH, QUERY_KEYS, STATUS_CODES, SUCCESS_MESSAGES } from '@constants/index';

// 게시글 작성
export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: { title: string; content: string }) => postPost(payload),

    onSuccess: (data) => {
      alert(SUCCESS_MESSAGES.POST.CREATE);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      navigate(`${PATH.DETAIL_POST(data.id)}`);
    },

    onError: (error: any) => {
      if (error.status) {
        const status = error.status;
        if (status === STATUS_CODES.BAD_REQUEST) {
          alert(ERROR_MESSAGES.COMMON.REQUIRED_FIELD);
        } else if (status === STATUS_CODES.UNAUTHORIZED) {
          alert(ERROR_MESSAGES.COMMON.UNAUTHORIZED);
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    },
  });
};
