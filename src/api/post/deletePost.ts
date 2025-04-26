import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

export interface DeletePostParams {
  postId: string;
}

// 게시글 삭제
export const deletePost = async ({ postId }: DeletePostParams): Promise<void> => {
  return api.delete<void>(API_ENDPOINTS.POSTS.DETAIL(postId));
};
