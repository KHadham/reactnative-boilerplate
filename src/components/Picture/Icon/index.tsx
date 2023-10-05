import React from 'react';
import { ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_EVENT_INACTIVE } from '@themes/index';

/**
 * MaterialCommunityIcons icon set component.
 * Usage: <Icon name="icon-name" size={20} color="#4F8EF7" />
 */

// explore icon from here
// https://pictogrammers.com/library/mdi/
interface AppProps {
  name: string | string[];
  size?: number;
  color?: string;
  onPress?: Function | null;
  style?: ViewStyle;
}

const App: React.FC<AppProps> = ({
  name = '',
  size = 22,
  color = COLOR_EVENT_INACTIVE,
  style = {},
  onPress = null,
}) => {

  if (name) {
    return (
      <Icon
        name={name}
        size={size}
        color={color}
        disabled={onPress == null}
        onPress={onPress}
        style={style}
      />
    );
  }
};

export default App;
