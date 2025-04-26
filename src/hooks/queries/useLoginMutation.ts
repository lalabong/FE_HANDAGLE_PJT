import { useMutation } from '@tanstack/react-query';

import { LoginResponse, postLogin } from '@api/user/postLogin';

import { useAuthStore } from '@stores/useAuthStore';

interface LoginCredentials {
  loginId: string;
  password: string;
}

// 로그인
export const useLoginMutation = () => {
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: ({ loginId, password }: LoginCredentials) => postLogin(loginId, password),
    onSuccess: (data: LoginResponse) => {
      setUser(data.user);
      setTokens(data.tokens);
      alert('로그인이 완료되었습니다.');
    },
    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          alert('아이디 또는 비밀번호가 입력되지 않았습니다.');
        } else if (status === 401) {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        } else if (status === 404) {
          alert('존재하지 않는 아이디입니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });
};
