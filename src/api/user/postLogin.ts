import { api } from '@/api/api';
import { User } from '@/store/useAuthStore';

export interface LoginResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export const postLogin = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  return api.post<LoginResponse>('/auth/login', loginRequest);
};
