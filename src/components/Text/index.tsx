import {
  COLOR_FONT_PRIMARY_DARK,
  FONT_SIZE_HEADER,
  FONT_SIZE_TITLE,
  FONT_SIZE_DESC,
  FONT_SIZE_CAPTION,
  FONT_SIZE_INFO,
  FONT_SIZE_SUBTITLE,
} from '@themes/index';
import React from 'react';
import { TextStyle, Text, TextProps, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

type TextWrapProps = TextProps & {
  children?: any,
  style?: TextStyle,
  onPress?: () => void,
  color?: string,
  size?:
    | 'header'
    | 'title'
    | 'desc'
    | 'button'
    | 'info'
    | 'subTitle'
    | 'regular',
  weight?: 'bold' | 'regular' | 'thin',
  type?: Array<'italic' | 'underline'> | 'italic' | 'underline',
  isLoading?: boolean,
};

const fontSizeMapping = {
  header: FONT_SIZE_HEADER,
  title: FONT_SIZE_TITLE,
  subTitle: FONT_SIZE_SUBTITLE,
  desc: FONT_SIZE_DESC,
  regular: FONT_SIZE_CAPTION,
  info: FONT_SIZE_INFO,
};

const fontWeightMapping = {
  bold: 'Inter-Bold',
  regular: 'Inter-Regular',
  thin: 'Inter-ExtraLight',
};

function index({
  color = COLOR_FONT_PRIMARY_DARK,
  children,
  style,
  onPress,
  type,
  weight = 'regular',
  size = 'regular',
  isLoading = false,
  ...rest
}: TextWrapProps) {

  const coreText = () => (
    <Text
      style={[
        {
          fontFamily: fontWeightMapping[weight],
          fontSize: fontSizeMapping[size],
          color,
        },
        type?.includes('italic') && {
          fontStyle: 'italic',
        },
        type?.includes('underline') && {
          textDecorationLine: 'underline',
        },
        style,
      ]}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Text>
  );

  return (
    <ShimmerPlaceHolder
      visible={!isLoading}
      LinearGradient={LinearGradient}
      style={style}
    >
      {coreText()}
    </ShimmerPlaceHolder>
  );
}

export default index;
