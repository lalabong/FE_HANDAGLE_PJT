import { create } from 'zustand';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceStore {
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  responsivePaddingClass: string;
  checkDeviceType: () => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  deviceType: 'desktop',
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  responsivePaddingClass: 'px-[120px] py-6',

  checkDeviceType: () => {
    const width = window.innerWidth;

    if (width <= 641) {
      set({
        deviceType: 'mobile',
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        responsivePaddingClass: 'px-4 py-4',
      });
    } else if (width <= 1024) {
      set({
        deviceType: 'tablet',
        isMobile: false,
        isTablet: true,
        isDesktop: false,
        responsivePaddingClass: 'px-[30px] py-6',
      });
    } else {
      set({
        deviceType: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        responsivePaddingClass: 'px-[120px] py-6',
      });
    }
  },
}));
