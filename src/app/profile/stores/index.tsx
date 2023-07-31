import { create } from 'zustand';

type userDetail = {
  email: string,
  id_user: string,
  nama: string,
  nik: string,
  nrk: string,
  passport: string,
  telepon: string,
  username: string,
};

type MyStore = {
  user: userDetail | null;
  setUser: (user: userDetail) => void;
};

const profileStore = create<MyStore>((set) => ({
  user: null,
  setUser: (user: userDetail) => set(() => ({ user })),
}));

export default profileStore;
