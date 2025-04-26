import { useAuthStore } from '@/store/useAuthStore';
import { useDeviceStore } from '@/store/useDeviceStore';
import { formatDateToYYMMDD } from '@/utils/dateFormat';

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
          <span className="sm:text-[16px] text-[14px] text-[#A7A9B4]">{author}</span>
          <div className="w-[2px] h-[20px] rounded-full bg-[#EEEFF1]" />
          <span className="sm:text-[16px] text-[14px] text-[#A7A9B4]">
            {formatDateToYYMMDD(createdAt)}
          </span>
        </div>

        {isAuthor && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit?.()}
              className="px-3 py-1.5 text-[16px] text-gray-700 border border-[#EEEFF1] rounded-lg hover:bg-gray-50"
            >
              수정
            </button>
            <button
              onClick={() => onDelete?.()}
              className="px-3 py-1.5 text-[16px] text-gray-700 border border-[#EEEFF1] rounded-lg hover:bg-gray-50"
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
