import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

export interface EditPostPayload {
  title: string;
  content: string;
}

export interface EditPostParams {
  postId: string;
  payload: EditPostPayload;
}

// 게시글 수정
export const patchPost = async ({ postId, payload }: EditPostParams): Promise<void> => {
  return api.patch<void>(API_ENDPOINTS.POSTS.DETAIL(postId), payload);
};
