import { api } from '@api/api';

import { CommentUser } from '@/types/user';

export interface PostCommentResponse {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: CommentUser;
}

// 댓글 생성
export const postComment = async (postId: string, content: string): Promise<PostCommentResponse> => {
  return api.post<PostCommentResponse>(`/api/posts/${postId}/comments`, { content });
};
