import { Animated, Easing, StyleSheet,TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Ripple from 'react-native-material-ripple';
import { COLOR_WHITE } from '@themes/index';

type Props = {
  onSwitch: Function,
  value: boolean,
};

const Component = ({ onSwitch, value }: Props) => {
  const switchAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleSwitch(value);
  }, [value]);

  const toggleSwitch = (bool: boolean) => {
    Animated.timing(switchAnim, {
      toValue: bool == true ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  return (
    <Ripple
      onPress={() => {
        toggleSwitch(!value);
        onSwitch();
      }}
      rippleContainerBorderRadius={100}
    >
      <Animated.View
        style={[
          {
            backgroundColor: switchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgb(196, 196, 196)', 'rgb(245, 81, 81)'],
            }),
          },
          styles.toogleContainer,
        ]}
      >
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: switchAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 24],
                  }),
                },
              ],
            },
            styles.toogles,
          ]}
        />
      </Animated.View>
    </Ripple>
  );
};

export default Component;
// https://reactnative.dev/docs/next/switch

const styles = StyleSheet.create({
  toogleContainer: {
    // height: 24,
    width: 30,
    // alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 4,
    borderWidth:1
  },
  toogles: {
    height: 10,
    width: 10,
    backgroundColor: COLOR_WHITE,
    borderRadius: 30,
  },
});
