import { api } from '@/api/api';
import { User } from '@/types/user';

export interface PostDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  viewCount: number;
  commentCount: number;
  isAuthor: boolean;
  content: string;
  author: User;
}

// 게시글 상세 조회
export const getPostDetail = async (postId: string): Promise<PostDetail> => {
  return api.get<PostDetail>(`/api/posts/${postId}`);
};
