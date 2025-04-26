import Header from '@/components/header/Header';
import MobileDetailHeader from '@/components/header/mobile/MobileDetailHeader';
import MobileMainHeader from '@/components/header/mobile/MobileMainHeader';
import { useDeviceStore } from '@/stores/useDeviceStore';
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
