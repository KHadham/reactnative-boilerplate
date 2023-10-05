import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { HeaderModal, Icon } from '@components';
import {} from '@components';
import Modal from 'react-native-modal';
import { spacing } from '@constants/spacing';
import { COLOR_WHITE } from '@themes/index';

interface AppProps {
  isVisible: boolean;
  onClose: Function;
  children: any;
  header?: boolean;
}

const App: React.FC<AppProps> = ({
  isVisible = false,
  onClose,
  children,
  header,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      useNativeDriver
    >
      {header && <HeaderModal />}
      <View style={{ backgroundColor: COLOR_WHITE }}>{children}</View>
    </Modal>
  );
};

export default App;
