import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components/index';
import { BaseView, Text, ItemList, Header } from '@app/components';
import { spacing } from '@app/constants/spacing';

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
      <Header title="Data Pribadi" />
    </BaseView>
  );
};

export default Screen;
