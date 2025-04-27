import { create } from 'zustand';

interface DeviceStore {
  isMobile: boolean;
  responsivePaddingClass: string;
  checkDeviceType: () => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  isMobile: false,
  responsivePaddingClass: 'px-[120px] py-6',

  checkDeviceType: () => {
    const width = window.innerWidth;

    if (width <= 641) {
      set({
        isMobile: true,
        responsivePaddingClass: 'px-4 py-4',
      });
    } else if (width <= 1024) {
      set({
        isMobile: false,
        responsivePaddingClass: 'px-[30px] py-6',
      });
    } else {
      set({
        isMobile: false,
        responsivePaddingClass: 'px-[120px] py-6',
      });
    }
  },
}));
