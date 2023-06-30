import { STORAGE_KEY } from '@app/constants';
import { atom } from 'recoil';

export const onBoardState = atom({
  key: STORAGE_KEY.SKIP_ONBOARD,
  default: null,
});

