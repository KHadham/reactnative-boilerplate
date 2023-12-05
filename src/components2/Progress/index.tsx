import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './styles';
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { COLOR_TRANSPARENT } from '@themes/index';
import { Spacer, Text } from '@components';
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
        <Text weight='bold' style={{ fontSize: 16 }}>Mohon tunggu...</Text>
        <Spacer />
        <ActivityIndicator />
      </View>
    </View>
  );
};

export default index;
