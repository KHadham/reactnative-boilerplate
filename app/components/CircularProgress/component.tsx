import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { View, Text } from 'react-native';
import React from 'react';

const component = () => {
  return (
    <AnimatedCircularProgress
      size={120}
      width={15}
      fill={30}
      tintColor="#00e0ff"
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor="#3d5875"
    >
      {fill => <Text>{fill}</Text>}
    </AnimatedCircularProgress>
  );
};

export default component;
