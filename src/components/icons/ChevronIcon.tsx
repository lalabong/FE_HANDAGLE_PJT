import { SVGProps } from 'react';

interface ChevronIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

const ChevronIcon = ({
  size = 16,
  color = '#A7A9B4',
  strokeWidth = 1.5,
  direction = 'left',
  className,
  ...props
}: ChevronIconProps) => {
  // 방향에 따른 회전 값 계산
  const getRotation = () => {
    switch (direction) {
      case 'right':
        return 'rotate(180deg)';
      case 'up':
        return 'rotate(90deg)';
      case 'down':
        return 'rotate(270deg)';
      case 'left':
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getRotation() }}
      className={className}
      {...props}
    >
      <path
        d="M10 12L6 8L10 4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronIcon;
