import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Header,
  MobileMainHeader,
  MobileDetailHeader,
  MobileEditorHeader,
} from '@/components/Header';
import { useDeviceStore } from '@/store/useDeviceStore';
import { PATH } from '@/constants/path';

const MainLayout = () => {
  // 전역 상태 관리로 변경 예정(3)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState('멋진무지개');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isMobile } = useDeviceStore();
  const location = useLocation();

  // 현재 경로 타입 확인
  const isEditorPage = location.pathname === PATH.CREATE_POST;
  const isDetailPage = location.pathname.includes('/post/') && !isEditorPage;

  // 모바일에서 헤더 렌더링
  const renderMobileHeader = () => {
    if (isDetailPage) {
      return <MobileDetailHeader />;
    } else if (isEditorPage) {
      return <MobileEditorHeader isSubmitting={isSubmitting} />;
    } else {
      return <MobileMainHeader isLoggedIn={isLoggedIn} userNickname={userNickname} />;
    }
  };

  return (
    <div className="min-h-screen">
      {isMobile ? (
        renderMobileHeader()
      ) : (
        <Header isLoggedIn={isLoggedIn} userNickname={userNickname} />
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
