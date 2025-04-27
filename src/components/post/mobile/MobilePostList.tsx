import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { FAB } from '@components/common/Button';
import DataStateHandler from '@components/common/DataStateHandler';
import { CommentIcon, PencilIcon } from '@components/icons';
import MobilePostListSkeleton from '@components/skeleton/MobilePostListSkeleton';

import { getPosts } from '@api/post/getPosts';

import { API_DEFAULTS, QUERY_KEYS } from '@constants/api';
import { PATH } from '@constants/path';

import { useAuthStore } from '@stores/useAuthStore';

import { formatDateToYYMMDD } from '@utils/formatDateToYYMMDD';

import { Post } from '@/types/post';

const MobilePostList = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const limit = API_DEFAULTS.POSTS.LIMIT;

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POSTS, { limit }],
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }, // 10%이상 보일 때 실행
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handlePostClick = (postId: string) => {
    navigate(PATH.DETAIL_POST(postId));
  };

  const handleWriteButtonClick = () => {
    navigate(PATH.CREATE_AND_EDIT_POST());
  };

  const mobilePostListLoadingComponent = (
    <div aria-live="polite" aria-busy="true">
      <MobilePostListSkeleton />
    </div>
  );

  const mobilePostListErrorComponent = (
    <div className="py-12 text-center" aria-live="assertive">
      <p className="text-red-500">게시글을 불러오는 중 오류가 발생했습니다.</p>
      <button
        className="mt-4 text-purple-600 hover:underline"
        onClick={() => refetch()}
        aria-label="게시글 다시 불러오기"
      >
        다시 시도하기
      </button>
    </div>
  );

  return (
    <section className="w-full px-4 pb-20" aria-labelledby="mobile-post-list-title">
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
        >
          {(postsData) => {
            // 모든 페이지의 posts를 하나의 배열로 합치기
            const posts = postsData.pages.flatMap((page) => page.items) || [];

            if (posts.length === 0) {
              return (
                <div className="py-12 text-center" aria-live="polite">
                  <p className="text-gray-500">게시글이 없습니다.</p>
                </div>
              );
            }

            return (
              <div className="flex flex-col gap-4 relative" aria-label="게시글 목록">
                {isFetching && !isFetchingNextPage && (
                  <div
                    className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center"
                    aria-live="polite"
                  >
                    <p className="text-gray-500">업데이트 중...</p>
                  </div>
                )}
                {posts.map((post: Post) => (
                  <div
                    key={post.id}
                    className="flex flex-col gap-3 pb-4 border-b border-[#EEEFF1] cursor-pointer"
                    onClick={() => handlePostClick(post.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${post.title} 게시글, 작성일: ${formatDateToYYMMDD(post.createdAt)}, 댓글 수: ${post.commentCount}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handlePostClick(post.id);
                      }
                    }}
                  >
                    <h3 className="text-base font-semibold text-black break-words">{post.title}</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm text-[#A7A9B4]">
                          {formatDateToYYMMDD(post.createdAt)}
                        </span>
                        <div className="flex items-center gap-1">
                          <CommentIcon size={20} />
                          <span className="text-sm text-[#A7A9B4]">{post.commentCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div
                          className="h-6 w-6 rounded-full bg-[#D6D7DC] flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          <span className="text-sm text-black"></span>
                        </div>
                        <span className="text-sm text-black truncate max-w-[100px]">
                          글쓴이닉네임
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div ref={loadMoreRef} className="py-4 text-center" aria-live="polite">
                  {isFetchingNextPage ? (
                    <p className="text-gray-500">게시글을 불러오는 중...</p>
                  ) : posts.length > 0 ? (
                    <p className="text-gray-500">모든 게시글을 불러왔습니다</p>
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
