import React, { useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_FONT_PRIMARY_DARK } from '@themes/index';
import { Button } from '@components';

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
  color = COLOR_FONT_PRIMARY_DARK,
  style = {},
  onPress = null,
}) => {
  if (name) {
    if (onPress == null) {
      return <Icon name={name} size={size} color={color} style={style} />;
    } else {
      return (
        <Button onPress={onPress}>
          <Icon name={name} size={size} color={color} style={style} />
        </Button>
      );
    }
  }
};

export default App;
