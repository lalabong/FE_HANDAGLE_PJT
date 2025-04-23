import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, value, onChange, type = 'text', name, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="w-full">
          <input
            ref={ref}
            className={`w-full py-3 px-4 text-base font-normal leading-6 tracking-[-0.3%] border ${
              error ? 'border-[#D11111] border-2' : 'border-[#EEEFF1]'
            } rounded-lg focus:outline-none focus:ring-1 focus:ring-[#000000]`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            name={name}
            {...props}
          />
        </div>
        {error && (
          <p className="px-2 text-[14px] font-semibold leading-5 tracking-[-0.3%] text-[#D11111]">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
