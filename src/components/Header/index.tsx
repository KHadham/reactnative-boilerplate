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
        <TouchableOpacity style={{ padding: 10 }} onPress={() => goBack()}>
          <Icon name={'chevron-left'} size={30} />
        </TouchableOpacity>
      );
    } 
    // else if (left == 'null') {
    //   return (
    //     <TouchableOpacity style={{ padding: 10 }} onPress={() => goBack()}>
    //       <Icon name={'chevron-left'} size={30} />
    //     </TouchableOpacity>
    //   );
    // }
  };

  const midComponent = () => (
    <View style={{ flex: 5, justifyContent: 'center' }}>
      {title && <Text size="header">{title}</Text>}
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
  const shadowing = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  };

  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: COLOR_WHITE,
        },
        shadow && shadowing,
      ]}
    >
      {leftComponent()}
      {midComponent()}
      {rightComponent()}
    </View>
  );
};

Component.defaultProps = {
  left: 'back',
  title: '',
  right: '',
};

export default Component;