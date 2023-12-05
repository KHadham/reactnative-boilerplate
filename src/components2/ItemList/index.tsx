import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import { Button, Text } from '@components';
import styles from './styles';
import { Icon } from '@components';
import { spacing } from '@constants/spacing';

interface AppProps {
  title?: string;
  desc?: string;
  rightAction?: Function | string;
  style?: ViewStyle;
}

const App: React.FC<AppProps> = ({
  title = '',
  desc = '',
  rightAction,
  style,
}) => {
  const handleRightAction = () => {
    if (typeof rightAction === 'function') {
      rightAction();
    } else return rightAction;
  };

  const handleRightComponent = () => {
    if (typeof rightAction === 'function') {
      return <Icon name={'chevron-right'} size={30} />;
    } else
      return (
        <Text size="desc" style={{}}>
          {rightAction}
        </Text>
      );
  };

  return (
    <Button
      disabled={typeof rightAction !== 'function'}
      style={[{ minHeight: 50, justifyContent: 'center' }, style]}
      onPress={() => handleRightAction()}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: spacing.xs,
          justifyContent: 'space-between',
        }}
      >
        <View style={{}}>
          {title && (
            <Text weight="bold" style={{}}>
              {title}
            </Text>
          )}
          {desc && (
            <Text size="desc" style={{}}>
              {desc}
            </Text>
          )}
        </View>
        {handleRightComponent()}
      </View>
    </Button>
  );
};

export default App;
