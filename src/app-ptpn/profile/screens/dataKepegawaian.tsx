import React, { useEffect, useState } from 'react';
import { View ,TextInput} from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
// import styles from './styles';
import { navigate } from '@utils/navigation';
import { BaseView, Text, Icon, Header, Input } from '@components';
import { FlashList,  } from '@shopify/flash-list';
import { spacing } from '@constants/spacing';
import { toTitleCase } from '@utils/index';
import { useProfile } from '@profileApp/hooks/useProfile';
import { unexpectedData } from '../stores/interface';
import { COLOR_BACKGROUND } from '@themes/index';
// import { useBearStore } from './../stores/stores';

const App: React.FC = () => {
  const { data } = useProfile();

  const renderItem = ({ item }: { item: [key: string, value: any] }) => (
    <View style={{ paddingHorizontal:spacing.md }}>
      <Input value={item[1]} label={toTitleCase(item[0])} />
    </View>
  );
  // const filteredData = Object.keys(data.employee).reduce((result, key) => {
  //   if (key in unexpectedData) {
  //     return result;
  //   }
  //   return { ...result, [key]: data.employee[key] };
  // }, {});

  return (
    <BaseView containerColor={COLOR_BACKGROUND}>
      <Header title="Data Kepegawaian" />
      <FlashList data={Object.entries(data.employee)} renderItem={renderItem} estimatedItemSize={80} />
    </BaseView>
  );
};

export default App;
