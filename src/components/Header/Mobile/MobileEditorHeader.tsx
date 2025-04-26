import { useDeviceStore } from '@/store/useDeviceStore';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MobileEditorHeader = () => {
  const navigate = useNavigate();
  const { responsivePaddingClass } = useDeviceStore();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const isEditMode = Boolean(postId);

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleSubmit = () => {
    // 저장 혹은 수정 로직
  };

  return (
    <header className="w-full bg-white">
      <div className={`flex justify-between items-center ${responsivePaddingClass}`}>
        <div className="flex items-center gap-2">
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
          <h1 className="text-base font-bold">{isEditMode ? '게시글 수정' : '게시글 작성'}</h1>
        </div>

        <button
          onClick={() => handleSubmit()}
          className="font-bold text-base hover:opacity-70 disabled:opacity-50"
        >
          저장
        </button>
      </div>
    </header>
  );
};

export default MobileEditorHeader;
