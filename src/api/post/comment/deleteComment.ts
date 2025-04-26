import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

export interface DeleteCommentParams {
  postId: string;
  commentId: string;
}

// 댓글 삭제
export const deleteComment = async ({ postId, commentId }: DeleteCommentParams): Promise<void> => {
  return api.delete<void>(API_ENDPOINTS.POSTS.COMMENTS.DETAIL(postId, commentId));
};
