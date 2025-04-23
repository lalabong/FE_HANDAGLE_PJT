import { useNavigate } from 'react-router-dom';
import { useDeviceStore } from '@/store/useDeviceStore';

interface MobileEditorHeaderProps {
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

const MobileEditorHeader = ({ onSubmit, isSubmitting = false }: MobileEditorHeaderProps) => {
  const navigate = useNavigate();
  const { responsivePaddingClass } = useDeviceStore();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="w-full bg-white border-b border-[#EEEFF1] shadow-[0px_9px_10px_0px_rgba(232,232,232,0.25)]">
      <div className={`flex justify-between items-center ${responsivePaddingClass}`}>
        <div className="flex items-center gap-4">
          <button
            onClick={handleGoBack}
            aria-label="뒤로 가기"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-base font-bold">게시글 작성</h1>
        </div>

        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="font-bold text-base hover:opacity-70 disabled:opacity-50"
        >
          저장
        </button>
      </div>
    </header>
  );
};

export default MobileEditorHeader;
