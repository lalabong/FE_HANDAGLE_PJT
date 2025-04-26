import { PATH } from '@/constants/path';
import { useAuthStore } from '@/stores/useAuthStore';
import { useDeviceStore } from '@/stores/useDeviceStore';
import { useMenuStore } from '@/stores/useMenuStore';
import { Link } from 'react-router-dom';

const MobileMainHeader = () => {
  const { responsivePaddingClass } = useDeviceStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMenuStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      closeMobileMenu();
    } catch (error: any) {
      if (error) {
        if (error.status === 401) {
          alert('인증되지 않은 사용자입니다.');
        } else {
          alert('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
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

          {isAuthenticated && (
            <div className="flex items-center border-b border-[#EEEFF1] pb-6 mb-6 gap-2">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="프로필 사진"
                  className="h-8 w-8 rounded-full flex-shrink-0 object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-sm"></span>
                </div>
              )}
              <span className="font-bold">{user?.nickname || '익명'}</span>
            </div>
          )}

          <div className="flex flex-col space-y-6">
            {!isAuthenticated ? (
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
