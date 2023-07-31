import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR_GREY } from '@themes/index';

interface AppProps {
  color?: string;
}

const App: React.FC<AppProps> = ({ color = COLOR_GREY }) => {
  return <View style={{ borderWidth: 0.5, borderColor: color }} />;
};

export default App;
