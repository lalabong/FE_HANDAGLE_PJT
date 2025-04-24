import api from '@/api/api';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const postRefreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  return api.post<RefreshTokenResponse>('/api/auth/refresh', { refreshToken });
};
