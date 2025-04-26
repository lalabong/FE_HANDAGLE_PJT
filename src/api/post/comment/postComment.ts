import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { CommentUser } from '@/types/comment';

export interface PostCommentParams {
  postId: string;
  content: string;
}

export interface PostCommentResponse {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
}

// 댓글 작성
export const postComment = async ({
  postId,
  content,
}: PostCommentParams): Promise<PostCommentResponse> => {
  return api.post<PostCommentResponse>(API_ENDPOINTS.POSTS.COMMENTS.BASE(postId), { content });
};
