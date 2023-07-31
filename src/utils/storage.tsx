import { StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const mmkvStorage = new MMKV();

export const storage: StateStorage = {
  setItem: (name, value) => {
    return mmkvStorage.set(name, value);
  },
  getItem: name => {
    const value = mmkvStorage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return mmkvStorage.delete(name);
  },
};
