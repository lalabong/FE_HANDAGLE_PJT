import { PATH } from '@/constants/path';
import { useAuthStore } from '@/store/useAuthStore';
import { useDeviceStore } from '@/store/useDeviceStore';
import { useMenuStore } from '@/store/useMenuStore';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { responsivePaddingClass } = useDeviceStore();
  const { isNicknamePopoverOpen, toggleNicknamePopover, closeNicknamePopover } = useMenuStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const location = useLocation();
  const isHomePage = location.pathname === PATH.ROOT;

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeNicknamePopover();
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
    <header className="w-full bg-white h-[var(--header-height)] border-b border-[#EEEFF1] shadow-[0px_9px_10px_0px_rgba(232,232,232,0.25)]">
      <div className={`flex justify-between items-center h-full ${responsivePaddingClass}`}>
        <Link to={PATH.ROOT} onClick={handleLogoClick} className="flex items-center">
          <img src="/logo.png" alt="다글제작소 로고" className="h-9" />
        </Link>

        {isAuthenticated ? (
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
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt="프로필 사진"
                        className="h-8 w-8 rounded-full flex-shrink-0 object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 font-semibold text-sm">
                          {user?.nickname?.charAt(0).toUpperCase() || '?'}
                        </span>
                      </div>
                    )}
                    <div className="text-md text-gray-700 font-semibold">{user?.nickname} 님</div>
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
          <Link to={PATH.LOGIN} className="text-lg font-semibold">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
