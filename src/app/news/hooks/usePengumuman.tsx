import { useEffect, useState } from 'react';
import { endpoint } from '@newsApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch ,handleRequest } from '@utils/networking';
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
    useFetch({
      endpoint: endpoint.pengumuman({ page: page }),
      onSuccess: data => {
        setData(prevData => [...prevData, ...data.data]);
        setpage(page + 1);
      },
      onProgress(progress) {},
      onError: error => {
        console.log('error :>> ', error);
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      },
    });
  };

  return {
    data,
    error,
    isLoading,
    fetching,
  };
};
