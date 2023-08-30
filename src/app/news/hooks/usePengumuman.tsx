import { useEffect, useState } from 'react';
import { endpoint } from '@newsApp/apis';
import Toast from 'react-native-toast-message';

interface pengumumanInterface {
  id_berita: string;
  img: string;
  judul_berita: string;
  link: string;
  tanggal_upload: string;
}

export const useHooks = () => {
  const [data, setData] = useState<pengumumanInterface[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [error, setError] = useState('');

  // const setLoading = useGlobalLoading(state => state.setLoading);

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await endpoint.pengumuman({ page: page });
        if (response.status == 'success' ||  response.status == true) {
          setData(prevData => [...prevData, ...response.data]);
        } else {
          Toast.show({
            type: 'error',
            text1: response.message,
          });
          setError(response.message);
        }
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: e,
        });
        setError(e);
      } finally {
        setIsLoading(false);
        setpage(page + 1);
      }
    }, 2000);
  };

  return {
    data,
    error,
    isLoading,
    fetching,
  };
};
