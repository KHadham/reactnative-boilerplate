// import create from 'zustand';

// const useAuthStore = create((set) => ({
//   isLoading: false,
//   setIsLoading: (value) => set({ isLoading: value }),
// }));

// const useStore = create((set) => ({
//   count: 1,
//   inc: () => set((state) => ({ count: state.count + 1 })),
// }))

// const useBearStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))
// export default useAuthStore;

import { create } from 'zustand'

const useGlobalLoading = create((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}))