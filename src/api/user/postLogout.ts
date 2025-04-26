import api from '@api/api';

export const postLogout = (refreshToken: string | null): Promise<void> => {
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }
  return api.post('/api/auth/logout', { refreshToken });
};
