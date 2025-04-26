import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/common/Button';
import Pagination from '@components/common/Pagination';

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

  const posts = data?.items || [];
  const totalPages = data?.meta?.totalPages || 0;

  const handleWriteButtonClick = () => {
    navigate(PATH.CREATE_AND_EDIT_POST());
  };

  const handlePostClick = (postId: string) => {
    navigate(PATH.DETAIL_POST(postId));
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <section className="w-full max-w-[1200px] mx-auto">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm">
        <header className="flex justify-between items-center px-6 py-6 border-b border-[#EEEFF1]">
          <h2 className="text-2xl font-bold leading-9 text-black">게시판</h2>
          {isAuthenticated && (
            <Button variant="purple" size="sm" onClick={handleWriteButtonClick}>
              글쓰기
            </Button>
          )}
        </header>

        {isPending ? (
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
          <ul className="divide-y divide-[#EEEFF1] relative">
            {isFetching && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                <p className="text-gray-500">업데이트 중...</p>
              </div>
            )}
            {posts.map((post: Post) => (
              <li
                key={post.id}
                className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => handlePostClick(post.id)}
              >
                <h3 className="text-lg font-normal flex-1 truncate">{post.title}</h3>
                <div className="flex items-center gap-2 text-[#A7A9B4]">
                  <time dateTime={post.createdAt} className="text-base">
                    {formatDateToYYMMDD(post.createdAt)}
                  </time>
                  <div className="flex items-center gap-1">
                    <img src="/icon/comment-icon.png" alt="댓글 아이콘" />
                    <span>{post.commentCount}</span>
                  </div>
                  <div className="h-6 w-6 rounded-full flex-shrink-0 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 font-semibold text-sm"></span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!isPending && !error && posts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </article>
    </section>
  );
};
export default PostList;
