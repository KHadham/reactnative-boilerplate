import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { useStoreInterface, AppDetails } from './interfaces';

export const useProfileStore = create<useStoreInterface>()(
  persist(
    set => ({
      apps: [],
      setApp: (apps: AppDetails[]) => set({ apps }),
    }),
    {
      name: STORAGE_KEY.HOME_APPS,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
