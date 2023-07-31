// import { Background } from '../../assets/images';
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import styles from '@authApp/styles';
import Lottie from 'lottie-react-native'; // if you have "esModuleInterop": true
import IMAGES from '@images';
import { storage } from '@utils/storage';
import { replace } from '@utils/navigation';
import { STORAGE_KEY } from '@constants/index';
import { BaseView, FastImage, Text } from '@components';
import messaging from '@react-native-firebase/messaging';
import { heightByScreen, widthByScreen } from '@utils/dimensions';

type HomeScreenProps = {
  navigation: any,
};

const SplashScreen = ({ navigation }: HomeScreenProps) => {
  useEffect(() => {
    isLogin();
  }, []);

  const isLogin = () => {
    // storage.setItem(STORAGE_KEY.LOGIN_TOKEN, response.token);
    const token = storage.getItem(STORAGE_KEY.LOGIN_TOKEN);
    if (!token) {
      setTimeout(() => {
        navigation.replace('Auth');
      }, 1000);
      // navigate('Auth')
      // login
    } else {
      setTimeout(() => {
        navigation.replace('Tab');
      }, 1000);
      // home
    }
  };

  return (
    <BaseView style={styles.container}>
      <FastImage
        source={IMAGES.LogoCitata}
        resizeMode="contain"
        style={styles.imageLogoBanner}
      />
      <View style={{ width: widthByScreen(100), height: 100 }}>
        <Lottie source={require('@animation/loadingSpin.json')} autoPlay loop />
      </View>
      <Text size="info" weight="thin">
        BoilerPlate v1
      </Text>
    </BaseView>
  );
};

export default SplashScreen;
