import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/common/Button';
import DataStateHandler from '@components/common/DataStateHandler';
import Pagination from '@components/common/Pagination';
import PostItem from '@components/post/PostItem';
import PostListSkeleton from '@components/skeleton/post/PostListSkeleton';

import { API_DEFAULTS } from '@constants/api';
import { PATH } from '@constants/path';

import { usePostsQuery } from '@hooks/queries/post/usePostsQuery';

import { useAuthStore } from '@stores/useAuthStore';

import { Post } from '@/types/post';

const PostList = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const limit = API_DEFAULTS.POSTS.LIMIT;
  const { data, isPending, error, refetch, isFetching } = usePostsQuery({
    page: currentPage,
    limit,
  });

  const handleWriteButtonClick = () => {
    navigate(PATH.CREATE_AND_EDIT_POST());
  };

  const handlePostClick = (postId: string) => {
    navigate(PATH.DETAIL_POST(postId));
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const postListLoadingComponent = (
    <div className="py-6" aria-label="로딩 중" aria-live="polite">
      <PostListSkeleton count={10} />
    </div>
  );

  const postListErrorComponent = (
    <div className="py-12 text-center">
      <p className="text-red-500" aria-live="assertive">
        게시글을 불러오는 중 오류가 발생했습니다.
      </p>
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
    <section className="w-full max-w-[1200px] mx-auto">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm">
        <header className="flex justify-between items-center px-6 py-6 border-b border-[#EEEFF1]">
          <h2 className="text-2xl font-bold leading-9 text-black">게시판</h2>
          {isAuthenticated && (
            <Button
              variant="purple"
              size="sm"
              onClick={handleWriteButtonClick}
              aria-label="게시글 작성하기"
            >
              글쓰기
            </Button>
          )}
        </header>

        <DataStateHandler
          data={data}
          isLoading={isPending}
          error={error}
          loadingComponent={postListLoadingComponent}
          errorComponent={postListErrorComponent}
        >
          {(postsData) => {
            const posts = postsData.items || [];
            const totalPages = postsData.meta?.totalPages || 0;

            if (posts.length === 0) {
              return (
                <div className="py-12 text-center">
                  <p className="text-gray-500">게시글이 없습니다.</p>
                </div>
              );
            }

            return (
              <>
                <ul className="divide-y divide-[#EEEFF1] relative">
                  {isFetching ? (
                    <PostListSkeleton count={API_DEFAULTS.POSTS.LIMIT} />
                  ) : (
                    posts.map((post: Post) => (
                      <PostItem key={post.id} post={post} onClick={handlePostClick} />
                    ))
                  )}
                </ul>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            );
          }}
        </DataStateHandler>
      </article>
    </section>
  );
};

export default PostList;
