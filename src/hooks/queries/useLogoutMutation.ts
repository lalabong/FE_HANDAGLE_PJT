import { useMutation } from '@tanstack/react-query';

import { postLogout } from '@api/user/postLogout';

import { useAuthStore } from '@stores/useAuthStore';

// 로그아웃
export const useLogoutMutation = () => {
  const { clearAuth, tokens } = useAuthStore();

  return useMutation({
    mutationFn: () => postLogout(tokens?.refreshToken || null),
    onSuccess: () => {
      clearAuth();
      alert('로그아웃 되었습니다.');
    },
    onError: (error: any) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          alert('인증되지 않은 사용자입니다.');
          clearAuth();
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });
};
