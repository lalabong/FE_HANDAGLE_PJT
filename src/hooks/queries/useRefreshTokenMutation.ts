import { useMutation } from '@tanstack/react-query';

import { postRefreshToken } from '@api/user/postRefreshToken';

import { useAuthStore } from '@stores/useAuthStore';

// 토큰 갱신
export const useRefreshTokenMutation = () => {
  const { setTokens, tokens } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!tokens?.refreshToken) {
        throw new Error('리프레시 토큰이 없습니다.');
      }
      return postRefreshToken({ refreshToken: tokens.refreshToken });
    },
    onSuccess: (newTokens) => {
      setTokens(newTokens);
    },
  });
};
