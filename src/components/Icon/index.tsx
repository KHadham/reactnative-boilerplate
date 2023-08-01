import React, { useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_FONT_PRIMARY_DARK } from '@themes/index';

/**
 * MaterialCommunityIcons icon set component.
 * Usage: <Icon name="icon-name" size={20} color="#4F8EF7" />
 */

// explore icon from here
// https://pictogrammers.com/library/mdi/
interface AppProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: Function;
  style?: ViewStyle;
}

const App: React.FC<AppProps> = ({
  name = 'plus',
  size = 30,
  color = COLOR_FONT_PRIMARY_DARK,
  style = {},
  onPress,
}) => {
  const [first, setfirst] = useState('');

  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={style}
      onPress={onPress}
    />
  );
};

export default App;
