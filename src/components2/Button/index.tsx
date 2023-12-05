import React, { useEffect, useState } from 'react';
import {
  View,
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
  COLOR_BASE_PRIMARY_MAIN,
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
import { Icon, Text } from '@components';
import { toTitleCase } from '@utils/index';
import { spacing } from '@constants/spacing';

interface AppProps {
  children?: React.ReactNode;
  title?: string;
  disabled?: boolean;
  type?: 'outline' | 'default' | 'dashed' | 'underlined' | 'fab';
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
  color?: 'danger' | 'warning' | 'success' | 'info' | 'default';
  textType?: 'upper-case'|'title-case'|'default'
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle[] | TextStyle;
  rippleRadius?: number;
  onPress?: Function;
  onLongPress?: Function;
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
  textType = 'default',
  rippleRadius = 12,
  color = 'default',
  onPress = () => { },
  onLongPress = () => { },
  icon,
  isLoading,
}) => {

  const colorFilter = [
    { colorName: 'danger', colorCode: COLOR_EVENT_ERROR },
    { colorName: 'warning', colorCode: COLOR_EVENT_WARNING },
    { colorName: 'success', colorCode: COLOR_EVENT_SUCCESS },
    { colorName: 'info', colorCode: COLOR_EVENT_INFORMATION },
    { colorName: 'default', colorCode: COLOR_BASE_PRIMARY_MAIN },
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
    flexDirection: 'row',
    borderWidth: 1,
    ...styles.buttonWrap,
    ...style,
  };

  if (children == undefined) {
    styling = [
      dashedStyle,
      outlineStyle,
      underlineStyle,
      defaultStyle,
    ].find(data => data.type == type);
  }

  const text = () => (
    <Text
      type={type == 'underlined' ? 'underline' : undefined}
      weight='bold'
      color={type == 'default' ? COLOR_WHITE : baseStyle}
      position='center'
    >
      {textType== 'default'? title :textType== 'title-case'?toTitleCase(title):title.toUpperCase()}
    </Text>
  );

  const content = () => {
    if (children !== undefined) {
      return (
        <Ripple
          pointerEvents="box-none"
          onPress={() => onPress()}
          onLongPress={() => onLongPress()}
          disabled={disabled}
          rippleContainerBorderRadius={rippleRadius}
          style={[style, { zIndex: 1 }]}
        >
          {children}
        </Ripple>
      );
    }
    else {
      return (
        <Ripple
          onPress={() => onPress()}
          style={styling}
          disabled={disabled}
          rippleContainerBorderRadius={rippleRadius}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xxs }}>
            {isLoading && <ActivityIndicator color={COLOR_WHITE} />}
            {text()}
            {icon && <Icon name={icon} color={baseStyle} />}
          </View>
        </Ripple>
      );
    }
  };
  return content();
};

export default Component;
