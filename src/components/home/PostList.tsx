import { Button } from '@/components/common/Button';
import Pagination from '@/components/common/Pagination';
import { PATH } from '@/constants/path';
import { useAuthStore } from '@/store/useAuthStore';
import { formatDateToYYMMDD } from '@/utils/dateFormat';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyPosts = Array(8)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title:
      '제목이 들어갑니다. 제목이 들어갑니다. 제목이 들어갑니다. 제목이 들어갑니다. 제목이 들어갑니다. 제목이 들어갑니다.',
    createdAt: '2025-04-24T07:47:36.713Z',
    commentCount: 0,
    isAuthor: true,
  }));

const PostList = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 데이터 호출 후 받아오는 값(임시)

  const handleWriteButtonClick = () => {
    navigate(PATH.CREATE_POST);
  };

  const handlePostClick = (postId: number) => {
    navigate(PATH.DETAIL_POST(postId.toString()));
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // 데이터 호출 로직 추가
  }, []);

  return (
    <section className="w-full max-w-[1200px] mx-auto">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm">
        <header className="flex justify-between items-center px-6 py-6 border-b border-[#EEEFF1]">
          <h2 className="text-2xl font-bold leading-9 text-black">게시판</h2>
          {isAuthenticated && (
            <Button variant="purple" size="sm" onClick={() => handleWriteButtonClick()}>
              글쓰기
            </Button>
          )}
        </header>

        <ul className="divide-y divide-[#EEEFF1]">
          {dummyPosts.map((post) => (
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
                <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-sm">?</span>
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
      </article>
    </section>
  );
};
export default PostList;
