import { api } from '@/api/api';
import { PostDetail } from '@/types/user';

// 게시글 수정
export const patchPost = async (
  postId: string,
  title: string,
  content: string,
): Promise<PostDetail> => {
  return api.patch<PostDetail>(`/api/posts/${postId}`, { title, content });
};
