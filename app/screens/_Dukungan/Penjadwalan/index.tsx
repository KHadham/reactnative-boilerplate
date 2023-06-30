import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components/index';
import BaseView from '@app/components/BaseView';
import { navigate, getParams } from '@helper/navigation';



const Screen = () => {
  const params = getParams();

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
      <Text style={{}}>Pendjadwalan</Text>
    </BaseView>
  );
};

export default Screen;
