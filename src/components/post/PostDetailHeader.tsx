import { useAuthStore } from '@stores/useAuthStore';
import { useDeviceStore } from '@stores/useDeviceStore';

import { formatDateToYYMMDD } from '@utils/formatDateToYYMMDD';

interface PostDetailHeaderProps {
  title: string;
  author: string;
  authorId: string;
  createdAt: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PostDetailHeader = ({
  title,
  author,
  authorId,
  createdAt,
  onEdit,
  onDelete,
}: PostDetailHeaderProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const isAuthor = currentUser?.id === authorId;
  const isMobile = useDeviceStore((state) => state.isMobile);

  return (
    <div
      className={`flex flex-col gap-4 py-4 ${isMobile ? 'px-4' : 'px-6'} border-b border-[#EEEFF1]`}
    >
      <h1 className={`${isMobile ? 'text-[18px]' : 'text-2xl'} font-bold text-[#212124]`}>
        {title}
      </h1>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="sm:text-[16px] text-[14px] text-[#A7A9B4]">{author || '익명'}</span>
          <div className="w-[2px] h-[20px] rounded-full bg-[#EEEFF1]" />
          <span className="sm:text-[16px] text-[14px] text-[#A7A9B4]">
            {formatDateToYYMMDD(createdAt)}
          </span>
        </div>

        {isAuthor && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onEdit?.()}
              className="text-[16px] text-gray-700 hover:opacity-70"
            >
              수정
            </button>
            <button
              onClick={() => onDelete?.()}
              className="text-[16px] text-gray-700 hover:opacity-70"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailHeader;
