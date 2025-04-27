import { useNavigate } from 'react-router-dom';

import { FAB } from '@components/common/Button';
import DataStateHandler from '@components/common/DataStateHandler';
import { PencilIcon } from '@components/icons';
import MobilePostListSkeleton from '@components/skeleton/post/MobilePostListSkeleton';

import { PATH } from '@constants/path';

import { usePostInfinite } from '@hooks/queries/post/usePostInfinite';
import useInfiniteScroll from '@hooks/useInfiniteScroll';

import { useAuthStore } from '@stores/useAuthStore';

import { cn } from '@lib/cn';

import { Post } from '@/types/post';

import MobilePostListItem from './MobilePostListItem';

const MobilePostList = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    usePostInfinite();

  const { loadMoreRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const handleWriteButtonClick = () => {
    navigate(PATH.CREATE_POST);
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
    <section className="w-full pb-20" aria-labelledby="mobile-post-list-title">
      <div className="flex flex-col gap-8">
        <h2 id="mobile-post-list-title" className="text-xl font-bold text-black">
          게시판
        </h2>

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
              <div className={cn('w-full')}>
                <ul className="space-y-4">
                  {posts.map((post: Post) => (
                    <MobilePostListItem key={post.id} post={post} />
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
      </div>

      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-10">
          <FAB
            variant="purple"
            icon={<PencilIcon />}
            onClick={handleWriteButtonClick}
            aria-label="새 글 작성하기 버튼"
          />
        </div>
      )}
    </section>
  );
};

export default MobilePostList;
