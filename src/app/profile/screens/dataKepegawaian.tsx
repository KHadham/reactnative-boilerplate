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
import { useForm } from '@hooks';
// import { useBearStore } from './../stores/stores';

const App: React.FC = () => {
  const { dataEmployee } = useProfile();
  const [isEditable, setisEditable] = useState(false)

  const initialFields = Object.entries(dataEmployee).map(([fieldName, fieldDescription]) => ({
    fieldName,
    type: "text", // You can set a default type if needed
    defaultValue: fieldDescription
  }));

  const { values, inputRefs, errors, handleFieldChange, validateForm, moveFocus } =
    useForm(initialFields, () => { });

  const renderItem = ({ item }: { item: [key: string, value: any] }) => {
    console.log('values :>> ', values);
    const [key] = item;
    return (
      <View style={{ paddingHorizontal: spacing.md }}>
        <Input
          ref={inputRefs[key]}
          editable={isEditable}
          onInteract={(txt: string) => handleFieldChange(key, txt)}
          value={values[key]}
          label={toTitleCase(key)}
          onSubmitEditing={() => moveFocus(key)}
          error={errors[key]}
        />
      </View>
    );
  };

  return (
    <BaseView containerColor={COLOR_BACKGROUND} >
      <Header
        shadow
        title="Data Kepegawaian"
        right={
          <TouchableOpacity onPress={() => setisEditable(!isEditable)}>
            <Icon name={isEditable ? 'pen' : 'pen-off'} color={COLOR_EVENT_WARNING} />
          </TouchableOpacity>
        }
      />
      <FlashList
        keyboardShouldPersistTaps='always'
        data={Object.entries(dataEmployee)}
        renderItem={renderItem}
        estimatedItemSize={80}
        ListFooterComponent={
          <Button
            disabled={!isEditable}
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
