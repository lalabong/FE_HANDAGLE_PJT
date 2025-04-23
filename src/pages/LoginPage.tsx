import { Button } from '@/components/common/Button';
import { useState } from 'react';
import Input from '../components/common/Input';

interface FormState {
  loginId: string;
  password: string;
}

interface FormErrors {
  loginId?: string;
  password?: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormState>({
    loginId: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string) => {
    setFormErrors((prev) => {
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

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      // 로그인 로직 구현
      console.log('로그인 시도:', formData);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-var(--header-height,0px))] w-full bg-[#F5F5F5]">
      <div className="flex flex-col justify-center items-center p-10 gap-4 bg-white border border-[#EEEFF1] rounded-xl shadow-[0px_18px_30px_0px_rgba(177,177,177,0.06)] max-w-md w-full">
        <div className="w-full">
          <h1 className="text-[32px] font-bold leading-[1.6em] tracking-[-1.5%]">
            안녕하세요
            <br />
            <span className="text-[#320397]">한다글다글</span>입니다.
          </h1>
          <p className="text-base font-semibold leading-6 text-[#A7A9B4] tracking-[-0.3%]">
            로그인을 통해 더 많은 기능을 이용하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex flex-col gap-3">
            <div>
              <Input
                name="loginId"
                value={formData.loginId}
                onChange={handleChange}
                placeholder="아이디를 입력해주세요."
                error={formErrors.loginId}
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
              />
            </div>
          </div>

          <Button type="submit" variant="black" className="w-full rounded-xl">
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
