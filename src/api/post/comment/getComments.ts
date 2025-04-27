import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { Comment } from '@/types/comment';

export interface GetCommentsParams {
  postId: string;
}

// 댓글 목록 조회
export const getComments = async ({ postId }: GetCommentsParams): Promise<Comment[]> => {
  return api.get<Comment[]>(API_ENDPOINTS.POSTS.COMMENTS.BASE(postId));
};
