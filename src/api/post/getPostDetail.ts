import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { Post } from '@/types/post';

export interface GetPostDetailParams {
  postId: string;
}

// 게시글 상세 조회
export const getPostDetail = async ({ postId }: GetPostDetailParams): Promise<Post> => {
  return api.get<Post>(API_ENDPOINTS.POSTS.DETAIL(postId));
};
