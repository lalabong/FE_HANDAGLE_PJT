import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/common/Button';
import DataStateHandler from '@components/common/DataStateHandler';
import Pagination from '@components/common/Pagination';
import PostListSkeleton from '@components/skeleton/PostListSkeleton';

import { API_DEFAULTS } from '@constants/api';
import { PATH } from '@constants/path';

import { usePostsQuery } from '@hooks/queries/usePostsQuery';

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
                          <svg
                            width="23"
                            height="19"
                            viewBox="0 0 23 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="댓글 아이콘"
                          >
                            <g clipPath="url(#clip0_1_6044)">
                              <path
                                d="M7.3071 18.5C7.72951 18.5 8.02262 18.287 8.54848 17.8446L11.5226 15.3293H17.0571C19.6261 15.3293 21.0054 13.9774 21.0054 11.577V5.3011C21.0054 2.90055 19.6261 1.54871 17.0571 1.54871H5.95365C3.38468 1.54871 2.00537 2.89236 2.00537 5.3011V11.577C2.00537 13.9857 3.38468 15.3293 5.95365 15.3293H6.36745V17.4595C6.36745 18.0904 6.70365 18.5 7.3071 18.5ZM7.66055 17.0007V14.6247C7.66055 14.1823 7.47952 14.0102 7.01399 14.0102H5.95365C4.21227 14.0102 3.3933 13.1664 3.3933 11.5687V5.3011C3.3933 3.70346 4.21227 2.86778 5.95365 2.86778H17.0571C18.7899 2.86778 19.6175 3.70346 19.6175 5.3011V11.5687C19.6175 13.1664 18.7899 14.0102 17.0571 14.0102H11.4709C10.9881 14.0102 10.7467 14.0758 10.4192 14.3953L7.66055 17.0007ZM6.0571 9.38937H9.6088C9.88466 9.38937 10.1088 9.17641 10.1088 8.90598C10.1088 8.65206 9.88466 8.43903 9.6088 8.43903H6.0571C5.78123 8.43903 5.5571 8.65206 5.5571 8.90598C5.5571 9.17641 5.78123 9.38937 6.0571 9.38937ZM11.3933 9.38937H16.9709C17.2468 9.38937 17.4623 9.17641 17.4623 8.90598C17.4623 8.65206 17.2468 8.43903 16.9709 8.43903H11.3933C11.1174 8.43903 10.8933 8.65206 10.8933 8.90598C10.8933 9.17641 11.1174 9.38937 11.3933 9.38937ZM6.0571 11.5277H7.52262C7.79848 11.5277 8.014 11.323 8.014 11.0608C8.014 10.7904 7.79848 10.5774 7.52262 10.5774H6.0571C5.78123 10.5774 5.5571 10.7904 5.5571 11.0608C5.5571 11.323 5.78123 11.5277 6.0571 11.5277ZM9.29848 11.5277H13.6175C13.8933 11.5277 14.1174 11.323 14.1174 11.0608C14.1174 10.7904 13.8933 10.5774 13.6175 10.5774H9.29848C9.02262 10.5774 8.8071 10.7904 8.8071 11.0608C8.8071 11.323 9.02262 11.5277 9.29848 11.5277ZM15.4019 11.5277H16.9709C17.2468 11.5277 17.4623 11.323 17.4623 11.0608C17.4623 10.7904 17.2468 10.5774 16.9709 10.5774H15.4019C15.126 10.5774 14.9019 10.7904 14.9019 11.0608C14.9019 11.323 15.126 11.5277 15.4019 11.5277Z"
                                fill="#A7A9B4"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1_6044">
                                <rect
                                  width="19"
                                  height="18"
                                  fill="white"
                                  transform="translate(2.00537 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

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
