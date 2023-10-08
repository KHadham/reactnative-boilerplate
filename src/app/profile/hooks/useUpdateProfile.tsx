import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '../apis';
import { useProfileStore } from '@profileApp/stores/storage';
import { APPKEY } from '@constants/appKey';
import { useFetch } from '@utils/networking';

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  let dummyData = {
    _token: 'BiMV7QgWJBBUvNNXLRATGolldiGe7d3N3jHjvs37',
    nama: 'MOHAMAD DAMANHURI',
    nik: '',
    passport: '',
    telepon: '08128238078',
    email: 'm.damanhuri@gmail.com',
    alamat: 'JL. HARAPAN 5 NO.12 RT.007/10 CIPINANG MELAYU, JAKARTA TIMUR',
    provinsi: 'DKI JAKARTA',
    kabupaten: 'JAKARTA TIMUR',
    kecamatan: 'MAKASAR',
    id_wilayah: '3c361bc2-dfad-45a2-a2b0-6a07bbc2c108',
  };
  
  const action = async () => {
    useFetch({
      endpoint: endpoint.changeProfile({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          'content-type': 'multipart/form-data',
          token_sso: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
        data: dummyData,
      }),
      onSuccess: response => {
        console.log('response update profile:>> ', response);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        console.log('error update profile:>> ', error);
        setError(error);
      },
    });
  };

  return {
    isLoading,
    error,
    action,
    fetch,
  };
};
