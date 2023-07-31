import { BaseView } from '@components';
// import { Background } from '../../assets/images';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import styles from './styles';
import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
import IMAGES from '@images';
import { atom, useRecoilState } from 'recoil';
import { onBoardState } from '@utils/state';
import { storage } from '@utils/storage';
import { STORAGE_KEY } from '@constants/index';
import messaging from '@react-native-firebase/messaging';

type HomeScreenProps = {
  navigation: any,
};

const SplashScreen = ({ navigation }: HomeScreenProps) => {
  const [storageValue, setStorageValue] = useRecoilState(onBoardState);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getOnboardStats = async () => {
    let token: string;
    try {
      const value = await storage.getString(STORAGE_KEY.SKIP_ONBOARD);
      token = await storage.getString(STORAGE_KEY.LOGIN_TOKEN);
      setStorageValue(value);
    } catch (e) {
      return 'error';
    } finally {
      setTimeout(() => {
        if (token == null) navigation.replace('Auth');
        else navigation.replace('Tab');
      }, 2000);
    }
  };

  useEffect(() => {
    getOnboardStats();
  }, [navigation]);

  return (
    <BaseView style={styles.container}>
      <Image
        source={IMAGES.LogoCitata}
        resizeMode="contain"
        style={styles.image}
      />
      <Text>Boilerplate v1</Text>
    </BaseView>
  );
};

export default SplashScreen;
