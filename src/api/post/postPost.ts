import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

interface CreatePostPayload {
  title: string;
  content: string;
}

// 게시글 작성
export const postPost = async (payload: CreatePostPayload): Promise<{ id: string }> => {
  return api.post<{ id: string }>(API_ENDPOINTS.POSTS.BASE, payload);
};
