import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import styles from './styles';
import { navigate } from '@utils/navigation';
import { BaseView, Text, Icon, Header, Input, Button } from '@components';
import { useProfileStore } from '@profileApp/stores/storage';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { spacing } from '@constants/spacing';
import { toTitleCase } from '@utils/index';
import { useProfile } from '@profileApp/hooks/useProfile';
import { useUpdateProfile } from '@profileApp/hooks/useUpdateProfile';
import { COLOR_BACKGROUND, COLOR_EVENT_WARNING } from '@themes/index';
import { useForm } from '@hooks';

const App: React.FC = () => {
  const { dataPersonal } = useProfile();
  const { action } = useUpdateProfile();

  const [isEditable, setisEditable] = useState(false);
  console.log('Object.entries(dataPersonal)', Object.entries(dataPersonal));
  const initialFields = Object.entries(dataPersonal).map(
    ([fieldName, fieldDescription]) => ({
      fieldName,
      type: 'text', // You can set a default type if needed
      defaultValue: fieldDescription,
    })
  );

  useEffect(() => {
    console.log('initialFields', initialFields);
  }, [initialFields]);

  const {
    values,
    inputRefs,
    scrollRefs,
    errors,
    handleFieldChange,
    validateForm,
    moveFocus,
  } = useForm(initialFields, () => {}, 'fieldName');

  const renderItem = ({ item }) => {
    console.log('item', item);
    // console.log('values :>> ', values);
    // const [key] = item;
    return (
      <View style={{ paddingHorizontal: spacing.md }}>
        <Input
          ref={inputRefs[item?.fieldName]}
          editable={isEditable}
          onInteract={(txt: string) => handleFieldChange(item?.fieldName, txt)}
          value={values[item?.fieldName]}
          label={toTitleCase(item?.fieldName)}
          onSubmitEditing={() => moveFocus(item?.fieldName)}
          error={errors[item?.fieldName]}
        />
      </View>
    );
  };

  console.log('Object.entries(dataPersonal)', Object.entries(dataPersonal));
  return (
    <BaseView containerColor={COLOR_BACKGROUND}>
      <Header
        shadow
        title="Informasi Personal"
        right={
          <TouchableOpacity onPress={() => setisEditable(!isEditable)}>
            <Icon
              name={isEditable ? 'pen' : 'pen-off'}
              color={COLOR_EVENT_WARNING}
            />
          </TouchableOpacity>
        }
      />
      <FlashList
        keyboardShouldPersistTaps="always"
        ref={scrollRefs}
        data={initialFields}
        renderItem={renderItem}
        estimatedItemSize={80}
        ListFooterComponent={
          <Button
            color={'info'}
            style={{ margin: spacing.md }}
            title="Ubah data"
            onPress={() => validateForm()}
            type="outline"
          />
        }
      />
    </BaseView>
  );
};

export default App;
