import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './styles';
import { heightByScreen, widthByScreen } from '@app/helper/dimensions';
import { COLOR_TRANSPARENT } from '@app/styles';
import { Spacer, Text } from '@components/index';
const index = () => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 999,
        width: widthByScreen(100),
        height: heightByScreen(100),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_TRANSPARENT,
      }}
    >
      <View style={styles.basicLoading}>
        <Text.Bold style={{ fontSize: 16 }}>Mohon tunggu...</Text.Bold>
        <Spacer />
        <ActivityIndicator />
      </View>
    </View>
  );
};

export default index;
