import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { Tokens, User } from '@/types/user';

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export const postLogin = async (loginId: string, password: string): Promise<LoginResponse> => {
  return api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, { loginId, password });
};
