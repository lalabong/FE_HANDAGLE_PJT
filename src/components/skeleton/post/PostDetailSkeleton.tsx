import Skeleton from '@components/skeleton/Skeleton';

interface PostDetailSkeletonProps {
  count?: number;
}

const PostDetailSkeleton = ({ count = 3 }: PostDetailSkeletonProps) => {
  return (
    <div
      className="w-full overflow-hidden bg-white rounded-xl border border-[#EEEFF1]"
      aria-hidden="true"
    >
      <div className="border-b border-[#EEEFF1] px-6 py-6">
        <Skeleton width="80%" height="36px" className="mb-4" />
        <div className="flex items-center gap-2">
          <Skeleton width="40px" height="40px" circle />
          <div>
            <Skeleton width="120px" height="18px" className="mb-2" />
            <Skeleton width="80px" height="14px" />
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <Skeleton width="90%" height="20px" className="mb-3" />
        <Skeleton width="85%" height="20px" className="mb-3" />
        <Skeleton width="70%" height="20px" className="mb-3" />
        <Skeleton width="80%" height="20px" className="mb-3" />
        <Skeleton width="65%" height="20px" className="mb-3" />
        <Skeleton width="40%" height="20px" />
      </div>

      <div className="border-t border-[#EEEFF1] px-6 py-4">
        <Skeleton width="120px" height="20px" className="mb-4" />

        {Array(count)
          .fill(0)
          .map((_, index) => (
            <div key={`comment-skeleton-${index}`} className="border-b border-[#EEEFF1] pb-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton width="36px" height="36px" circle />
                <Skeleton width="80px" height="16px" />
                <Skeleton width="60px" height="14px" />
              </div>
              <Skeleton width="90%" height="16px" className="mb-2" />
              <Skeleton width="70%" height="16px" />
            </div>
          ))}

        <div className="py-4">
          <Skeleton width="100%" height="100px" />
          <div className="flex justify-end mt-2">
            <Skeleton width="80px" height="36px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
