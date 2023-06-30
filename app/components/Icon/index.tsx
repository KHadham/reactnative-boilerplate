import React, { useEffect, useState } from 'react';
import { Icon } from '@components/index';
import { COLOR_FONT_PRIMARY_DARK } from '@app/styles';

interface AppProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: Function;
}

const App: React.FC<AppProps> = ({
  name = 'plus',
  size = 30,
  color = COLOR_FONT_PRIMARY_DARK,
  onPress = () => {},
}) => {
  const [first, setfirst] = useState('');

  return <Icon name={name} size={size} color={color} onPress={onPress} />;
};

export default App;
