import { View, Text, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Ripple from 'react-native-material-ripple';
import { COLOR_EVENT_SUCCESS, COLOR_WHITE } from '@themes/index';

export default function itemList({ data, onPress, selected }) {
  const itemAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selected) {
      Animated.timing(itemAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [selected]);

  const height = itemAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [57, 0],
  });

  return (
    <Animated.View
      style={{
        height,
        justifyContent: 'center',
        backgroundColor: selected ? COLOR_EVENT_SUCCESS : COLOR_WHITE,
        paddingHorizontal:20
      }}
    >
      <Ripple onPress={() => onPress()}>
        <Text>{data}</Text>
      </Ripple>
    </Animated.View>
  );
}
