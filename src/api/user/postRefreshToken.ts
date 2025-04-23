import { api } from '../api';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const postRefreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  return api.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
};
