import api from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';
import { ERROR_MESSAGES } from '@constants/messages';

export interface LogoutParams {
  refreshToken: string | null;
}

export const postLogout = ({ refreshToken }: LogoutParams): Promise<void> => {
  if (!refreshToken) {
    throw new Error(ERROR_MESSAGES.AUTH.NO_REFRESH_TOKEN);
  }
  return api.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
};
