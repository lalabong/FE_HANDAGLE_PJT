import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

// 댓글 삭제
export const deleteComment = async (postId: string, commentId: string): Promise<void> => {
  return api.delete<void>(API_ENDPOINTS.POSTS.COMMENTS.DETAIL(postId, commentId));
};
