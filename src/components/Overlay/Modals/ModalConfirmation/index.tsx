import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import styles from './styles';
import { Button, Icon } from '@components';
import { Text, BaseView } from '@components';
import Modal from 'react-native-modal';
import { spacing } from '@constants/spacing';

interface AppProps {
  title: string;
  subTitle?: string;
  isVisible: boolean;
  onClose: Function;
  onSuccess: Function;
  successText?: string;
}

const App: React.FC<AppProps> = ({
  title = '',
  subTitle = '',
  isVisible = false,
  onClose,
  onSuccess,
  successText = 'Yakin',
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      swipeDirection={'down'}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      onSwipeComplete={() => onClose()}
    >
      <SafeAreaView style={styles.contentWrap}>
        <View style={{ padding: spacing.md }}>
          <Text size="title" weight="bold">
            {title}
          </Text>
          <Text size="subTitle">{subTitle}</Text>
          <View style={styles.buttonRow}>
            <Button
              color={'danger'}
              title="Batal"
              style={{ flex: 1 }}
              type="outline"
              onPress={() => onClose()}
            />
            <Button
              color={'success'}
              title={successText}
              style={{ flex: 1 }}
              onPress={() => {
                onClose();
                onSuccess();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default App;
