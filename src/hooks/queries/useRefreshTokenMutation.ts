import { useMutation } from '@tanstack/react-query';

import { postRefreshToken } from '@api/user/postRefreshToken';

import { ERROR_MESSAGES } from '@constants/messages';

import { useAuthStore } from '@stores/useAuthStore';

// 토큰 갱신
export const useRefreshTokenMutation = () => {
  const { setTokens, tokens } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!tokens?.refreshToken) {
        throw new Error(ERROR_MESSAGES.AUTH.NO_REFRESH_TOKEN);
      }
      return postRefreshToken({ refreshToken: tokens.refreshToken });
    },

    onSuccess: (newTokens) => {
      setTokens(newTokens);
    },
  });
};
