import { useState } from 'react';
import { endpoint } from '@app/constants/restApi';
import Toast from 'react-native-toast-message';
import { navigate } from '@helper/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@app/constants';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const doLogin = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating an API call
      const body = { username, password };
      const response = await endpoint.login(body);
      console.log('response :>> ', response);
      if (response.message == 'Invalid credentials') {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
      } else {
        await AsyncStorage.setItem(STORAGE_KEY.LOGIN_TOKEN, response.token);

        Toast.show({
          type: 'success',
          text1: 'Berhasil Login',
        });
        navigate('Tab');
      }
    } catch (e) {
      setIsLoggedIn(false);
      setError('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const doLogout = () => {
    setIsLoggedIn(false);
    setError('');
  };

  return {
    isLoading,
    isLoggedIn,
    error,
    doLogin,
    doLogout,
  };
};
