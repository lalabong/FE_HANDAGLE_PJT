import { useNavigate } from 'react-router-dom';

import DataStateHandler from '@components/common/DataStateHandler';
import MobilePostListSkeleton from '@components/skeleton/post/MobilePostListSkeleton';

import { PATH } from '@constants/path';

import { usePostInfinite } from '@hooks/queries/post/usePostInfinite';
import useInfiniteScroll from '@hooks/useInfiniteScroll';

import { cn } from '@lib/cn';

import { Post } from '@/types/post';

import MobilePostItem from './MobilePostItem';

interface MobilePostListProps {
  className?: string;
  isArchived?: boolean;
}

const MobilePostList = ({ className, isArchived = false }: MobilePostListProps) => {
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    usePostInfinite(isArchived);

  const { loadMoreRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const handlePostClick = (postId: string) => {
    navigate(PATH.DETAIL_POST(postId));
  };

  const mobilePostListLoadingComponent = (
    <div aria-live="polite" aria-busy="true">
      <MobilePostListSkeleton />
    </div>
  );

  const mobilePostListErrorComponent = (
    <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
      <p className="font-bold text-destructive">게시글을 불러오는데 실패했습니다.</p>
    </div>
  );

  return (
    <DataStateHandler
      data={data}
      isLoading={isLoading}
      error={error}
      loadingComponent={mobilePostListLoadingComponent}
      errorComponent={mobilePostListErrorComponent}
      className="h-[calc(100vh-10rem)]"
    >
      {(postsData) => {
        const posts = postsData.pages.flatMap((page) => page.content) || [];

        if (posts.length === 0) {
          return (
            <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
              <p className="font-bold">게시글이 없습니다.</p>
            </div>
          );
        }

        return (
          <div className={cn('w-full', className)}>
            <ul className="space-y-4">
              {posts.map((post: Post) => (
                <MobilePostItem key={post.id} post={post} onClick={handlePostClick} />
              ))}
            </ul>

            <div ref={loadMoreRef} className="mt-4 flex w-full justify-center">
              {isFetchingNextPage ? (
                <div aria-live="polite" aria-busy="true" className="w-full">
                  <MobilePostListSkeleton count={2} />
                </div>
              ) : !hasNextPage ? (
                <p className="text-gray-500 py-4">모든 게시글을 불러왔습니다</p>
              ) : null}
            </div>
          </div>
        );
      }}
    </DataStateHandler>
  );
};

export default MobilePostList;
