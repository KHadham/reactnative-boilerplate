import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_WHITE,
} from '@themes/index';
import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { FastImage, Icon } from '@components';
import Help from '../../../assets/svgs/Help';
import { goBack,useNavigationHandler } from '@utils/navigation';
import { Text } from '@components';
import styles from './styles';
import { spacing } from '@constants/spacing';
import { isImageAsset, isImageUrl } from '@utils/index';

type Props = {
  left?: ImageSourcePropType | string | ReactNode,
  title?: string,
  right?: string,
  shadow?: boolean,
  onPressRight?: Function,
};

const Component: React.FC<Props> = ({
  left = 'back',
  title,
  right,
  shadow,
  onPressRight,
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
    } else if (isImageAsset(left) || isImageUrl(left)) {
      return (
        <View style={{ flex:1,justifyContent:'center' }}>
          <Image
            source={left as ImageSourcePropType}
            style={{ height: 50, width: 50,position:'absolute' }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </View>
      );
    }
    // else if (typeof left === 'object' && left !== null) {
    //   return left
    // }
    else return null;
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
    if (right == 'bantuan') {
      return (
        <TouchableOpacity style={{ padding: 10 }}>
          <Help />
        </TouchableOpacity>
      );
    } else
      return (
        <TouchableOpacity
          onPress={() => onPressRight()}
          style={{ padding: 10 }}
        >
          <Text size="desc">{right}</Text>
        </TouchableOpacity>
      );
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
