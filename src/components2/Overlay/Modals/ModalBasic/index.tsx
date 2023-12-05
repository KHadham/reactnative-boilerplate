import React, { ReactNode, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  ViewStyle,
  StyleProp,
  SafeAreaView,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { BaseView, BasicContent, Button, HeaderModal, Icon } from '@components';
import { Text } from '@components';
import Modal, { ModalProps } from 'react-native-modal';
import { spacing } from '@constants/spacing';
import { COLOR_WHITE } from '@themes/index';
import { toTitleCase } from '@utils/index';

interface AppProps {
  isVisible: boolean;
  onClose: Function;
  onConfirm?: Function;
  style?: ViewStyle;
  title?: string;
  desc?: string;
  btnText?: string;
  footer?: ReactNode;
  images?: ReactNode | ImageSourcePropType;
  content?: ReactNode;
}

function App({
  isVisible = false,
  onClose,
  style,
  onConfirm = () => {},
  title = '',
  desc = '',
  btnText = 'Oke',
  footer,
  images,
  content = null,
}: AppProps) {
  const footerUi = () => {
    if (footer) {
      return footer;
    } else {
      return (
        <Button
          style={{ width: '100%' }}
          title={toTitleCase(btnText)}
          onPress={() => {
            onConfirm == undefined ? onClose() : onClose();
            onConfirm();
          }}
        />
      );
    }
  };

  return (
    <Modal
      onBackButtonPress={() => onClose()}
      onBackdropPress={() => onClose()}
      hardwareAccelerated
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      hideModalContentWhileAnimating
      useNativeDriver
    >
      <HeaderModal />
      <SafeAreaView style={{ backgroundColor: COLOR_WHITE }}>
        <View
          style={[
            {
              padding: spacing.md,
              alignItems: 'center',
              gap: 20,
            },
            style,
          ]}
        >
          {content !== null ? (
            content
          ) : (
            <BasicContent image={images} title={title} desc={desc} />
          )}
          {footerUi()}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default App;
