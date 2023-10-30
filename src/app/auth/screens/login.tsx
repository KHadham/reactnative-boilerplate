import React from 'react';
import { View, StatusBar, Image } from 'react-native';
import styles from '../styles';
import { BaseView, Text, Input, Button, } from '@components';
import { spacing } from '@constants/spacing';
import { COLOR_WHITE } from '@themes/index';
import IMAGES from '@images';
import useLogin from '@authApp/hooks/useLogin';
import useForm from '../../../hooks/useForm';
import { BlurView } from '@react-native-community/blur';

const initialFields = [
  {
    fieldName: 'username',
    type: 'username',
  },
  {
    fieldName: 'password',
    type: 'password',
  },
];

const Screen = () => {
  const { action, state, setState } = useLogin();
  
  const { values, inputRefs, errors, handleFieldChange, validateForm, moveFocus } =
    useForm(initialFields, action);

  return (
    <BaseView bg={IMAGES.bgCitata}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={styles.logoHeaderWrap}>
        <View style={styles.logoWrap}>
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
      </View>
      <View style={styles.botLoginWrap}>
        <BlurView
          style={styles.blurWrap}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
        >
          <View style={styles.innerLoginWrap}>
            {initialFields.map((item, index) => (
              <Input
                label={item.fieldName}
                ref={inputRefs[item.fieldName]}
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
        </BlurView>
      </View>
    </BaseView>
  );
};

export default Screen;
