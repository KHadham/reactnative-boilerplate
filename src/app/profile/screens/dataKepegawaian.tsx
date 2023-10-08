import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
// import styles from './styles';
import { navigate } from '@utils/navigation';
import { BaseView, Text, Icon, Header, Input, Button } from '@components';
import { FlashList, } from '@shopify/flash-list';
import { spacing } from '@constants/spacing';
import { toTitleCase } from '@utils/index';
import { useProfile } from '@profileApp/hooks/useProfile';
import { unexpectedData } from '../stores/interfaces';
import { COLOR_BACKGROUND, COLOR_EVENT_WARNING } from '@themes/index';
// import { useBearStore } from './../stores/stores';

const App: React.FC = () => {
  const { dataEmployee } = useProfile();
  const [isEditable, setisEditable] = useState(false)

  const renderItem = ({ item }: { item: [key: string, value: any] }) => {
    const [key, value] = item;
    return (
      <View style={{ paddingHorizontal: spacing.md }}>
        <Input editable={isEditable} value={value} label={toTitleCase(key)} />
      </View>
    );
  };
  
  return (
    <BaseView containerColor={COLOR_BACKGROUND} >
      <Header
        shadow
        title="Data Kepegawaian"
        right={
          <TouchableOpacity onPress={()=>setisEditable(!isEditable)}>
            <Icon name={isEditable?'pen':'pen-off'} color={COLOR_EVENT_WARNING} />
          </TouchableOpacity>
        }
      />
      <FlashList
        data={Object.entries(dataEmployee)}
        renderItem={renderItem} estimatedItemSize={80}
        ListFooterComponent={
          <Button
            color={'info'}
            style={{ margin: spacing.md }}
            title="Ubah data"
            // onPress={() => setbaseModal('logout')}
            type="outline"
          />
        }
      />
    </BaseView>
  );
};

export default App;
