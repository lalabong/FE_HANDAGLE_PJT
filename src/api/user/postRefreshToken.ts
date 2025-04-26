import api from '@api/api';

import { Tokens } from '@types/user';

export const postRefreshToken = async (refreshToken: string): Promise<Tokens> => {
  return api.post<Tokens>('/api/auth/refresh', { refreshToken });
};
