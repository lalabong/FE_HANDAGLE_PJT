import { api } from '@api/api';

import { PostDetail } from '@/types/user';

// 게시글 상세 조회
export const getPostDetail = async (postId: string): Promise<PostDetail> => {
  return api.get<PostDetail>(`/api/posts/${postId}`);
};
