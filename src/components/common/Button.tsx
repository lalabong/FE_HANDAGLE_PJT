import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center w-auto whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        black:
          'bg-[#000000] hover:bg-[#474953] active:bg-[#5E616E] text-white disabled:bg-[#D6D7DC] disabled:text-[#A7A9B4]',
        purple:
          'bg-[#6025E1] hover:bg-[#5522C3] active:bg-[#320397] text-white disabled:bg-[#D6D7DC] disabled:text-[#A7A9B4]',
      },
      size: {
        // 큰 버튼 (200x59)
        lg: 'h-[59px] w-[200px] text-lg font-semibold rounded-xl py-4 px-6',
        // 중간 버튼 (89x52)
        md: 'h-[52px] w-[89px] text-base font-bold py-3.5 px-6 rounded-lg',
        // 작은 버튼 (84x48)
        sm: 'h-[48px] w-[84px] text-base font-bold py-3 px-6 rounded-lg',
        // 플로팅 액션 버튼 (FAB)
        fab: 'h-[56px] w-[56px] rounded-full p-4 shadow-md',
      },
    },
    defaultVariants: {
      variant: 'black',
      size: 'md',
    },
  },
);

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

// 플로팅 액션 버튼 (FAB)
export const FAB = forwardRef<
  HTMLButtonElement,
  Omit<CustomButtonProps, 'size'> & { icon: React.ReactNode }
>(({ className, variant, icon, ...props }, ref) => {
  return (
    <Button
      className={cn('flex items-center justify-center', className)}
      variant={variant}
      size="fab"
      ref={ref}
      {...props}
    >
      {icon}
    </Button>
  );
});

FAB.displayName = 'FAB';

export { Button };
