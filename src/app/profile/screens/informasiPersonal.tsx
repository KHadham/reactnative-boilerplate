import React, { useEffect, useState } from 'react';
import { View ,TextInput} from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { navigate } from '@utils/navigation';
import { BaseView, Text, Icon, Header, Input } from '@components';
import { useProfileStore } from '@profileApp/stores/storage';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { spacing } from '@constants/spacing';
import { toTitleCase } from '@utils/index';
import { useProfile } from '@profileApp/hooks/useProfile';
import { COLOR_BACKGROUND } from '@themes/index';

const App: React.FC = () => {
  //   const bears = useBearStore(state => state.bears);
  const { data } = useProfile();

  const [first, setfirst] = useState('');

  //   useEffect(() => {
  // Toast.show({
  //   type: 'success',
  //   text1: 'Hello',
  //   text2: 'This is some something 👋'
  // });

  //     return () => {
  //       second;
  //     };
  //   }, []);
  console.log('data.personal :>> ', data.personal);

  const renderItem = ({ item }: { item: [key: string, value: any] }) => (
    <View style={{ paddingHorizontal:spacing.md }}>
      <Input editable={false} value={item[1]} label={toTitleCase(item[0])} />
    </View>
  );

  return (
    <BaseView containerColor={COLOR_BACKGROUND} >
      <Header title="Informasi Personal" />
      <FlashList data={Object.entries(data.personal)} renderItem={renderItem} estimatedItemSize={80} />
    </BaseView>
  );
};

export default App;
