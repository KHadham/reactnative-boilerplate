import { useEffect, useState } from 'react';
import { endpoint } from '@homeApp/apis';
import Toast from 'react-native-toast-message';

interface slideInterface {
  img: string;
}

export const useHooks = () => {
  const [data, setData] = useState<slideInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // const setLoading = useGlobalLoading(state => state.setLoading);

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    setIsLoading(true);
    try {
      const response = await endpoint.homeSlider();
      if (response.status == 'success' ||  response.status == true) {
        setData(response.data);
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
        text1: 'Terjadi kesalahan saat mengambil data slider',
      });
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
  };
};
