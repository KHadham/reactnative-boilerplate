import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import { Marker } from 'react-native-maps';
import { magnetometer } from 'react-native-sensors';
import CompassHeading from 'react-native-compass-heading';
import { isGpsEnabled } from '@utils/location';
import DeviceInfo from 'react-native-device-info';

interface AppProps {
  coordinate: {
    latitude: number
    longitude: number
  };
}

const App: React.FC<AppProps> = ({ coordinate }) => {

  const animatedRotation = new Animated.Value(0);

  // bug
  
  // latitude: -6.1754, 
  // longitude: 106.8272,
  // useEffect(() => {
  //   const degree_update_rate = 3;
  //   CompassHeading.start(degree_update_rate, ({ heading, accuracy }) => {
  //     Animated.spring(animatedRotation, {
  //       toValue: heading,
  //       useNativeDriver: false, // Set to true if possible
  //     }).start();
  //   });

  //   return () => {
  //     CompassHeading.stop();
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log('DeviceInfo() :>> ', DeviceInfo.isLocationEnabledSync());
  //   console.log('isGpsEnabled() :>> ', isGpsEnabled());
  //   console.log('coordinatexx :>> ', coordinate);
  // }, [DeviceInfo.isLocationEnabledSync(),coordinate])
  

  if (coordinate.latitude == null) {
    return null
  } else {
    return (
      <Marker coordinate={coordinate}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: animatedRotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderRadius: 100,
              borderColor: '#007AFF',
              backgroundColor: 'white',
            }}
          >
            <Icon name={'radiobox-marked'} color="#007AFF"  size={22}/>
          </View>
        </Animated.View>
      </Marker>
    );
  }
};

export default App;
