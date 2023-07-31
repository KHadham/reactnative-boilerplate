import { create } from 'zustand';
interface LoadingState {
  state1: 'auth' |  string;
  setState1: (isLoading: string) => void;
}
export const useGlobalLoading = create<LoadingState>(set => ({
  state1: '',
  setState1: (state1: any) => set({ state1 }),
}));
