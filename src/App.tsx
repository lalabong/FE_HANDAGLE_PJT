import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import { useDeviceStore } from '@/store/useDeviceStore';
import { useMenuStore } from '@/store/useMenuStore';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userNickname = '임시 닉네임';
  const checkDeviceType = useDeviceStore((state) => state.checkDeviceType);
  const closeAllMenus = useMenuStore((state) => state.closeAllMenus);
  const location = useLocation();

  useEffect(() => {
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, [checkDeviceType]);

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname, closeAllMenus]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다.');
  };

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} userNickname={userNickname} />

      <main className="container mx-auto p-4">
        <button onClick={toggleLogin} className="mb-4 px-4 py-2 bg-gray-200 rounded">
          {isLoggedIn ? '로그아웃 상태로 변경' : '로그인 상태로 변경'} (테스트용)
        </button>

        <Outlet />
      </main>
    </div>
  );
};

export default App;
