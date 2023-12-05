import { widthByScreen } from '@utils/dimensions';
import { LayoutAnimationHandler } from '@utils/uiHandler';
import React, { useEffect, useState } from 'react';
import { Animated, ViewProps } from 'react-native';

type LoadingProps = ViewProps & {
  isLoading: boolean,
  children?: any,
  randomSize?: boolean,
  interval?: number,
};

function index({
  children,
  isLoading = false,
  randomSize,
  interval = 1000,
  ...rest
}: LoadingProps) {
  const [animation] = useState(new Animated.Value(0));
  const [randomWidth, setRandomWidth] = useState(100);

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(animation, {
        toValue: 1,
        duration: interval / 2,
        useNativeDriver: true,
      }).start(() => {
        animation.setValue(1);
        startReverseAnimation();
      });
    };

    const startReverseAnimation = () => {
      Animated.timing(animation, {
        toValue: 0,
        duration: interval / 2,
        useNativeDriver: true,
      }).start(() => {
        animation.setValue(0);
        startAnimation();
      });
    };

    startAnimation();
    if (randomSize) {
      const intervalId = setInterval(() => {
        LayoutAnimationHandler();
        const maxWidth = widthByScreen(85);
        const minWidth = widthByScreen(15);
        const newRandomWidth =
          Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
        setRandomWidth(newRandomWidth);
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [animation]);

  const interpolateBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(238,238,238)', 'rgb(163,163,163)'],
  });

  return (
    <Animated.View
      style={[
        isLoading && {
          opacity: animation,
          backgroundColor: 'rgb(163,163,163)',
          borderRadius: 10,
        },
        randomSize && { width: randomWidth },
        rest.style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

export default index;
