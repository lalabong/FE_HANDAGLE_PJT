import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { patchPost } from '@api/post/patchPost';

import { QUERY_KEYS } from '@constants/api';
import { PATH } from '@constants/path';

interface EditPostParams {
  postId: string;
  title: string;
  content: string;
}

// 게시글 수정
export const useEditPostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ postId, title, content }: EditPostParams) => patchPost(postId, title, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, variables.postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      navigate(`${PATH.DETAIL_POST(variables.postId)}`);
    },
  });
};
