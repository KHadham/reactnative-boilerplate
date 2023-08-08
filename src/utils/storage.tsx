import { StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

export const storage: StateStorage = {
  setItem: (name, value) => {
    const serializedValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    mmkv.set(name, serializedValue);
  },
  getItem: name => {
    const serializedValue = mmkv.getString(name);
    if (serializedValue !== null) {
      try {
        return JSON.parse(serializedValue);
      } catch (error) {
        return serializedValue;
      }
    }
    return null;
  },
  removeItem: name => {
    mmkv.delete(name);
  },
};


export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return mmkv.set(name, value);
  },
  getItem: name => {
    const value = mmkv.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return mmkv.delete(name);
  },
};
