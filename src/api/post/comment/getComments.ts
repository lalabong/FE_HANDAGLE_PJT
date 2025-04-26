import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { CommentUser } from '@/types/user';

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
}

// 댓글 목록 조회
export const getComments = async (postId: string): Promise<Comment[]> => {
  return api.get<Comment[]>(API_ENDPOINTS.POSTS.COMMENTS.BASE(postId));
};
