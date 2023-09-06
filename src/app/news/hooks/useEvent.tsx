import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { navigate, replace, reset } from '@utils/navigation';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '@homeApp/apis';
import { useProfile } from '@profileApp/hooks/useProfile';
import { useGlobalLoading } from '@utils/state/globalLoading';
import { APPKEY } from '@constants/appKey';

// Define the interface for the component state
interface slideInterface {
  img: string;
}

interface beritaInterface {
  id_berita: string;
  img: string;
  isi: string;
  judul_berita: string;
  link: string;
  tanggal_upload: string;
}

interface pengumumanInterface {
  id_berita: string;
  img: string;
  judul_berita: string;
  link: string;
  tanggal_upload: string;
}

export const useHooks = () => {
  const [slidesData, setslidesData] = useState<slideInterface[]>([{ img: '' }]);
  const [beritaData, setberitaData] = useState<beritaInterface[]>([
    {
      id_berita: '',
      img: '',
      isi: '',
      judul_berita: '',
      link: '',
      tanggal_upload: '',
    },
  ]);
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
    getSlides();
  }, []);

  const getSlides = async () => {
    try {
      console.log('login call :>> ');
      const response = await endpoint.homePengumuman({ page: 1 });
      console.log('response  getSlides:>> ', response);
      if (response.status == 'success' ||  response.status == true) {
        setslidesData(response.data);
      }
    } catch (e) {
    } finally {
      setLoading('');
    }
  };

  return {
    slidesData,
    error,
    getSlides,
  };
};
