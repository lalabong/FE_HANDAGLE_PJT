import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@components/icons';

import { useDeviceStore } from '@stores/useDeviceStore';

import { cn } from '@lib/cn';

const MobileDetailHeader = () => {
  const navigate = useNavigate();

  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="w-full bg-white">
      <div className={cn('flex items-center gap-3', responsivePaddingClass)}>
        <button onClick={handleGoBack} aria-label="뒤로 가기" className="p-2 hover:opacity-70">
          <BackIcon />
        </button>
      </div>
    </header>
  );
};

export default MobileDetailHeader;
