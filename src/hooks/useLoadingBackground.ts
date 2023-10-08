import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';

const loadingIndicator = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500, // Adjust duration as needed
        useNativeDriver: false,
      }).start(() => {
        animation.setValue(1);
        startReverseAnimation();
      });
    };

    const startReverseAnimation = () => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500, // Adjust duration as needed
        useNativeDriver: false,
      }).start(() => {
        animation.setValue(0);
        startAnimation();
      });
    };

    startAnimation();
  }, [animation]);

  const interpolateBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(238,238,238)', 'rgb(163,163,163)'],
  });

  return interpolateBackgroundColor;
};

export default loadingIndicator;
