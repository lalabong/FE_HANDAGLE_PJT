import { api } from '@/api/api';
import { Tokens, User } from '@/types/user';

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export const postLogin = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  return api.post<LoginResponse>('/api/auth/login', loginRequest);
};
