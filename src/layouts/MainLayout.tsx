import {
  Header,
  MobileDetailHeader,
  MobileEditorHeader,
  MobileMainHeader,
} from '@/components/Header';
import { PATH } from '@/constants/path';

import { useDeviceStore } from '@/store/useDeviceStore';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const { isMobile } = useDeviceStore();
  const location = useLocation();

  const isEditorPage = location.pathname === PATH.CREATE_POST;
  const isDetailPage = location.pathname.includes('/post/') && !isEditorPage;

  const renderMobileHeader = () => {
    if (isDetailPage) {
      return <MobileDetailHeader />;
    } else if (isEditorPage) {
      return <MobileEditorHeader />;
    } else {
      return <MobileMainHeader />;
    }
  };

  return (
    <div className="min-h-screen">
      {isMobile ? renderMobileHeader() : <Header />}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
