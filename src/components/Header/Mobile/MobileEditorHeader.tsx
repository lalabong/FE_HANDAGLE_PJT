import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@components/icons';

import { useDeviceStore } from '@stores/useDeviceStore';

import { cn } from '@lib/cn';

interface MobileEditorHeaderProps {
  isEditMode: boolean;
  handleSubmit: () => void;
}

const MobileEditorHeader = ({ isEditMode, handleSubmit }: MobileEditorHeaderProps) => {
  const navigate = useNavigate();

  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="w-full bg-white">
      <div className={cn('flex justify-between items-center', responsivePaddingClass)}>
        <div className="flex items-center gap-2">
          <button onClick={handleGoBack} aria-label="뒤로 가기" className="p-2 hover:opacity-70">
            <BackIcon />
          </button>
          <h1 className="text-base font-bold">{isEditMode ? '게시글 수정' : '게시글 작성'}</h1>
        </div>

        <button
          onClick={handleSubmit}
          className="font-bold text-base hover:opacity-70 disabled:opacity-50"
        >
          저장
        </button>
      </div>
    </header>
  );
};

export default MobileEditorHeader;
