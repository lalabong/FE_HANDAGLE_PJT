import { api } from '@/api/api';
import { PostDetail } from '@/types/user';

// 게시글 작성
export const postPost = async (title: string, content: string): Promise<PostDetail> => {
  return api.post<PostDetail>('/api/posts', { title, content });
};
