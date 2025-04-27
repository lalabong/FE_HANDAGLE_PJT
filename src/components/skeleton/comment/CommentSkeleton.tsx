import Skeleton from '@components/skeleton/Skeleton';

interface CommentSkeletonProps {
  count?: number;
}

const CommentSkeleton = ({ count = 3 }: CommentSkeletonProps) => {
  return (
    <div className="w-full" aria-hidden="true">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={`comment-skeleton-${index}`}
            className="flex flex-col gap-4 p-6 bg-[#F9FAFA] border-b border-[#EEEFF1]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton width={24} height={24} circle />
                <Skeleton width={80} height={20} />
              </div>
            </div>

            <Skeleton width="100%" height={60} />

            <div className="flex justify-between items-center">
              <Skeleton width={70} height={16} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentSkeleton;
