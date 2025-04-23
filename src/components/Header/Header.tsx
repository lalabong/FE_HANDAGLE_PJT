import { Link, useLocation } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useDeviceStore } from '@/store/useDeviceStore';
import { useMenuStore } from '@/store/useMenuStore';

export interface HeaderProps {
  isLoggedIn?: boolean;
  userNickname?: string;
  onLogout?: () => void;
}

const Header = ({ isLoggedIn = false, onLogout, userNickname = '사용자' }: HeaderProps) => {
  const { isMobile, responsivePaddingClass } = useDeviceStore();

  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    isNicknamePopoverOpen,
    toggleNicknamePopover,
    closeNicknamePopover,
  } = useMenuStore();

  const location = useLocation();
  const isHomePage = location.pathname === PATH.ROOT;

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      closeMobileMenu();
      closeNicknamePopover();
    }
  };

  return (
    <>
      <header className="w-full bg-white border-b border-[#EEEFF1] shadow-[0px_9px_10px_0px_rgba(232,232,232,0.25)]">
        <div className={`flex justify-between items-center ${responsivePaddingClass}`}>
          {isMobile ? (
            <button
              aria-label="메뉴 열기"
              onClick={toggleMobileMenu}
              className="w-8 h-8 flex items-center justify-center"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          ) : (
            <Link to={PATH.ROOT} onClick={handleLogoClick} className="flex items-center">
              <img src="/logo.png" alt="다글제작소 로고" className="h-9" />
            </Link>
          )}

          {isLoggedIn && !isMobile ? (
            <div className="relative">
              <button
                aria-label="사용자 메뉴"
                onClick={toggleNicknamePopover}
                className="w-8 h-8 flex items-center justify-center"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {isNicknamePopoverOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-center px-6 py-4 gap-3 border-b border-[#EEEFF1]">
                      <img
                        src={'carousel/printi-bg.png'}
                        alt="프로필 사진"
                        className="h-8 w-8 rounded-full flex-shrink-0"
                      />
                      <div className="text-md text-gray-700 font-semibold">{userNickname} 님</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-left px-6 py-4 hover:bg-gray-50 w-full text-gray-700"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            !isLoggedIn &&
            !isMobile && (
              <Link to={PATH.LOGIN} className="text-lg font-semibold">
                로그인
              </Link>
            )
          )}
        </div>
      </header>

      {isMobile && (
        <>
          <div
            className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeMobileMenu}
          ></div>

          <div
            className={`fixed top-0 left-0 w-[280px] h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-end mb-6">
                <button aria-label="메뉴 닫기" onClick={closeMobileMenu} className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#A7A9B4"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {isLoggedIn && (
                <div className="flex items-center border-b border-[#EEEFF1] pb-6 mb-6 gap-2">
                  <img
                    src={'carousel/printi-bg.png'}
                    alt="프로필 사진"
                    className="h-8 w-8 rounded-full flex-shrink-0"
                  />
                  <span className="font-bold">{userNickname}</span>
                </div>
              )}

              <div className="flex flex-col space-y-6">
                {!isLoggedIn ? (
                  <Link to={PATH.LOGIN} onClick={closeMobileMenu}>
                    로그인
                  </Link>
                ) : (
                  <>
                    <Link to={PATH.ROOT} onClick={closeMobileMenu}>
                      커뮤니티
                    </Link>
                    <button onClick={handleLogout} className="text-left">
                      로그아웃
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
