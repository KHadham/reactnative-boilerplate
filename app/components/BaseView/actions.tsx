import { useState } from 'react';
import { endpoint } from '@app/constants/restApi';
import Toast from 'react-native-toast-message';
import { navigate } from '@helper/navigation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@app/constants';

export const useBaseView = () => {
  const [baseLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const doLogout = async () => {
    setIsLoading(true);
    try {
      // await AsyncStorage.removeItem(STORAGE_KEY.LOGIN_TOKEN);
    } catch (e) {
      setIsLoggedIn(false);
      setError('An error occurred during login.');
    } finally {
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Berhasil Logout',
        });
        navigate('Auth');
        setIsLoading(false);
      }, 1000);
    }
  };

  return {
    baseLoading,
    isLoggedIn,
    error,
    doLogout,
  };
};
