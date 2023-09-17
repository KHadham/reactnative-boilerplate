import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import {} from '@components';
import Modal from 'react-native-modal';
import { spacing } from '@constants/spacing';
import { COLOR_WHITE } from '@themes/index';

interface AppProps {
  isVisible: boolean;
  onClose: Function;
  children: any;
}

const App: React.FC<AppProps> = ({ isVisible = false, onClose, children }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      onSwipeComplete={() => onClose()}
      useNativeDriver
    >
      <View
        style={{
          alignItems: 'center',
          marginTop: -spacing.sm,
          backgroundColor: COLOR_WHITE,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
      >
        <View style={styles.headerHandle} />
      </View>
      <View style={{ backgroundColor: COLOR_WHITE,padding:spacing.md }}>{children}</View>
    </Modal>
  );
};

export default App;
