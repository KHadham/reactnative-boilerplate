import { create } from 'zustand';
interface InterFacex {
    beranda: number
    setBeranda: (beranda: number) => void;
}
export const useTabCount = create<InterFacex>(set => ({
    beranda: 0,
    setBeranda: (beranda: any) => set({ beranda }),
}));
