import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import {
  personalData,
  useProfileStoreInterface,
  basicData,
  employeeData,
  unexpectedData,
} from './interfaces';

const filtering = <T extends object>(
  data: T,
): T => {
  return Object.keys(data).reduce((result, key) => {
    if (key in unexpectedData) {
      return result;
    }
    return { ...result, [key]: data[key] };
  }, {} as T);
};

export const useProfileStore = create<useProfileStoreInterface>()(
  persist(
    set => ({
      user: null,
      personal: null,
      employee: null,
      setUserDetail: (user: basicData) => set({ user }),
      setEmployeeDetail: (employee: employeeData) =>
        set({ employee: filtering<employeeData>(employee) })
      ,
      setPersonalDetail: (personal: personalData) =>
        set({ personal: filtering<personalData>(personal) }),
    }),
    {
      name: STORAGE_KEY.PROFIL_DETAIL,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
