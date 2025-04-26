import { api } from '@api/api';

import { API_ENDPOINTS } from '@constants/endpoints';

import { Tokens, User } from '@/types/user';

export interface LoginParams {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export const postLogin = async ({ loginId, password }: LoginParams): Promise<LoginResponse> => {
  return api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, { loginId, password });
};
