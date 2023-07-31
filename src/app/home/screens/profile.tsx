import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import { navigate } from '@utils/navigation';
import { BaseView, Text } from '@components';
import { useBearStore } from '../stores/stores';
interface AppProps {
  props1: string;
  props2: number;
}

const App: React.FC<AppProps> = ({ props1 = 'default value', props2 }) => {
  const bears = useBearStore(state => state.bears);

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
    <BaseView style={{}}>
      <Icon name={'chevron-left'} size={30} />
      <Text weight="bold" style={{}}>
        home
      </Text>
    </BaseView>
  );
};

export default App;
