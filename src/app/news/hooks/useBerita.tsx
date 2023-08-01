import { useEffect, useState } from 'react';

import { endpoint } from '@newsApp/apis';
import { useGlobalLoading } from '@utils/state/globalLoading';

interface beritaInterface {
  id_berita: string;
  img: string;
  isi: string;
  judul_berita: string;
  link: string;
  tanggal_upload: string;
}

export const useHooks = () => {
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

  const [error, setError] = useState('');

  const setLoading = useGlobalLoading(state => state.setLoading);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await endpoint.berita({ page: 1 });
      if (response.status) {
        setberitaData(response.data);
      }
    } catch (e) {
    } finally {
      setLoading('');
    }
  };

  return {
    beritaData,
    error,
    getData,
  };
};
