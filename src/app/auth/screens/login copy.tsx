import React from 'react';
import { View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { BaseView, Text, Input, Button, Icon } from '@components';
import { spacing } from '@constants/spacing';
import { COLOR_WHITE } from '@themes/index';
import IMAGES from '@images';
import useLogin from '@authApp/hooks/useLogin';
import useForm from '../../../hooks/useForm';
import { SideComponent } from '@components/Input/indexx';

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

const Screen = () => {
  const { action, state, setState } = useLogin();

  const { values, refs, errors, handleFieldChange, validateForm, moveFocus } =
    useForm(initialFields);

  return (
    <BaseView bg={IMAGES.bgCitata}>
      <StatusBar translucent backgroundColor={'transparent'} />
      {/* <View
        style={{
          padding: spacing.lg,
          paddingVertical: spacing.xxl,
          gap: 10,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Image
            source={IMAGES.iconCitata}
            style={{ height: 100, width: 100 }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </View>
        <Text size="header" weight="bold" color={COLOR_WHITE}>
          Masuk Akun
        </Text>
        <Text size="subTitle" color={COLOR_WHITE}>
          Silakan masuk dengan Akun yang terdaftar
        </Text>
      </View> */}
      <View style={styles.botLoginWrap}>
        {initialFields.map((item, index) => (
          <Input
            rightComponent={
              <SideComponent>
                <Text>Ubah</Text>
                <Icon name="chevron-down" />
              </SideComponent>
            }
            label={item.fieldName}
            ref={refs[item.fieldName]}
            key={index}
            value={values[item.fieldName]}
            placeholder={`Masukan ${item.fieldName}`}
            onInteract={(txt: string) => handleFieldChange(item.fieldName, txt)}
            error={errors[item.fieldName]}
            type={item.type}
            onSubmitEditing={() => moveFocus(item.fieldName)}
          />
        ))}
        <View style={{ marginVertical: spacing.sm }}>
          <Button
            title="Masuk"
            onPress={() => validateForm()}
            icon="arrow-right-bold-box-outline"
          />
        </View>
      </View>
    </BaseView>
  );
};

export default Screen;
