import { api } from '@api/api';

// 댓글 삭제
export const deleteComment = async (postId: string, commentId: string) => {
  return api.delete(`/api/posts/${postId}/comments/${commentId}`);
};
