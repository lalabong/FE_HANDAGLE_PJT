import { KeyboardEvent } from 'react';

import { CommentIcon } from '@components/icons';

import { formatDateToYYMMDD } from '@utils/formatDateToYYMMDD';

import { Post } from '@/types/post';

interface PostItemProps {
  post: Post;
  onClick: (postId: string) => void;
}

const PostItem = ({ post, onClick }: PostItemProps) => {
  const handleClick = () => onClick(post.id);

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick(post.id);
    }
  };

  return (
    <li
      className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`제목: ${post.title}, 작성일: ${formatDateToYYMMDD(post.createdAt)}, 댓글 수: ${post.commentCount}개`}
      onKeyDown={handleKeyDown}
    >
      <h3 className="text-lg font-normal flex-1 truncate">{post.title}</h3>
      <div className="flex items-center gap-2 text-[#A7A9B4]">
        <time dateTime={post.createdAt} className="text-base inline-block text-center">
          {formatDateToYYMMDD(post.createdAt)}
        </time>
        <div className="flex items-center gap-1" aria-label={`댓글 ${post.commentCount}개`}>
          <CommentIcon />
          <span className="w-[15px] inline-block text-center">{post.commentCount}</span>
        </div>
        <div
          className="h-6 w-6 rounded-full flex-shrink-0 bg-gray-300 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-gray-500 font-semibold text-sm"></span>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
