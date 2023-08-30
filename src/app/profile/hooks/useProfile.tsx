import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '../apis';
import { useProfileStore } from '@profileApp/stores';
import { APPKEY } from '@constants/appKey';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    setUserDetail,
    user,
    setEmployeeDetail,
    setPersonalDetail,
    employee,
    personal,
  } = useProfileStore();

  useEffect(() => {
    // fetch();
  }, []);

  const doVerifyToken = async () => {
    Toast.show({
      type: 'loading',
      text1: 'Loading ...',
      autoHide: false,
      props: true,
    });
    try {
      const response = await endpoint.verifyTokens({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      });
      console.log('response :>> ', response);
      if (response.status == 'success' || response.status == true) {
        setUserDetail(response.payload);
        setTimeout(() => {
          fetch();
        }, 2000);
      } else {
        // setError(response.message);
      }
    } catch (e) {
      console.log('error verify:>>  ', e);
      setIsLoading(false);
      // setError(e);
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan saat verifikasi token',
        props: true,
      });
    } finally {
      // Toast.hide();
    }
  };

  const fetch = async () => {
    Toast.show({
      type: 'loading',
      text1: 'Mengambil info user ...',
      autoHide: false,
      props: true,
    });
    try {
      const response = await endpoint.getProfile({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
        query: { username: user.username },
      });
      if (response.status == 'success' || response.status == true) {
        setEmployeeDetail(response.data.siadik);
        setPersonalDetail(response.data.sso); // useProfileStore().setPersonalDetail(response);
        // useProfileStore().setEmployeeDetail();
        console.log('success fetch:>> ', response);
        // console.log('get profil data :>> ', response.payload);
        // storage.getItem(STORAGE_KEY.LOGIN_TOKEN);
      }
    } catch (e) {
      console.log('error fetch:>> ', e);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan saat mengambil info user',
      });
    } finally {
      // Toast.hide();
    }
  };

  return {
    isLoading,
    error,
    data: { user, employee, personal },
    doVerifyToken,
    fetch,
  };
};
