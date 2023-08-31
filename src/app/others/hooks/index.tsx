import { useEffect, useState } from 'react';
import { endpoint } from '@othersApp/apis';
import Toast from 'react-native-toast-message';

interface FAQInterface {
  kategori: string;
  child: FAQItem[];
}

interface FAQItem {
  id_faq: number;
  id_kategori_faq: string;
  nama_faq: string;
  isi: string;
  created_at: string;
  updated_at: string;
}


export const useHooks = () => {
  const [data, setData] = useState<FAQInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // const setLoading = useGlobalLoading(state => state.setLoading);

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    setIsLoading(true);
    try {
      const params = {
        token: '9998fd04-6ebb-45f8-a694-28a284e156aa',
      };
      const response = await endpoint.getFaq({ data: params });
      console.log('response faq :>> ', response);
      if (response.status == 'success' || response.status == true || response.status == 200) {
        setData(response.data);
      } else {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
        setError(response.message);
      }
      console.log('response :>> ', response.data);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan saat mengambil data faq',
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
