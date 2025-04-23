import { create } from 'zustand';

interface MenuStore {
  // 모바일 메뉴(햄버거) 상태
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  // 닉네임 팝오버 상태
  isNicknamePopoverOpen: boolean;
  openNicknamePopover: () => void;
  closeNicknamePopover: () => void;
  toggleNicknamePopover: () => void;

  // 모든 메뉴 닫기
  closeAllMenus: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  isNicknamePopoverOpen: false,
  openNicknamePopover: () => set({ isNicknamePopoverOpen: true }),
  closeNicknamePopover: () => set({ isNicknamePopoverOpen: false }),
  toggleNicknamePopover: () =>
    set((state) => ({ isNicknamePopoverOpen: !state.isNicknamePopoverOpen })),

  closeAllMenus: () => set({ isMobileMenuOpen: false, isNicknamePopoverOpen: false }),
}));
