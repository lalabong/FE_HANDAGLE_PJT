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
