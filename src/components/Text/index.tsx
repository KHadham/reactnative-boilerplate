import {
  COLOR_FONT_PRIMARY_DARK,
  FONT_SIZE_HEADER,
  FONT_SIZE_TITLE,
  FONT_SIZE_DESC,
  FONT_SIZE_CAPTION,
  FONT_SIZE_INFO,
  FONT_SIZE_SUBTITLE,
  FONT_SIZE_REGULAR,
} from '@themes/index';
import React from 'react';
import { TextStyle, Text, TextProps, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

type TextWrapProps = TextProps & {
  children: any,
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
  desc: FONT_SIZE_DESC,
  button: FONT_SIZE_CAPTION,
  info: FONT_SIZE_INFO,
  subTitle: FONT_SIZE_SUBTITLE,
  regular: FONT_SIZE_REGULAR,
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
  const fontSize = size ? fontSizeMapping[size] : FONT_SIZE_REGULAR;
  const fontFamily = weight ? fontWeightMapping[weight] : 'Inter-Regular';

  const coreText = () => (
    <Text
      style={[
        {
          fontFamily,
          fontSize,
          color,
        },
        type?.includes('italic') && {
          fontStyle: 'italic',
        },
        type?.includes('underline') && {
          textDecorationLine: 'underline',
        },
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
