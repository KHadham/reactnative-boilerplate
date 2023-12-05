import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { HeaderModal, Icon } from '@components';
import {} from '@components';
import Modal, { ModalProps } from 'react-native-modal';
import { spacing } from '@constants/spacing';
import { COLOR_WHITE } from '@themes/index';

interface AppProps {
  isVisible: boolean;
  onClose: Function;
  children?: any;
  header?: boolean;
  style?: ViewStyle;
}

function App({
  isVisible = false,
  onClose,
  children,
  header,
  style,
}: AppProps) {
  return (
    <Modal
      hardwareAccelerated
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      onBackdropPress={() => onClose()}
      scrollOffset={1}
      onBackButtonPress={() => onClose()}
      propagateSwipe
      hideModalContentWhileAnimating
      useNativeDriver
      backdropOpacity={0.2}
    >
      {header && <HeaderModal />}
      {children}
      {/* <View style={[{ backgroundColor: COLOR_WHITE }, style]}>{children}</View> */}
    </Modal>
  );
}

export default App;
