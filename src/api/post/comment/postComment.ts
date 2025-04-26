import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { CommentUser } from '@/types/user';

export interface CommentResponse {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
}

// 댓글 작성
export const postComment = async (postId: string, content: string): Promise<CommentResponse> => {
  return api.post<CommentResponse>(API_ENDPOINTS.POSTS.COMMENTS.BASE(postId), { content });
};
