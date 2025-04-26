import api from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { Tokens } from '@/types/user';

export const postRefreshToken = async (refreshToken: string): Promise<Tokens> => {
  return api.post<Tokens>(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
};
