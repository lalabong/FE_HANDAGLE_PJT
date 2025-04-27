import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/common/Button';
import DataStateHandler from '@components/common/DataStateHandler';
import Pagination from '@components/common/Pagination';
import { CommentIcon } from '@components/icons';
import PostListSkeleton from '@components/skeleton/post/PostListSkeleton';

import { API_DEFAULTS } from '@constants/api';
import { PATH } from '@constants/path';

import { usePostsQuery } from '@hooks/queries/post/usePostsQuery';

import { useAuthStore } from '@stores/useAuthStore';

import { formatDateToYYMMDD } from '@utils/formatDateToYYMMDD';

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
                  {isFetching && (
                    <div
                      className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center"
                      aria-live="polite"
                    >
                      <p className="text-gray-500">업데이트 중...</p>
                    </div>
                  )}
                  {posts.map((post: Post) => (
                    <li
                      key={post.id}
                      className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                      onClick={() => handlePostClick(post.id)}
                      role="button"
                      tabIndex={0}
                      aria-label={`제목: ${post.title}, 작성일: ${formatDateToYYMMDD(post.createdAt)}, 댓글 수: ${post.commentCount}개`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handlePostClick(post.id);
                        }
                      }}
                    >
                      <h3 className="text-lg font-normal flex-1 truncate">{post.title}</h3>
                      <div className="flex items-center gap-2 text-[#A7A9B4]">
                        <time dateTime={post.createdAt} className="text-base">
                          {formatDateToYYMMDD(post.createdAt)}
                        </time>
                        <div
                          className="flex items-center gap-1"
                          aria-label={`댓글 ${post.commentCount}개`}
                        >
                          <CommentIcon />

                          <span>{post.commentCount}</span>
                        </div>
                        <div
                          className="h-6 w-6 rounded-full flex-shrink-0 bg-gray-300 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <span className="text-gray-500 font-semibold text-sm"></span>
                        </div>
                      </div>
                    </li>
                  ))}
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
