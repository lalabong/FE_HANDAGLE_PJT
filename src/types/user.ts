export interface User {
  id: string;
  loginId: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface CommentUser {
  id: string;
  nickname: string;
}

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
