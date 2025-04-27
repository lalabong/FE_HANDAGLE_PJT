import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@components/common/Button';
import Input from '@components/common/Input';

import { useLoginMutation } from '@hooks/queries/user/useLoginMutation';

import { useDeviceStore } from '@stores/useDeviceStore';

import { cn } from '@lib/cn';

interface LoginFormState {
  loginId: string;
  password: string;
}

interface LoginFormErrors {
  loginId?: string;
  password?: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useDeviceStore();

  const [formData, setFormData] = useState<LoginFormState>({
    loginId: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const loginMutation = useLoginMutation();

  const getRedirectPath = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('redirect') || '/';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: LoginFormState) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      validateField(name, value);
    }
  };

  // 실시간 유효성 검사
  const validateField = (name: string, value: string) => {
    setFormErrors((prev: LoginFormErrors) => {
      const newErrors = { ...prev };

      if (name === 'loginId') {
        if (!value.trim()) {
          newErrors.loginId = '아이디를 입력해주세요.';
        } else {
          delete newErrors.loginId;
        }
      }

      if (name === 'password') {
        if (!value.trim()) {
          newErrors.password = '비밀번호를 입력해주세요.';
        } else {
          delete newErrors.password;
        }
      }

      return newErrors;
    });
  };

  // 로그인 버튼 클릭 시 유효성 검사
  const validateForm = (): boolean => {
    const errors: LoginFormErrors = {};
    let isValid = true;

    if (!formData.loginId.trim()) {
      errors.loginId = '아이디를 입력해주세요.';
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      loginMutation.mutate(
        { loginId: formData.loginId, password: formData.password },
        {
          onSuccess: () => {
            navigate(getRedirectPath());
          },
        },
      );
    }
  };

  return (
    <main
      className={cn(
        'flex min-h-[calc(100vh-var(--header-height,0px))] w-full',
        isMobile ? 'flex-col bg-white' : 'justify-center items-center bg-[#F5F5F5]',
      )}
    >
      <section
        className={cn(
          'flex flex-col gap-6',
          isMobile
            ? 'px-4 pt-6 pb-12'
            : 'p-10 justify-center items-center bg-white border border-[#EEEFF1] rounded-xl shadow-[0px_18px_30px_0px_rgba(177,177,177,0.06)] max-w-md w-full',
        )}
        aria-labelledby="login-heading"
      >
        <header className={cn(isMobile ? '' : 'w-full')}>
          <h1 id="login-heading" className="text-[32px] font-bold leading-[1.6em] tracking-[-1.5%]">
            안녕하세요
            <br />
            <span className="text-[#320397]">한다글다글</span>입니다.
          </h1>
          <p className="text-base font-semibold leading-6 text-[#A7A9B4] tracking-[-0.3%]">
            로그인을 통해 더 많은 기능을 이용하세요
          </p>
        </header>

        <form onSubmit={handleSubmit} className="w-full space-y-6" aria-label="로그인 양식">
          <div className="flex flex-col gap-3">
            <div>
              <Input
                name="loginId"
                value={formData.loginId}
                onChange={handleChange}
                placeholder="아이디를 입력해주세요."
                error={formErrors.loginId}
                aria-label="아이디"
                aria-required="true"
                aria-invalid={!!formErrors.loginId}
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해주세요."
                error={formErrors.password}
                aria-label="비밀번호"
                aria-required="true"
                aria-invalid={!!formErrors.password}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="black"
            className="w-full rounded-xl"
            disabled={loginMutation.isPending}
            aria-busy={loginMutation.isPending}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
