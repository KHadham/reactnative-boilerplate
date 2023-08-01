import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { Icon } from '@components';
import { navigate } from '@utils/navigation';
import { BaseView, Text } from '@components';
import { useBearStore } from '../stores/stores';
import { useHooks } from '@homeApp/hooks';

const App: React.FC = () => {
  const { getSlides } = useHooks();
  const bears = useBearStore(state => state.bears);

  const [first, setfirst] = useState('');

  return (
    <BaseView style={{}}>
      <View style={{}}>
        <Icon name={'chevron-left'} size={30} />
        <Text weight="bold" style={{}}>
          home
        </Text>
      </View>
    </BaseView>
  );
};

export default App;
