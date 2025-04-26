import api from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

export interface LogoutParams {
  refreshToken: string | null;
}

export const postLogout = ({ refreshToken }: LogoutParams): Promise<void> => {
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }
  return api.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
};
