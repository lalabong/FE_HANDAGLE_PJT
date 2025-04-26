import { api } from '@/api/api';

// 게시글 삭제
export const deletePost = async (postId: string) => {
  return api.delete(`/api/posts/${postId}`);
};
