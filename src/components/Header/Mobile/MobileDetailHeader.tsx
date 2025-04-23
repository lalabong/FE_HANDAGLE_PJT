import { useNavigate } from 'react-router-dom';
import { useDeviceStore } from '@/store/useDeviceStore';

const MobileDetailHeader = () => {
  const navigate = useNavigate();
  const { responsivePaddingClass } = useDeviceStore();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="w-full bg-white">
      <div className={`flex items-center gap-3 ${responsivePaddingClass}`}>
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
      </div>
    </header>
  );
};

export default MobileDetailHeader;
