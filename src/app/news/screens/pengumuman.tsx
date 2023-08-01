import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import { Icon, BaseView } from '@components';
import { navigate, getParams } from '@utils/navigation';

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
    <BaseView style={{borderWidth:1,height:200}}>
      <Text style={{}}>Pendjadwalan</Text>
    </BaseView>
  );
};

export default Screen;
