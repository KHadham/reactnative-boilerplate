import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { BaseView, Text, Icon, Header, Input } from '@components';
import { useHooks } from '@semeterApp/hooks/form';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { spacing } from '@constants/spacing';

interface AppProps {
  props1: string;
  props2: number;
}

const App: React.FC<AppProps> = ({ props1 = 'default value', props2 }) => {
  const { data } = useHooks();
  const [first, setfirst] = useState('');

  const renderItem = ({ item, index }) => {
    return <Input value={'123'} label={`label ${item.DESCRIPTION}`} />;
  };

  console.log('data :>> ', data.length);

  return (
    <BaseView>
      <Header title="Tambah reklame" shadow />
      <FlatList
        contentContainerStyle={{ padding: spacing.md, flex: 1 }}
        data={data}
        renderItem={renderItem}
      />
    </BaseView>
  );
};

export default App;
