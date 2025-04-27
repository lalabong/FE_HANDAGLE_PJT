import { CommentIcon } from '@components/icons';

import { useDeviceStore } from '@stores/useDeviceStore';

import { cn } from '@lib/cn';

interface PostDetailContentProps {
  content: string;
  commentCount: number;
}

const PostDetailContent = ({ content, commentCount }: PostDetailContentProps) => {
  const isMobile = useDeviceStore((state) => state.isMobile);
  return (
    <div
      className={cn(
        'flex flex-col h-[261px]',
        isMobile ? 'p-4' : 'p-6',
        'border-b border-[#EEEFF1] bg-white',
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <p className="text-base text-[#474953] whitespace-pre-wrap">{content}</p>

        <div className="flex items-center gap-2">
          <CommentIcon color="#474953" />

          <span className="text-base text-[#474953]">{commentCount}개</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetailContent;
