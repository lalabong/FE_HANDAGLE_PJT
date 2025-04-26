import { useMutation } from '@tanstack/react-query';

import { postLogout } from '@api/user/postLogout';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@constants/messages';
import { STATUS_CODES } from '@constants/statusCodes';

import { useAuthStore } from '@stores/useAuthStore';

// 로그아웃
export const useLogoutMutation = () => {
  const { clearAuth } = useAuthStore.getState();
  const { tokens } = useAuthStore.getState();

  return useMutation({
    mutationFn: () => postLogout({ refreshToken: tokens?.refreshToken || null }),

    onSuccess: () => {
      clearAuth();
      alert(SUCCESS_MESSAGES.LOGOUT);
    },

    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === STATUS_CODES.UNAUTHORIZED) {
          alert(ERROR_MESSAGES.COMMON.UNAUTHORIZED);
          clearAuth();
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    },
  });
};
