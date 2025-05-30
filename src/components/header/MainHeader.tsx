import { Link, useLocation } from 'react-router-dom';

import { ProfileIcon } from '@components/icons';

import { PATH } from '@constants/index';

import { useLogoutMutation } from '@hooks/queries/user/useLogoutMutation';

import { useAuthStore } from '@stores/useAuthStore';
import { useDeviceStore } from '@stores/useDeviceStore';
import { useMenuStore } from '@stores/useMenuStore';

import { cn } from '@lib/cn';

const MainHeader = () => {
  const responsivePaddingClass = useDeviceStore((state) => state.responsivePaddingClass);

  const isNicknamePopoverOpen = useMenuStore((state) => state.isNicknamePopoverOpen);
  const toggleNicknamePopover = useMenuStore((state) => state.toggleNicknamePopover);
  const closeNicknamePopover = useMenuStore((state) => state.closeNicknamePopover);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const location = useLocation();
  const isHomePage = location.pathname === PATH.ROOT;

  const logoutMutation = useLogoutMutation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        closeNicknamePopover();
      },
    });
  };

  return (
    <header className="w-full bg-white h-[var(--header-height)] border-b border-[#EEEFF1] shadow-[0px_9px_10px_0px_rgba(232,232,232,0.25)]">
      <div className={cn('flex justify-between items-center h-full', responsivePaddingClass)}>
        <Link to={PATH.ROOT} onClick={handleLogoClick} className="flex items-center">
          <img src="/logo/logo.png" alt="다글제작소 로고" className="h-9" />
        </Link>

        {isAuthenticated ? (
          <div className="relative">
            <button
              aria-label="사용자 메뉴"
              onClick={toggleNicknamePopover}
              className="w-8 h-8 flex items-center justify-center"
            >
              <ProfileIcon />
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
                      <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-300 flex items-center justify-center"></div>
                    )}

                    <div className="text-md text-gray-700 font-semibold">
                      {user?.nickname || '익명'} 님
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="text-left px-6 py-4 hover:bg-gray-50 w-full text-gray-700"
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
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

export default MainHeader;
