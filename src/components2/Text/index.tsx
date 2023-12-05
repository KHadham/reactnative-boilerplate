import { LoadingWraper } from '@components';
import { useLoadingBackground } from '@hooks';
import {
  COLOR_FONT_PRIMARY_DARK,
  FONT_SIZE_HEADER,
  FONT_SIZE_TITLE,
  FONT_SIZE_DESC,
  FONT_SIZE_REGULAR,
  FONT_SIZE_INFO,
  FONT_SIZE_SUBTITLE,
  COLOR_BACKGROUND_INFORMATION,
  COLOR_EVENT_INFORMATION,
  COLOR_BACKGROUND_ERROR,
  COLOR_EVENT_ERROR,
  COLOR_BACKGROUND_INACTIVE,
  COLOR_BACKGROUND_SUCCESS,
  COLOR_BACKGROUND_WARNING,
  COLOR_EVENT_INACTIVE,
  COLOR_EVENT_SUCCESS,
  COLOR_EVENT_WARNING,
} from '@themes/index';
import { widthByScreen } from '@utils/dimensions';
import React, { useEffect } from 'react';
import { TextStyle, Text, TextProps, View } from 'react-native';

type TextWrapProps = TextProps & {
  children?: any,
  style?: TextStyle,
  onPress?: () => void,
  color?: string | 'error' | 'success' | 'info' | 'warning' | 'inactive',
  size?:
    | 'header'
    | 'title'
    | 'desc'
    | 'button'
    | 'info'
    | 'subTitle'
    | 'regular',
  weight?: 'bold' | 'regular' | 'thin',
  type?:
    | Array<'italic' | 'underline' | 'chip'>
    | 'italic'
    | 'underline'
    | 'chip',
  isLoading?: boolean,
  position?: 'left' | 'center' | 'right',
};
type TextAlign = 'left' | 'center' | 'right' | 'auto' | 'justify' | undefined;

function index({
  color = COLOR_FONT_PRIMARY_DARK,
  children,
  style,
  onPress,
  type,
  weight = 'regular',
  size = 'regular',
  isLoading = false,
  position = 'left',
  ...rest
}: TextWrapProps) {
  const getColorMapping = (): TextStyle => {
    const colorMapping: Record<string, TextStyle> = {
      error: {
        backgroundColor: COLOR_BACKGROUND_ERROR,
        color: COLOR_EVENT_ERROR,
      },
      success: {
        backgroundColor: COLOR_BACKGROUND_SUCCESS,
        color: COLOR_EVENT_SUCCESS,
      },
      info: {
        backgroundColor: COLOR_BACKGROUND_INFORMATION,
        color: COLOR_EVENT_INFORMATION,
      },
      warning: {
        backgroundColor: COLOR_BACKGROUND_WARNING,
        color: COLOR_EVENT_WARNING,
      },
      inactive: {
        backgroundColor: COLOR_BACKGROUND_INACTIVE,
        color: COLOR_EVENT_INACTIVE,
      },
    };
    return colorMapping[color] || {};
  };

  const fontSizeMapping = {
    header: FONT_SIZE_HEADER,
    title: FONT_SIZE_TITLE,
    subTitle: FONT_SIZE_SUBTITLE,
    desc: FONT_SIZE_DESC,
    regular: FONT_SIZE_REGULAR,
    info: FONT_SIZE_INFO,
  };

  const fontWeightMapping = {
    bold: 'Inter-Bold',
    regular: 'Inter-Regular',
    thin: 'Inter-ExtraLight',
  };

  const positionMapping: object = {
    left: 'left',
    center: 'center',
    right: 'right',
    auto: 'auto',
    justify: 'justify',
  };

  const textAlign: TextAlign = positionMapping[position] || 'auto';

  const coreText = () => {
    let textStyle: TextStyle = {
      fontFamily: fontWeightMapping[weight],
      fontSize: fontSizeMapping[size],
      textAlign,
      color,
    };

    if (type) {
      const typeArray = Array.isArray(type) ? type : [type];

      if (typeArray.includes('italic')) {
        textStyle.fontStyle = 'italic';
      }

      if (typeArray.includes('underline')) {
        textStyle.textDecorationLine = 'underline';
      }

      if (typeArray.includes('chip')) {
        const colorStyles = getColorMapping(); // Get color styles based on the color prop
        textStyle = {
          ...textStyle,
          ...colorStyles,
          borderRadius: 12,
          padding: 6,
        }; // Merge color styles with existing styles
      }
    }

    return (
      <Text style={[textStyle, style]} onPress={onPress} {...rest}>
        {children}
      </Text>
    );
  };

  if (isLoading) {
    return (
      <LoadingWraper isLoading={true} randomSize>
        {coreText()}
      </LoadingWraper>
    );
  } else return <>{coreText()}</>;
}

export default index;
