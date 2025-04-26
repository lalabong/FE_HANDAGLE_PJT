import Skeleton from '@components/skeleton/Skeleton';

interface MobilePostListSkeletonProps {
  count?: number;
}

const MobilePostListSkeleton = ({ count = 5 }: MobilePostListSkeletonProps) => {
  return (
    <div className="w-full" aria-hidden="true">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={`mobile-post-skeleton-${index}`} className="py-4 border-b border-[#EEEFF1]">
            <div className="flex justify-between items-center mb-2">
              <Skeleton width="70%" height="20px" />
              <Skeleton width="60px" height="14px" />
            </div>
            <div className="flex items-center mt-3 gap-2">
              <Skeleton width="20px" height="20px" circle />
              <Skeleton width="60px" height="14px" />
              <div className="mx-1 w-[1px] h-[10px] bg-gray-200"></div>
              <div className="flex items-center gap-1">
                <Skeleton width="14px" height="14px" />
                <Skeleton width="16px" height="14px" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MobilePostListSkeleton;
