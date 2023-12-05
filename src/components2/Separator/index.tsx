import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR_BORDER } from '@themes/index';

interface AppProps {
  color?: string;
  marginHorizontal?: number;
  marginVertical?: number;
}

const App: React.FC<AppProps> = ({
  color = COLOR_BORDER,
  marginHorizontal,
  marginVertical,
}) => {
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: color,
        marginHorizontal,
        marginVertical,
      }}
    />
  );
};

export default App;
