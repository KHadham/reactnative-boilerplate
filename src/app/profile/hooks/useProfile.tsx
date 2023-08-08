import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import { endpoint } from '../apis';
import { useProfileStore } from '@profileApp/stores';
import { useGlobalLoading } from '@utils/state/globalLoading';
import { APPKEY } from '@constants/appKey';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const setLoading = useGlobalLoading(state => state.setLoading);
  const {
    setUserDetail,
    user: data,
    setEmployeeDetail,
    setPersonalDetail,
  } = useProfileStore();

  const doVerifyToken = async () => {
    setLoading('auth');
    Toast.show({
      type: 'loading',
      text1: 'Verify Login ...',
      autoHide: false,
    });
    try {
      const response = await endpoint.verifyTokens({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
      });
      if (response.status === 'success') {
        setUserDetail(response.payload);
      } else {
        setError(response.message);
      }
    } catch (e) {
      console.log('error verify:>> ', e);
      setIsLoading(false);
      setError(e);
      Toast.show({
        type: 'error',
        text1: e.message,
      });
    } finally {
      Toast.hide();
      setLoading('');
    }
  };

  const fetch = async () => {
    setLoading('profil');
    Toast.show({
      type: 'loading',
      text1: 'Verify Login ...',
      autoHide: false,
    });
    try {
      const response = await endpoint.getProfile({
        headers: {
          'app-key': APPKEY.CITATA_KEY,
          authorization: storage.getItem(STORAGE_KEY.LOGIN_TOKEN),
        },
        query: { username: data.username },
      });
      if (response.status === 'success') {
        setEmployeeDetail(response.data.siadik);
        setPersonalDetail(response.data.sso); // useProfileStore().setPersonalDetail(response);
        // useProfileStore().setEmployeeDetail();
        console.log('success fetch:>> ', response);
        // console.log('get profil data :>> ', response.payload);
        // storage.getItem(STORAGE_KEY.LOGIN_TOKEN);
      }
    } catch (e) {
      console.log('error verify:>> ', e);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: e.message,
      });
    } finally {
      Toast.hide();
      setLoading('');
    }
  };

  return {
    isLoading,
    error,
    data,
    doVerifyToken,
    fetch,
  };
};
