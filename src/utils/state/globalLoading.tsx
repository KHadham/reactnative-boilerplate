import { create } from 'zustand';
interface LoadingState {
  isLoading: 'auth' |  string;
  setLoading: (isLoading: string) => void;
}
export const useGlobalLoading = create<LoadingState>(set => ({
  isLoading: '',
  setLoading: (isLoading: any) => set({ isLoading }),
}));
