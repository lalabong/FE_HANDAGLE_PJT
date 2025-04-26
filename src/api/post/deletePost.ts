import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

// 게시글 삭제
export const deletePost = async (postId: string): Promise<void> => {
  return api.delete<void>(API_ENDPOINTS.POSTS.DETAIL(postId));
};
