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
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import PropTypes from 'prop-types';
import {
  COLOR_BACKGROUND_INACTIVE,
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
import { Icon } from '@components';

interface AppProps {
  children?: React.ReactNode;
  title?: string;
  disabled?: boolean;
  type?: 'outline' | 'default' | 'dashed' | 'underlined' | 'fab';
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
  color?: 'danger' | 'warning' | 'success' | 'info' | 'default';
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle[] | TextStyle;
  rippleRadius?: number;
  onPress?: Function;
  icon?: string;
  isLoading?: boolean;
}

interface StylingItem extends ViewStyle {
  type: string; // Custom data
}

const Component: React.FC<AppProps> = ({
  children,
  title,
  disabled = false,
  style,
  type = 'default',
  rippleRadius = 12,
  color = 'default',
  onPress = () => {},
  textStyle = {},
  icon,
  isLoading,
  position = 'bottom-right'
}) => {
  const colorFilter = [
    { colorName: 'danger', colorCode: COLOR_EVENT_ERROR },
    { colorName: 'warning', colorCode: COLOR_EVENT_WARNING },
    { colorName: 'success', colorCode: COLOR_EVENT_SUCCESS },
    { colorName: 'info', colorCode: COLOR_EVENT_INFORMATION },
    { colorName: 'default', colorCode: COLOR_BASE_PRIMARY_DARK },
  ].find(data => data.colorName == color).colorCode;

  let baseStyle = disabled ? COLOR_EVENT_INACTIVE : colorFilter;
  let baseBackground = disabled ? COLOR_BACKGROUND_INACTIVE : COLOR_WHITE;
  let styling: any;

  const dashedStyle: StylingItem = {
    type: 'dashed',
    borderStyle: 'dashed',
    borderWidth: 1,
    backgroundColor: baseBackground,
    borderRadius: rippleRadius,
    borderColor: baseStyle,
    ...styles.buttonWrap,
    ...style,
  };

  const outlineStyle: StylingItem = {
    type: 'outline',
    borderWidth: 1,
    backgroundColor: baseBackground,
    borderRadius: rippleRadius,
    borderColor: baseStyle,
    ...styles.buttonWrap,
    ...style,
  };

  const underlineStyle: StylingItem = {
    type: 'underline',
    borderRadius: rippleRadius,
    borderColor: baseStyle,
    ...style,
  };

  const defaultStyle: StylingItem = {
    type: 'default',
    borderRadius: rippleRadius,
    backgroundColor: baseStyle,
    borderColor: baseStyle,
    flexDirection:'row',
    ...styles.buttonWrap,
    ...style,
  };

  const fabStyle: StylingItem = {
    type: 'fab',
    borderRadius: 100,
    backgroundColor: baseStyle,
    borderColor: baseStyle,
    position: 'absolute',
    width: widthByScreen(12),
    height:widthByScreen(12),
    maxWidth:60,
    maxHeight:60,
    justifyContent: 'center',
    alignItems: 'center',
    ...styles.buttonWrap,
    // ...style,
  };

  if (children == undefined) {
    styling = [
      dashedStyle,
      outlineStyle,
      underlineStyle,
      defaultStyle,
      fabStyle,
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
          style={[style, { zIndex: 1 }]}
        >
          {children}
        </Ripple>
      );
    } else if (type == 'fab') {
      const positionStyles = {
        'top-right': { top: 20, right: 20 },
        'bottom-right': { bottom: 20, right: 20 },
        'top-left': { top: 20, left: 20 },
        'bottom-left': { bottom: 20, left: 20 },
      };
      return (
        <Ripple
          onPress={() => onPress()}
          style={[fabStyle,positionStyles[position]]}
          disabled={disabled}
          rippleContainerBorderRadius={fabStyle.borderRadius}
        >
          {isLoading ? (
            <ActivityIndicator color={COLOR_WHITE} />
          ) : (
            <Icon name={icon} color={COLOR_WHITE} />
          )}
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
          {isLoading ? <ActivityIndicator color={COLOR_WHITE} /> : text()}
          <Icon name={icon} color={COLOR_WHITE}/>
        </Ripple>
      );
    }
  };
  return content();
};

export default Component;
