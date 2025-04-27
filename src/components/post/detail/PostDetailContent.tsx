import { CommentIcon } from '@components/icons';

interface PostDetailContentProps {
  content: string;
  commentCount: number;
}

const PostDetailContent = ({ content, commentCount }: PostDetailContentProps) => {
  return (
    <div className="flex flex-col h-[261px] py-6 px-6 border-b border-[#EEEFF1] bg-white">
      <div className="flex flex-col justify-between h-full">
        <p className="text-base text-[#474953] whitespace-pre-wrap">{content}</p>

        <div className="flex items-center gap-2">
          <CommentIcon />

          <span className="text-base text-[#474953]">{commentCount}개</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetailContent;
