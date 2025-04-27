import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from 'react';

import { cn } from '@lib/cn';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  error?: string;
  maxLength?: number;
  showCharCount?: boolean;
  height?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      placeholder,
      value = '',
      onChange,
      name,
      error,
      height = 'h-[290px]',
      maxLength = 300,
      showCharCount = true,
      ...props
    },
    ref,
  ) => {
    const charCount = value?.length || 0;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="w-full flex flex-col gap-2">
        <div className="w-full relative">
          <textarea
            ref={ref}
            className={cn(
              'w-full py-4 px-4 text-base font-normal leading-6 tracking-[-0.3%] border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#000000]',
              height,
              error ? 'border-[#D11111] border-2' : 'border-[#EEEFF1]',
            )}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            name={name}
            maxLength={maxLength}
            {...props}
          />
          {showCharCount && (
            <div className="absolute bottom-4 right-4">
              <span className="text-xs text-[#5E616E]">
                {charCount}/{maxLength}
              </span>
            </div>
          )}
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

TextArea.displayName = 'TextArea';

export default TextArea;
