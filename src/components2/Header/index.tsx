import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_WHITE,
} from '@themes/index';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { FastImage, Icon, Input, } from '@components';
import Help from '../../../assets/svgs/Help';
import { useNavigationHandler } from '@utils/navigation';
import { Text } from '@components';
import styles from './styles';
import { spacing } from '@constants/spacing';
import { isImageAsset, isImageUrl } from '@utils/index';
import { isColorDark } from '@utils/uiHandler';

type Props = {
  left?: ImageSourcePropType | string | ReactNode | Function;
  title?: string;
  titlePosition?: 'left'|'center'|'right';
  right?: ReactNode;
  shadow?: boolean;
  transparent?: boolean;
  itemColor?: string;
  backgroundColor?: string;

};

const Component: React.FC<Props> = ({
  left = 'back',
  title,
  titlePosition='center',
  right,
  shadow,
  transparent = false,
  itemColor,
  backgroundColor=COLOR_WHITE ,
}) => {
  const { goBack } = useNavigationHandler();

const colors = () => {
  if (backgroundColor) {
   return isColorDark(backgroundColor ) ? COLOR_WHITE : COLOR_FONT_PRIMARY_DARK
  } else if (itemColor){
    return itemColor
  } else {
    return COLOR_FONT_PRIMARY_DARK
  }
}

  const leftComponent = () => {
    if (left == 'back') {
      return (
        <TouchableOpacity style={{ flex: 1 }} onPress={() => goBack()}>
          <Icon name={'chevron-left'} size={30} color={colors()} />
        </TouchableOpacity>
      );
    } else if (typeof left === 'function') {
      return (
        <TouchableOpacity style={{ flex: 1 }} onPress={() => (left as Function)()}>
          <Icon name={'chevron-left'} size={30} color={colors()}/>
        </TouchableOpacity>
      );
    } else if (left == undefined) {
      return <View style={{ flex: 1 }} />
    } else if (React.isValidElement(left)) {
      return (
        <View style={{ flex: 1 }}>
          {left}
        </View>
      )
    }
  };


  const midComponent = () => (
    <View style={{ flex: 4, justifyContent: 'center' }}>
      {title && (
        <Text style={{ textAlign: titlePosition }} size="title" weight="bold" color={colors()}>
          {title}
        </Text>
      )}
    </View>
  );

  const rightComponent = () => {
    if (right == undefined) {
      return <View style={{ flex: 1 }} />
    }
    else return (
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        {right}
      </View>
    )
  };

  return (
    <View style={[styles.container, shadow && styles.shadowing, !transparent && { backgroundColor: backgroundColor },{gap:spacing.xs}]}>
      {leftComponent()}
      {midComponent()}
      {rightComponent()}
    </View>
  );
};

export default Component;
