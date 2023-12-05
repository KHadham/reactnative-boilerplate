import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

interface FocusAwareStatusBarProps {
  barStyle?: 'default' | 'light-content' | 'dark-content';
  hidden?: boolean;
  backgroundColor?: string;
  translucent?: boolean;
  networkActivityIndicatorVisible?: boolean;
}

const FocusAwareStatusBar: React.FC<FocusAwareStatusBarProps> = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
