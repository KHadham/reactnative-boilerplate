import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import BaseView from '@components/index/BaseView';
import Header from '@components/index/Header';
import Txt from '@components/index/Text';

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
      <Header title='Text' />
      <Txt.Header>Header</Txt.Header>
      <Txt.Title>Title</Txt.Title>
      <Txt.Button>Button</Txt.Button>
      <Txt.Desc>Desc</Txt.Desc>
      <Txt.Info>Info</Txt.Info>
      <Txt.Info>Info</Txt.Info>
    </BaseView>
  );
};

export default Screen;
