import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

export interface EditCommentParams {
  postId: string;
  commentId: string;
  content: string;
}

// 댓글 수정
export const patchComment = async ({
  postId,
  commentId,
  content,
}: EditCommentParams): Promise<void> => {
  return api.patch<void>(API_ENDPOINTS.POSTS.COMMENTS.DETAIL(postId, commentId), { content });
};
