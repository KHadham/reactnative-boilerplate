import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';
import { Icon } from '@components';
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image';
import IMAGES from '@images';

interface AppProps {
  style?: ImageStyle;
  source: any
  resizeMode?: ResizeMode;
}

const App: React.FC<AppProps> = ({ style, source, resizeMode }) => {
  if (typeof source === 'number') {
    return <FastImage style={style} source={source} resizeMode={resizeMode} />;
  } else {
    return (
      <FastImage
        style={style}
        source={{
          uri: source,
        }}
        resizeMode={resizeMode}
      />
    );
  }
};

export default App;
