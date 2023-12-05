import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import { } from '@components';

interface AppProps {
  props1: string;
  props2: number;
}

const App: React.FC<AppProps> = ({ props1 = 'default value', props2 }) => {
  const [first, setfirst] = useState('');

  return (
    <View style={{}}>
      <Icon name={'chevron-left'} size={30} />
      <Text style={{}}>
        {props1}
        {props2}
      </Text>
    </View>
  );
};

export default App;
