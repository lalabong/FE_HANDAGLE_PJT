import { useMutation } from '@tanstack/react-query';

import { LoginParams, LoginResponse, postLogin } from '@api/user/postLogin';

import { ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES } from '@constants/index';

import { useAuthStore } from '@stores/useAuthStore';

// 로그인
export const useLoginMutation = () => {
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: LoginParams) => postLogin(credentials),

    onSuccess: (data: LoginResponse) => {
      setUser(data.user);
      setTokens(data.tokens);
      alert(SUCCESS_MESSAGES.LOGIN);
    },

    onError: (error: any) => {
      if (error.status) {
        const status = error.status;
        if (status === STATUS_CODES.BAD_REQUEST) {
          alert(ERROR_MESSAGES.COMMON.REQUIRED_FIELD);
        } else if (status === STATUS_CODES.UNAUTHORIZED) {
          alert(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        } else if (status === STATUS_CODES.NOT_FOUND) {
          alert(ERROR_MESSAGES.AUTH.NO_USER);
        }
      } else {
        alert(ERROR_MESSAGES.COMMON.NETWORK);
      }
    },
  });
};
