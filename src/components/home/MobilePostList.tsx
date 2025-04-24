import { getPosts, Post } from '@/api/home/getPosts';
import { FAB } from '@/components/common/Button';
import { API_DEFAULTS, QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/constants/path';
import { useAuthStore } from '@/store/useAuthStore';
import { formatDateToYYMMDD } from '@/utils/dateFormat';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
    queryKey: [QUERY_KEYS.POSTS, { limit }],
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

  // 모든 페이지의 posts를 하나의 배열로 합치기
  const posts = data?.pages.flatMap((page) => page.items) || [];

  const handlePostClick = (postId: string) => {
    navigate(PATH.DETAIL_POST(postId));
  };

  const handleWriteButtonClick = () => {
    navigate(PATH.CREATE_POST);
  };

  const pencilIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 5L19 9M21.1739 6.81189C21.7026 6.28332 21.9997 5.56636 21.9998 4.81875C21.9999 4.07113 21.703 3.3541 21.1744 2.82539C20.6459 2.29668 19.9289 1.99961 19.1813 1.99951C18.4337 1.99942 17.7166 2.29632 17.1879 2.82489L3.84193 16.1739C3.60975 16.4054 3.43805 16.6904 3.34193 17.0039L2.02093 21.3559C1.99509 21.4424 1.99314 21.5342 2.01529 21.6217C2.03743 21.7092 2.08285 21.7891 2.14673 21.8529C2.21061 21.9167 2.29055 21.962 2.37809 21.984C2.46563 22.006 2.55749 22.0039 2.64393 21.9779L6.99693 20.6579C7.3101 20.5626 7.59511 20.392 7.82693 20.1609L21.1739 6.81189Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  return (
    <section className="w-full px-4 pb-20">
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold text-black">게시판</h2>

        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">게시글을 불러오는 중입니다...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-red-500">게시글을 불러오는 중 오류가 발생했습니다.</p>
            <button className="mt-4 text-purple-600 hover:underline" onClick={() => refetch()}>
              다시 시도하기
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">게시글이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 relative">
            {isFetching && !isFetchingNextPage && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                <p className="text-gray-500">업데이트 중...</p>
              </div>
            )}
            {posts.map((post: Post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 pb-4 border-b border-[#EEEFF1] cursor-pointer"
                onClick={() => handlePostClick(post.id)}
              >
                <h3 className="text-base font-semibold text-black break-words">{post.title}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm text-[#A7A9B4]">
                      {formatDateToYYMMDD(post.createdAt)}
                    </span>
                    <div className="flex items-center gap-1">
                      <img src="/icon/comment-icon.png" alt="댓글 아이콘" className="w-4 h-4" />
                      <span className="text-sm text-[#A7A9B4]">{post.commentCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-[#D6D7DC] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm text-black">?</span>
                    </div>
                    <span className="text-sm text-black truncate max-w-[100px]">글쓴이닉네임</span>
                  </div>
                </div>
              </div>
            ))}

            <div ref={loadMoreRef} className="py-4 text-center">
              {isFetchingNextPage ? (
                <p className="text-gray-500">게시글을 불러오는 중...</p>
              ) : posts.length > 0 ? (
                <p className="text-gray-500">모든 게시글을 불러왔습니다</p>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-10">
          <FAB
            variant="purple"
            icon={pencilIcon}
            onClick={() => handleWriteButtonClick()}
            aria-label="새 글 작성하기 버튼"
          />
        </div>
      )}
    </section>
  );
};

export default MobilePostList;
