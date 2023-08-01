import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import { Text, Icon, BaseView } from '@components';
import { navigate, getParams } from '@utils/navigation';

const Screen = () => {
  

  return (
    <BaseView style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text size="header" weight="thin" type={['italic', 'underline']}>
        Dalam pengambangan
      </Text>
    </BaseView>
  );
};

export default Screen;
