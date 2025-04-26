import { deleteComment } from '@/api/post/comment/deleteComment';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteCommentParams {
  postId: string;
  commentId: string;
}

// 댓글 삭제
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentParams) => deleteComment(postId, commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS, variables.postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, variables.postId] });
    },
  });
};
