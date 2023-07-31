import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import { BaseView, Text, ItemList, Header } from '@components';
import { spacing } from '@constants/spacing';

const Screen = () => {
  const [baseModal, setbaseModal] = useState('');

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
    <BaseView >
      <Header title='Keamanan Akun'/>
    </BaseView>
  );
};

export default Screen;
