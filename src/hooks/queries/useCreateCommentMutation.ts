import { postComment } from '@/api/post/comment/postComment';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 댓글 생성
export const useCreateCommentMutation = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS, postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId] });
    },
  });
};
