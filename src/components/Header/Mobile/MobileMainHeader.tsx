import { Link } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useDeviceStore } from '@/store/useDeviceStore';
import { useMenuStore } from '@/store/useMenuStore';

interface MobileMainHeaderProps {
  isLoggedIn?: boolean;
  userNickname?: string;
}

const MobileMainHeader = ({
  isLoggedIn = false,
  userNickname = '사용자',
}: MobileMainHeaderProps) => {
  const { responsivePaddingClass } = useDeviceStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMenuStore();

  // 로그아웃 핸들러
  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
    closeMobileMenu();
  };

  return (
    <>
      <header className="w-full bg-white">
        <div className={`flex justify-between items-center ${responsivePaddingClass}`}>
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
        </div>
      </header>

      {/* 모바일 사이드메뉴 */}
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
  );
};

export default MobileMainHeader;
