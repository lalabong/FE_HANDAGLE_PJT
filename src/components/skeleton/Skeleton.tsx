import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
  animate?: boolean;
  circle?: boolean;
}

const Skeleton = ({
  className = '',
  width,
  height,
  animate = true,
  circle = false,
  ...props
}: SkeletonProps) => {
  const baseStyle = 'bg-gray-200 relative overflow-hidden';
  const animationStyle = animate
    ? 'after:absolute after:inset-0 after:animate-pulse after:bg-gradient-to-r after:from-transparent after:via-gray-100 after:to-transparent'
    : '';
  const shapeStyle = circle ? 'rounded-full' : 'rounded';

  return (
    <div
      className={`${baseStyle} ${animationStyle} ${shapeStyle} ${className}`}
      style={{
        width: width,
        height: height,
      }}
      aria-hidden="true"
      role="presentation"
      {...props}
    />
  );
};

export default Skeleton;
