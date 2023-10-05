import { useEffect, useState } from 'react';
import { endpoint } from '@othersApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch ,handleRequest } from '@utils/networking';
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
  const [data, setData] = useState<FAQInterface[]>([
    {
      kategori: '',
      child: [
        {
          id_faq: 0,
          id_kategori_faq: '',
          nama_faq: '',
          isi: '',
          created_at: '',
          updated_at: '',
        },
      ],
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    useFetch({
      endpoint: endpoint.getFaq({
        data: { token: '9998fd04-6ebb-45f8-a694-28a284e156aa' },
      }),
      onSuccess: data => {
        console.log('data faq :>> ', data);
        setData(data.data);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        setError(error);
      },
    });
  }, []);

  return {
    data,
    error,
    isLoading,
  };
};
