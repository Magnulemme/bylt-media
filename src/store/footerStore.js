import { create } from 'zustand';

export const useFooterStore = create((set) => ({
    scrollProgress: 0,
    footerHeight: 0,
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setFooterHeight: (height) => set({ footerHeight: height }),
}));
