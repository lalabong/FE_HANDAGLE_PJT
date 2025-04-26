import { useAuthStore } from '@/store/useAuthStore';
import { formatDateToYYMMDD } from '@/utils/dateFormat';

interface CommentItemProps {
  author: string;
  authorId: string;
  content: string;
  createdAt: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CommentItem = ({
  author,
  authorId,
  content,
  createdAt,
  onEdit,
  onDelete,
}: CommentItemProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const isAuthor = currentUser?.id === authorId;
  return (
    <div className="flex flex-col gap-4 p-6 bg-[#F9FAFA] border-b border-[#EEEFF1]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#A7A9B4] flex items-center justify-center">
            <span className="text-black text-sm"></span>
          </div>
          <span className="text-base font-normal text-black">{author || '익명'}</span>
        </div>

        {isAuthor && (
          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="text-[16px] text-[#A7A9B4] rounded-lg hover:bg-gray-50"
            >
              수정
            </button>
            <button
              onClick={onDelete}
              className="text-[16px] text-[#A7A9B4] rounded-lg hover:bg-gray-50"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <p className="text-base text-[#474953] whitespace-pre-wrap">{content}</p>

      <span className="text-sm text-[#A7A9B4]">{formatDateToYYMMDD(createdAt)}</span>
    </div>
  );
};

export default CommentItem;
