import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { navigate, replace, reset } from '@utils/navigation';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '@newsApp/apis';
import { useProfile } from '@profileApp/hooks/useProfile';
import { useGlobalLoading } from '@utils/state/globalLoading';
import { APPKEY } from '@constants/appKey';


interface pengumumanInterface {
  id_berita: string;
  img: string;
  judul_berita: string;
  link: string;
  tanggal_upload: string;
}

export const useHooks = () => {
  const [pengumumanData, setpengumumanData] = useState<pengumumanInterface[]>([
    {
      id_berita: '',
      img: '',
      judul_berita: '',
      link: '',
      tanggal_upload: '',
    },
  ]);

  const [error, setError] = useState('');

  const setLoading = useGlobalLoading(state => state.setLoading);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log('login call :>> ');
      const response = await endpoint.pengumuman({ page: 1 });
      console.log('response  getData pengunuman:>> ', response);
      if (response.status) {
        setpengumumanData(response.data);
      }
    } catch (e) {
    } finally {
      setLoading('');
    }
  };

  return {
    pengumumanData,
    error,
    getData,
  };
};
