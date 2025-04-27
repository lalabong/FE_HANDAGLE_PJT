import { ChangeEvent } from 'react';

import { Button } from '@components/common/Button';
import TextArea from '@components/common/TextArea';

import { useAuthStore } from '@stores/useAuthStore';

import { formatDateToYYMMDD } from '@utils/formatDateToYYMMDD';

interface CommentItemProps {
  author: string;
  authorId: string;
  content: string;
  createdAt: string;
  isEditing?: boolean;
  editContent?: string;
  onEditStart?: () => void;
  onEditCancel?: () => void;
  onEditSubmit?: () => void;
  onEditChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onDelete?: () => void;
}

const CommentItem = ({
  author,
  authorId,
  content,
  createdAt,
  isEditing = false,
  editContent = '',
  onEditStart,
  onEditCancel,
  onEditSubmit,
  onEditChange,
  onDelete,
}: CommentItemProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const isAuthor = currentUser?.id === authorId;

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-[#F9FAFA] border-b border-[#EEEFF1]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#A7A9B4] flex items-center justify-center"></div>
            <span className="text-base font-normal text-black">{author || '익명'}</span>
          </div>
        </div>

        <TextArea
          value={editContent}
          onChange={onEditChange}
          placeholder="댓글을 수정해주세요"
          height="h-[100px]"
        />

        <div className="flex justify-end gap-2">
          <Button variant="black" size="sm" onClick={onEditCancel}>
            취소
          </Button>
          <Button
            variant="purple"
            size="sm"
            onClick={onEditSubmit}
            disabled={editContent === content}
          >
            저장
          </Button>
        </div>
      </div>
    );
  }

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
            <button onClick={onEditStart} className="text-[16px] text-[#A7A9B4] hover:opacity-70">
              수정
            </button>
            <button onClick={onDelete} className="text-[16px] text-[#A7A9B4] hover:opacity-70">
              삭제
            </button>
          </div>
        )}
      </div>

      <p className="text-base text-[#474953] whitespace-pre-wrap break-words">{content}</p>

      <span className="text-sm text-[#A7A9B4]">{formatDateToYYMMDD(createdAt)}</span>
    </div>
  );
};

export default CommentItem;
