import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from '../styles';
import { BaseView, Text, Input, Header, Icon } from '@components';
import { spacing } from '@constants/spacing';
import { COLOR_WHITE } from '@themes/index';
import IMAGES from '@images';
import useLogin from '@authApp/hooks/useLogin';
import useForm from '../../../hooks/useForm';
import { SideComponent } from '@components/Input/indexx';
import { widthByScreen } from '@utils/dimensions';
import { scrollToIndexHorizontal } from '@utils/uiHandler';

const initialFields = [
  {
    fieldName: 'text',
    type: 'text',
  },
  {
    fieldName: 'text area',
    type: 'area',
  },
  {
    fieldName: 'password',
    type: 'password',
  },
  {
    fieldName: 'search',
    type: 'search',
  },
  {
    fieldName: 'nomer telepon',
    type: 'phone',
  },
  {
    fieldName: 'nomer ktp',
    type: 'number',
  },
  {
    fieldName: 'email',
    type: 'email',
  },

  // {
  //   fieldName: 'area',
  //   type: 'area',
  // },
  // {
  //   fieldName: 'time',
  //   type: 'time',
  // },
  // {
  //   fieldName: 'date',
  //   type: 'date',
  // },
  // {
  //   fieldName: 'image',
  //   type: 'image',
  // },
  // {
  //   fieldName: 'select',
  //   type: 'select',
  // },
  // {
  //   fieldName: 'check',
  //   type: 'check',
  // },
  // {
  //   fieldName: 'radio',
  //   type: 'radio',
  // },
  // {
  //   fieldName: 'switch',
  //   type: 'switch',
  // },
  // {
  //   fieldName: 'otp',
  //   type: 'otp',
  // },
];

const stateField = [
  {
    fieldName: 'normal',
    type: 'text',
  },
  {
    fieldName: 'error',
    type: 'text',
    error: 'format salah',
  },
  {
    fieldName: 'success / focused',
    type: 'text',
    success: 'username tersedia'
  },
  {
    fieldName: 'disabled',
    type: 'text',
    editable: false,
  },
];

const basicAnatomy = [
  {
    fieldName: '',
    type: 'text',
    info: 'gak pake label',
  },
  {
    fieldName: 'pake label',
    type: 'text',
  },
  {
    fieldName: 'required aja',
    type: 'text',
    info: true,
  }, {
    fieldName: 'required pake label',
    type: 'text',
    info: 'password harus ada angka dan huruf besar nya',
  },
];

const customField = [
  {
    fieldName: 'left icon',
    type: 'text',
    left: 'account',
  },
  {
    fieldName: 'right icon',
    type: 'text',
    right: 'email',
  },
  {
    fieldName: 'left & text icon',
    type: 'text',
    left: 'currency-usd',
    leftText: 'mata uang',
  },
  {
    fieldName: 'right & text icon',
    type: 'text',
    right: 'email',
    rightText: 'email',
  },
  {
    fieldName: 'left text & right icon',
    type: 'text',
    right: 'flag-variant',
    leftText: 'pilih negara',
  },
  {
    fieldName: 'right text & left icon',
    type: 'text',
    left: 'star-crescent',
    rightText: 'pilih agama',
  },
];

const keyboardType = [
  {
    fieldName: 'tipe username',
    type: 'username',
  },
  {
    fieldName: 'tipe search',
    type: 'search',
  }, {
    fieldName: 'tipe password',
    type: 'password',
  },
  {
    fieldName: 'tipe email',
    type: 'email',
  },
  {
    fieldName: 'tipe nomer telepon',
    type: 'phone',
  },
  {
    fieldName: 'tipe number with custom right icon',
    type: 'number',
    right: 'weight-kilogram'
  },
]

const booleanField = [
  {
    fieldName: 'radio',
    type: 'radio',
  }, {
    fieldName: 'check',
    type: 'check',
  },
  {
    fieldName: 'switch',
    type: 'switch',
  },
  {
    fieldName: 'switch disabled',
    type: 'switch',
    editable: false,
  },
]

const variantField = [
  {
    fieldName: 'date picker',
    type: 'date',
    right: 'email',
  },
  {
    fieldName: 'time picker',
    type: 'time',
    right: 'email',
    editable: false,
  },
  {
    fieldName: 'image picker',
    type: 'image',
    right: 'email',
  },
  {
    fieldName: 'area',
    type: 'area',
  },
  {
    fieldName: 'multi picker dropdown',
    type: 'check',
    right: 'chevron-down',
    data: ['otomotif', 'outdoor', 'elektronik', 'perabotan', 'fashion', 'sparepart', 'tanaman', 'makanan']
  },
  {
    fieldName: 'single picker dropdown',
    type: 'radio',
    right: 'chevron-down',
    data: ['sd', 'smp', 'sma', 's1', 's2', 's3']
  },
  // {
  //   fieldName: 'unit picker',
  //   type: 'unit',
  //   right: 'chevron-down',
  //   rightText: 'Meter',
  //   data: ['meter', 'kilo', 'inch', 'petak', 'ubin']
  // },
  {
    fieldName: 'OTP',
    type: 'otp',
  },
];

const Screen = () => {
  const { action, state, setState } = useLogin();
  const [selected, setselected] = useState(0);
  const { values, refs, errors, handleFieldChange, validateForm, moveFocus } =
    useForm(initialFields);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToIndexHorizontal(selected + 1, scrollViewRef);
  }, [selected]);

  return (
    <BaseView>
      <Header title="Inputan" />
      <FlatList
        style={{ elevation: 5, backgroundColor: COLOR_WHITE, height: 50 }}
        data={['field state', 'anatomy dasar', 'custom field', 'keyboard / icon bawan', 'inputan boolean', 'input spesial']}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setselected(index)}
            style={{
              borderBottomWidth: index == selected ? 1 : 0,
              justifyContent: 'center',
              minWidth: 70,
              flex: 1,
              paddingHorizontal: 20,
            }}
          >
            <Text weight={index == selected ? 'bold' : 'regular'}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <ScrollView
        scrollEnabled={false}
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        keyboardShouldPersistTaps='handled'
      >
        <FlatList
          keyboardShouldPersistTaps='handled'
          removeClippedSubviews={false}
          style={{
            width: widthByScreen(100),
            paddingHorizontal: spacing.lg,
            flex: 1,
          }}
          data={stateField}
          renderItem={({ item, index }) => (
            <Input
              label={item.fieldName}
              ref={refs[item.fieldName]}
              key={index + 1}
              value={values[item.fieldName]}
              placeholder={`Masukan ${item.fieldName}`}
              onInteract={(txt: string) =>
                handleFieldChange(item.fieldName, txt)
              }
              editable={item.editable}
              error={item.error}
              success={item.success}
              type={item.type}
              onSubmitEditing={() => moveFocus(item.fieldName)}
            />
          )}
        />
        <FlatList
          keyboardShouldPersistTaps='handled'
          removeClippedSubviews={false}
          style={{
            width: widthByScreen(100),
            paddingHorizontal: spacing.lg,
            flex: 1,
          }}
          data={basicAnatomy}
          renderItem={({ item, index }) => (
            <Input
              label={item.fieldName}
              ref={refs[item.fieldName]}
              key={index}
              value={values[item.fieldName]}
              placeholder={`Masukan ${item.fieldName}`}
              onInteract={(txt: string) =>
                handleFieldChange(item.fieldName, txt)
              }
              required={item.info}
              type={item.type}
              onSubmitEditing={() => moveFocus(item.fieldName)}
            />
          )}
        />
        <FlatList
          keyboardShouldPersistTaps='handled'
          removeClippedSubviews={false}
          style={{
            width: widthByScreen(100),
            paddingHorizontal: spacing.lg,
            flex: 1,
          }}
          data={customField}
          renderItem={({ item, index }) => (
            <Input
              leftComponent={(item.left || item.leftText) && (
                <SideComponent onPress={() => { }}>
                  <Text>{item.leftText} </Text>
                  <Icon name={item.left} />
                </SideComponent>
              )}
              rightComponent={(item.right || item.rightText) && (
                <SideComponent onPress={() => { }}>
                  <Icon name={item.right} />
                  <Text> {item.rightText}</Text>
                </SideComponent>
              )}
              label={item.fieldName}
              ref={refs[item.fieldName]}
              key={index}
              value={values[item.fieldName]}
              placeholder={`Masukan ${item.fieldName}`}
              onInteract={(txt: string) =>
                handleFieldChange(item.fieldName, txt)
              }
              type={item.type}
              onSubmitEditing={() => moveFocus(item.fieldName)}
            />
          )}
        />
        <FlatList
          keyboardShouldPersistTaps='handled'
          removeClippedSubviews={false}
          style={{
            width: widthByScreen(100),
            paddingHorizontal: spacing.lg,
            flex: 1,
          }}
          data={keyboardType}
          renderItem={({ item, index }) => (
            <Input
              rightComponent={(item.right) && (
                <SideComponent onPress={() => { }}>
                  <Icon name={item.right} />
                </SideComponent>
              )}
              label={item.fieldName}
              ref={refs[item.fieldName]}
              key={index + 2}
              value={values[item.fieldName]}
              onInteract={(value: any) =>
                handleFieldChange(item.fieldName, value)
              }
              type={item.type}
              onSubmitEditing={() => moveFocus(item.fieldName)}
            />
          )}
        />
        <FlatList
          keyboardShouldPersistTaps='handled'
          removeClippedSubviews={false}
          style={{
            width: widthByScreen(100),
            paddingHorizontal: spacing.lg,
            flex: 1,
          }}
          data={booleanField}
          renderItem={({ item, index }) => (
            <Input
              label={item.fieldName}
              ref={refs[item.fieldName]}
              key={index + 3}
              placeholder={`${values[item.fieldName]}`}
              value={values[item.fieldName]}
              onInteract={(value: any) =>
                handleFieldChange(item.fieldName, value)
              }
              type={item.type}
              editable={item.editable}
              onSubmitEditing={() => moveFocus(item.fieldName)}
            />
          )}
        />
        <FlatList
          keyboardShouldPersistTaps='handled'
          removeClippedSubviews={false}
          style={{
            width: widthByScreen(100),
            paddingHorizontal: spacing.lg,
            flex: 1,
          }}
          data={variantField}
          renderItem={({ item, index }) => (
            <Input
              rightComponent={(item.right) && (
                <SideComponent onPress={() => { }}>
                  <Icon name={item.right} />
                </SideComponent>
              )}
              label={item.fieldName}
              ref={refs[item.fieldName]}
              key={index + 4}
              editable={item.editable}
              data={item.data}
              // length={item.type == 'otp' && 6}
              placeholder={`masukan ${item.fieldName}`}
              value={values[item.fieldName]}
              onInteract={(value: any) =>
                handleFieldChange(item.fieldName, value)
              }
              type={item.type}
              onSubmitEditing={() => moveFocus(item.fieldName)}
            />
          )}
        />

      </ScrollView>
    </BaseView>
  );
};

export default Screen;
