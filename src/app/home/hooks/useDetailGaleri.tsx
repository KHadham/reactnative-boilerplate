import { useEffect, useState } from 'react';
import { endpoint } from '@newsApp/apis';
import Toast from 'react-native-toast-message';
import { useFetch, handleRequest } from '@utils/networking';
import { APPKEY } from '@constants/appKey';

export const useHooks = () => {
  const [data, setData] = useState([
    {
      title: 'Kegiatan Pengawasan Bangunan',
      data: [
        'https://dcktrp.jakarta.go.id/beranda/v.1/assets/file/foto/DSC09067.JPG',
        'https://dcktrp.jakarta.go.id/beranda/v.1/assets/file/foto/DSC08563.jpg',
        'https://dcktrp.jakarta.go.id/beranda/v.1/assets/file/foto/DSC09287.jpg',
        'https://dcktrp.jakarta.go.id/beranda/v.1/assets/file/foto/DSC08570.jpg',
      ],
    },
    {
      title: 'Bhumandala Award',
      data: [
        'https://dcktrp.jakarta.go.id/beranda/v.1/assets/file/foto/DSC02542_(1).jpg',
        'https://dcktrp.jakarta.go.id/beranda/v.1/assets/file/foto/IMG_E4245_(1).jpg',
        'https://dcktrp.jakarta.go.id/beranda/v.1/assets/file/foto/IMG_E4239_(1).jpg'
      ],
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = () => {
    // setData([]);
    useFetch({
      endpoint: endpoint.albumGaleri({
        data: { token: APPKEY.CUSTOM_TOKEN },
      }),
      onSuccess: data => {
        console.log('data galeri :>> ', data);
        setData(data.data);
      },
      onProgress(progress) {
        setIsLoading(progress);
      },
      onError: error => {
        console.log('error  galeri:>> ', error);
        setData([]);
        setError(error);
      },
    });
  };

  useEffect(() => {
    // fetching();
  }, []);

  return {
    data,
    error,
    isLoading,
    fetching,
  };
};
