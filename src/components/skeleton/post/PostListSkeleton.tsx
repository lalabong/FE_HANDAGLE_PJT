import Skeleton from '@components/skeleton/Skeleton';

interface PostListSkeletonProps {
  count?: number;
}

const PostListSkeleton = ({ count = 5 }: PostListSkeletonProps) => {
  return (
    <div className="w-full">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={`post-skeleton-${index}`}
            className="px-6 py-4 flex justify-between items-center border-b border-[#EEEFF1]"
            aria-hidden="true"
          >
            <Skeleton width="70%" height="24px" className="mb-1" />
            <div className="flex items-center gap-3">
              <Skeleton width="60px" height="16px" />
              <div className="flex items-center gap-1">
                <Skeleton width="16px" height="16px" />
                <Skeleton width="20px" height="16px" />
              </div>
              <Skeleton width="24px" height="24px" circle />
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostListSkeleton;
