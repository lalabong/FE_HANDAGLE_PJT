import { patchComment } from '@/api/post/comment/patchComment';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS, variables.postId] });
    },
  });
};
