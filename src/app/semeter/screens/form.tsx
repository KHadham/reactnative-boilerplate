import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { BaseView, Header, Input, Button } from '@components';
import { useHooks } from '@semeterApp/hooks/useGetForm';
import { spacing } from '@constants/spacing';
// import { useForm } from '@hooks';
import useForm, { InitialFieldsType } from '../../../hooks/useForm';

import { useNavigationHandler } from '@utils/navigation';
import Toast from 'react-native-toast-message';

const MemoizedInput = React.memo(Input);

const App = () => {
  const { pop, getParam } = useNavigationHandler();

  const params = getParam();
  const [images, setImages] = useState(undefined);
  const { data, isLoading } = useHooks();

  const dataFiltered: InitialFieldsType = data.filter(obj => obj.NAME !== "Hidden");

  const {
    values,
    inputRefs,
    errors,
    handleFieldChange,
    validateForm,
    moveFocus,
    scrollRefs,
  } = useForm(
    dataFiltered,
    () => {
      handleSubmit;
    },
    'LABEL'
  );
  const handleInput = useCallback(
    (label, value) => {
      const allowedLabels = [
        'kd_kel',
        'kd_kel_pmlk_ijin',
        'kd_kel_pmlk_ijin_ktn',
      ];
      if (allowedLabels.includes(label)) {
        handleLocationInput(label, value);
      } else {
        handleFieldChange({ fieldKey: label, value });
      }
    },
    [handleFieldChange]
  );

  const handleLocationInput = (label, value) => {
    handleFieldChange({ fieldKey: label, value });
    handleFieldChange({
      fieldKey: `kec${label !== 'kd_kel' ? label.replace('kd_kel_', '_') : ''}`,
      value: {
        label: value['NAMA_KECAMATAN'],
        value: value['KODE_KECAMATAN'],
      },
    });
    handleFieldChange({
      fieldKey: `wil${label !== 'kd_kel' ? label.replace('kd_kel_', '_') : ''}`,
      value: {
        label: value['NAMA_KABUPATEN'],
        value: value['KODE_KABUPATEN'],
      },
    });
  };

  const typeMapping = {
    0: 'text',
    1: 'text',
    2: 'area',
    3: 'hidden',
    4: 'date',
    5: 'radio',
  };

  const handleSubmit = () => {
    Toast.show({
      type: 'success',
      text1: 'Berhasil Menambah Reklame',
    });
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      if (typeMapping[item.TYPE] !== 'hidden') {
        return (
          <MemoizedInput
            isLoading={isLoading}
            value={values[item.LABEL]}
            ref={inputRefs[item.LABEL]}
            label={item.DESCRIPTION}
            onInteract={val => {
              handleInput(item.LABEL, val);
            }}
            type={typeMapping[item.INPUT_TYPE_ID]}
            data={item.SELECTION}
            error={
              errors[item.LABEL] && `${item.DESCRIPTION} tidak boleh kosong`
            }
            editable={!item.DISABLE}
            labelSelection={
              item.LABEL === 'kd_kel' ||
              item.LABEL === 'kd_kel_pmlk_ijin' ||
              item.LABEL === 'kd_kel_pmlk_ijin_ktn'
                ? 'NAMA_KELURAHAN'
                : 'label'
            }
            valueSelection={
              item.LABEL === 'kd_kel' ||
              item.LABEL === 'kd_kel_pmlk_ijin' ||
              item.LABEL === 'kd_kel_pmlk_ijin_ktn'
                ? 'KODE_KELURAHAN'
                : 'value'
            }
          />
        );
      }
    },
    [values, inputRefs, handleInput, errors]
  );

  return (
    <BaseView>
      <Header title="Tambah reklame" shadow />
      <View style={{ paddingHorizontal: spacing.md, flex: 1 }}>
        <FlatList
          ref={scrollRefs}
          ListFooterComponent={
            <MemoizedInput
              value={images}
              label={'Foto'}
              onInteract={val => {
                setImages(() => val);
              }}
              type={'image'}
            />
          }
          data={dataFiltered}
          renderItem={renderItem}
          keyboardShouldPersistTaps="always"
        />
        <Button
          disabled={isLoading}
          onPress={() => validateForm()}
          title="Simpan Reklame"
        />
      </View>
    </BaseView>
  );
};

export default App;
