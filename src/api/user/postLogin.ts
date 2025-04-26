import { api } from '@api/api';

import { Tokens, User } from '@/types/user';

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export const postLogin = async (loginId: string, password: string): Promise<LoginResponse> => {
  return api.post<LoginResponse>('/api/auth/login', { loginId, password });
};
