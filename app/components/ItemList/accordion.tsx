import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import { Button, Text } from '@components/index';
import styles from './styles';
import { Icon } from '@components/index';
import { spacing } from '@app/constants/spacing';

interface AppProps {
  title?: string;
  desc?: string;
  onPress?: Function;
  style?: ViewStyle;
}

const App: React.FC<AppProps> = ({ title = '', desc = '', onPress, style }) => {
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
    <Button
      containerStyle={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          margin: spacing.xs,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
        },
        style,
      ]}
      onPress={() => onPress()}
    >
      <View>
        {title && <Text.Bold style={{}}>{title}</Text.Bold>}
        {desc && <Text.Desc style={{}}>{desc}</Text.Desc>}
      </View>
      <Icon name={'chevron-right'} size={30} />
    </Button>
  );
};

export default App;
