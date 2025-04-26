import { api } from '@api/api';

// 댓글 수정
export const patchComment = async (postId: string, commentId: string, content: string) => {
  return api.patch(`/api/posts/${postId}/comments/${commentId}`, { content });
};
