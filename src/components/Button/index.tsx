import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  Appearance,
  ColorValue,
  TextStyle,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import PropTypes from 'prop-types';
import {
  COLOR_BASE_PRIMARY_DARK,
  COLOR_EVENT_ERROR,
  COLOR_EVENT_INACTIVE,
  COLOR_EVENT_INFORMATION,
  COLOR_EVENT_SUCCESS,
  COLOR_EVENT_WARNING,
  COLOR_WHITE,
  FONT_PRIMARY_BOLD,
  FONT_PRIMARY_REGULAR,
} from '@themes/index';
import { widthByScreen } from '@utils/dimensions';
import styles from './styles';

interface AppProps {
  children?: React.ReactNode;
  title?: string;
  disabled?: boolean;
  type?: 'outline' | 'default' | 'dashed' | 'underlined';
  color?: 'danger' | 'warning' | 'success' | 'info' | 'default';
  containerStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle[] | TextStyle;
  rippleRadius?: number;
  onPress?: Function;
}

const Component: React.FC<AppProps> = ({
  children,
  title,
  disabled = false,
  containerStyle,
  type = 'default',
  rippleRadius = 12,
  color = 'default',
  onPress = () => {},
  textStyle = {},
}) => {
  const colorFilter = [
    { colorName: 'danger', colorCode: COLOR_EVENT_ERROR },
    { colorName: 'warning', colorCode: COLOR_EVENT_WARNING },
    { colorName: 'success', colorCode: COLOR_EVENT_SUCCESS },
    { colorName: 'info', colorCode: COLOR_EVENT_INFORMATION },
    { colorName: 'default', colorCode: COLOR_BASE_PRIMARY_DARK },
  ].find(data => data.colorName == color).colorCode;

  let baseStyle: ColorValue;
  let styling: any;
  if (children == undefined) {
    baseStyle = disabled ? COLOR_EVENT_INACTIVE : colorFilter;
    styling = [
      {
        type: 'dashed',
        borderStyle: 'dashed',
        borderWidth: 1,
        backgroundColor: COLOR_WHITE,
        borderRadius: rippleRadius,
        borderColor: baseStyle,
        ...styles.buttonWrap,
        ...containerStyle,
      },
      {
        type: 'outline',
        borderWidth: 1,
        backgroundColor: COLOR_WHITE,
        borderRadius: rippleRadius,
        borderColor: baseStyle,
        ...styles.buttonWrap,
        ...containerStyle,
      },
      {
        type: 'underline',
        borderRadius: rippleRadius,
        borderColor: baseStyle,
        ...containerStyle,
      },
      {
        type: 'default',
        borderRadius: rippleRadius,
        backgroundColor: baseStyle,
        borderColor: baseStyle,
        ...styles.buttonWrap,
        ...containerStyle,
      },
    ].find(data => data.type == type);
  }

  const text = () => (
    <Text
      style={[
        {
          textDecorationLine: type == 'underlined' ? 'underline' : 'none',
          fontFamily: FONT_PRIMARY_BOLD,
          color: type == 'default' ? COLOR_WHITE : baseStyle,
          textAlign: 'center',
        },
        textStyle,
      ]}
    >
      {title}
    </Text>
  );

  const content = () => {
    if (children !== undefined) {
      return (
        <Ripple
          pointerEvents="box-none"
          onPress={() => onPress()}
          disabled={disabled}
          rippleContainerBorderRadius={rippleRadius}
          style={[containerStyle, { zIndex: 1 }]}
        >
          <View pointerEvents="box-only">{children}</View>
        </Ripple>
      );
    } else {
      return (
        <Ripple
          onPress={() => onPress()}
          style={styling}
          disabled={disabled}
          rippleContainerBorderRadius={rippleRadius}
        >
          {text()}
        </Ripple>
      );
    }
  };
  return content();
};

export default Component;
