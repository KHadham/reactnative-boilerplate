import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_WHITE,
} from '@themes/index';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from '@components';
import Help from '../../../assets/svgs/Help';
import { goBack } from '@utils/navigation';
import { Text } from '@components';
import styles from './styles';
import { spacing } from '@constants/spacing';

type Props = {
  left?: string,
  title?: string,
  right?: string,
  shadow?: boolean,
  onPressRight?: Function,
  onPressLeft?: Function,
};

const Component: React.FC<Props> = ({
  left = 'back',
  title,
  right,
  shadow,
  onPressRight,
  onPressLeft,
}) => {
  const leftComponent = () => {
    if (left == 'back') {
      return (
        <TouchableOpacity
          style={{  }}
          onPress={() => goBack()}
        >
          <Icon name={'chevron-left'} size={30} />
        </TouchableOpacity>
      );
    } else return null;
    // else if (left == 'null') {
    //   return (
    //     <TouchableOpacity style={{ padding: 10 }} onPress={() => goBack()}>
    //       <Icon name={'chevron-left'} size={30} />
    //     </TouchableOpacity>
    //   );
    // }
  };

  const midComponent = () => (
    <View style={{ flex: 5, justifyContent: 'center',  }}>
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
