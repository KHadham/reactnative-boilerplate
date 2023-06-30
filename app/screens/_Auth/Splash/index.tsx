import BaseView from '@components/BaseView/BaseView';
// import { Background } from '../../assets/images';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import styles from './styles';
import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
import IMAGES from '@images';
import { atom, useRecoilState } from 'recoil';
import { onBoardState } from '@state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@app/constants';
type HomeScreenProps = {
  navigation: any,
};

const SplashScreen = ({ navigation }: HomeScreenProps) => {
  const [storageValue, setStorageValue] = useRecoilState(onBoardState);

  const getOnboardStats = async () => {
    let token: string;
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY.SKIP_ONBOARD);
      token = await AsyncStorage.getItem(STORAGE_KEY.LOGIN_TOKEN);
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
