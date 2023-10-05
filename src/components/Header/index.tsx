import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_WHITE,
} from '@themes/index';
import React, { ReactNode, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { FastImage, Icon, Input,  } from '@components';
import Help from '../../../assets/svgs/Help';
import { goBack, useNavigationHandler } from '@utils/navigation';
import { Text } from '@components';
import styles from './styles';
import { spacing } from '@constants/spacing';
import { isImageAsset, isImageUrl } from '@utils/index';

type Props = {
  left?: ImageSourcePropType | string | ReactNode,
  title?: string,
  right?: ReactNode,
  shadow?: boolean,
};

const Component: React.FC<Props> = ({
  left = 'back',
  title,
  right,
  shadow,
}) => {
  const { goBack } = useNavigationHandler();

  // const isReactNode = (value: any): value is ReactNode => {
  //   return typeof value === 'object' && value !== null;
  // };

  const leftComponent = () => {
    if (left == 'back') {
      return (
        <TouchableOpacity style={{}} onPress={() => goBack()}>
          <Icon name={'chevron-left'} size={30} />
        </TouchableOpacity>
      );
    } 
    if (left == undefined) {
      return null
    }
    else return left
  };

  const leftComponentx = () => {

    if (left == 'back') {
      return (
        <TouchableOpacity style={{}} onPress={() => goBack()}>
          <Icon name={'chevron-left'} size={30} />
        </TouchableOpacity>
      );
    } else if (isImageAsset(left) || isImageUrl(left)) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image
            source={left as ImageSourcePropType}
            style={{ height: 50, width: 50, position: 'absolute' }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </View>
      );
    }
    else return null
  };

  const midComponent = () => (
    <View style={{ flex: 5, justifyContent: 'center', }}>
      {title && (
        <Text size="header" weight="bold">
          {title}
        </Text>
      )}
    </View>
  );

  const rightComponent = () => {
    if (right == undefined) {
      return null
    }
    else return right
  };

  return (
    <View style={[styles.container, shadow && styles.shadowing]}>
      {leftComponent()}
      {midComponent()}
      {rightComponent()}
    </View>
  );
};

export default Component;
