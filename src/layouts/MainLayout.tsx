import { Header, MobileDetailHeader, MobileMainHeader } from '@/components/Header';

import { useDeviceStore } from '@/store/useDeviceStore';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const { isMobile } = useDeviceStore();
  const location = useLocation();

  const isEditorPage = location.pathname.includes('create');
  const isDetailPage = location.pathname.includes('post');

  const renderMobileHeader = () => {
    if (isEditorPage) {
      return null;
    } else if (isDetailPage) {
      return <MobileDetailHeader />;
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
