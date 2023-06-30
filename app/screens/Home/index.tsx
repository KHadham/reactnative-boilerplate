import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components/index';
import { BaseView, Text } from '@app/components';

type HomeScreenProps = {
  navigation: any,
};

const Screen = ({ navigation }: HomeScreenProps) => {
  const [first, setfirst] = useState('');

  //   useEffect(() => {
  // Toast.show({
  //   type: 'success',
  //   text1: 'Hello',
  //   text2: 'This is some something 👋'
  // });

  //     return () => {
  //       second;
  //     };
  //   }, []);

  return (
    <BaseView style={{}}>
      <Text.Title style={{}}>Home</Text.Title>
    </BaseView>
  );
};

export default Screen;
