import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import { spacing } from '@constants/spacing';
import { COLOR_GREY } from '@themes/index';

interface AppProps {
  line?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'flex';
}

const App: React.FC<AppProps> = ({ size = 'sm', line = false }) => {
  const styling = () => {
    if (size == 'flex') return { flex: 1 };
    else return { width: spacing[size], height: spacing[size] };
  };
  const divider = () => {
    if (line) return { borderBottomWidth: 0.5, borderColor: COLOR_GREY };
  };
  return <View style={[styling(), divider()]} />;
};

export default App;
// https://developer.apple.com/documentation/swiftui/spacer
