import { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { CommentIcon } from '@components/icons';

import { PATH } from '@constants/path';

import { formatDateToYYMMDD } from '@utils/formatDateToYYMMDD';

import { Post } from '@/types/post';

interface MobilePostListItemProps {
  post: Post;
}

const MobilePostListItem = ({ post }: MobilePostListItemProps) => {
  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    navigate(PATH.DETAIL_POST(postId));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handlePostClick(post.id);
    }
  };

  return (
    <div
      className="flex flex-col gap-3 pb-4 border-b border-[#EEEFF1] cursor-pointer"
      onClick={() => handlePostClick(post.id)}
      role="button"
      tabIndex={0}
      aria-label={`${post.title} 게시글, 작성일: ${formatDateToYYMMDD(post.createdAt)}, 댓글 수: ${post.commentCount}`}
      onKeyDown={handleKeyDown}
    >
      <h3 className="text-base font-semibold text-black break-words">{post.title}</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm text-[#A7A9B4]">{formatDateToYYMMDD(post.createdAt)}</span>
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
          <span className="text-sm text-black truncate max-w-[100px]">글쓴이닉네임</span>
        </div>
      </div>
    </div>
  );
};

export default MobilePostListItem;
