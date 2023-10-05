import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

interface ThreeDotsLoadingProps {
  dotSize: number;
  dotColor: string;
}

const ThreeDotsLoading: React.FC<ThreeDotsLoadingProps> = ({ dotSize, dotColor }) => {
  const dot1Animation = useRef(new Animated.Value(0)).current;
  const dot2Animation = useRef(new Animated.Value(0)).current;
  const dot3Animation = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(dot1Animation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(dot2Animation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(dot1Animation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(dot3Animation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(dot2Animation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(dot3Animation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animate();
    });
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Animated.View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: dotColor,
          marginRight: dotSize / 2,
          transform: [
            {
              translateY: dot1Animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -dotSize],
              }),
            },
            {
              rotate: dot1Animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
              }),
            },
          ],
        }}
      />
      <Animated.View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: dotColor,
          marginRight: dotSize / 2,
          transform: [
            {
              translateY: dot2Animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -dotSize],
              }),
            },
            {
              rotate: dot2Animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
              }),
            },
          ],
        }}
      />
      <Animated.View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: dotColor,
          transform: [
            {
              translateY: dot3Animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -dotSize],
              }),
            },
            {
              rotate: dot3Animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
              }),
            },
          ],
        }}
      />
    </View>
  );
};

export default ThreeDotsLoading;
