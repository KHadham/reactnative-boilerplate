import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import { BaseView, Text } from '@components';
import firebase from '@react-native-firebase/app';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

type HomeScreenProps = {
  navigation: any,
};

const Screen = ({ navigation }: HomeScreenProps) => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  
  // Get the FCM registration token
  const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM registration token:', token);
  };
  console.log(firebase.app());
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const [first, setfirst] = useState('');

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  return (
    <BaseView style={{}}>
      <Text size='title' >Home</Text>
    </BaseView>
  );
};

export default Screen;
