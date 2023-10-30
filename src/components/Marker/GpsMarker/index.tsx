import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import { Callout, Marker } from 'react-native-maps';
import { GpsMark } from '@svgs';
import { widthByScreen } from '@utils/dimensions';

interface AppProps {
  coordinate: {
    latitude: number,
    longitude: number,
  };
}

const App: React.FC<AppProps> = ({ coordinate }) => {
  if (coordinate.latitude == 0) {
    return null;
  } else {
    return (
      <Marker coordinate={coordinate} tracksViewChanges={false}>
        <GpsMark />
        <Callout style={{ width: widthByScreen(20), height: 40 }}>
          <Text>Lokasi Anda</Text>
        </Callout>
      </Marker>
    );
  }
};

export default App;
