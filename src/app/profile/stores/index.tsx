import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import {
  personalData,
  useProfileStoreInterface,
  basicData,
  employeeData,
} from './types';

export const useProfileStore = create<useProfileStoreInterface>()(
  persist(
    set => ({
      user: null,
      setUserDetail: (user: basicData) => set({ user }),
      personal: null,
      setPersonalDetail: (personal: personalData) => set({ personal }),
      employee: null,
      setEmployeeDetail: (employee: employeeData) => set({ employee }),
    }),
    {
      name: STORAGE_KEY.PROFIL_DETAIL,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
