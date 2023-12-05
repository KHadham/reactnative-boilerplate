import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  Ref,
} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { getNumberOnly, toTitleCase } from '@utils/index';
import {
  COLOR_EVENT_ERROR,
  COLOR_EVENT_INACTIVE,
  COLOR_EVENT_SUCCESS,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_WHITE,
  COLOR_FONT_PRIMARY_LIGHT,
  COLOR_BACKGROUND,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_GREY,
  COLOR_GREY_LIGHT,
  COLOR_BACKGROUND_ERROR,
  COLOR_BACKGROUND_SUCCESS,
  COLOR_BORDER,
} from '@themes/index';
import { Text, Icon, ModalList, Button } from '@components';
import { Otp, ImagePicker } from '@components/Input/indexx';
import { heightByScreen } from '@utils/dimensions';
import { InputProps, TypeListConfigMap } from './types';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { spacing } from '@constants/spacing';

const Component: ForwardRefRenderFunction<TextInput, InputProps> = (
  {
    label,
    value = undefined,
    onInteract,
    error = '',
    success = '',
    required = '',
    type = 'text',
    data = [],
    length = 6,
    borderRadius = 10,
    style,
    left = null,
    right = null,
    editable = true,
    ...rest
  },
  ref: Ref<TextInput>
) => {
  const [usrInput, setusrInput] = useState(value);
  const [isSelected, setisSelected] = useState(false);
  const [isModalShow, setisModalShow] = useState(false);
  const [isPickerShow, setisPickerShow] = useState(false);
  const [isFocus, setisFocus] = useState(false);
  const [showPass, setshowPass] = useState(type == 'password');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    setusrInput(value);
    setisSelected(value);
  }, [value]);

  useEffect(() => {
    // LayoutAnimationHandler();
  }, [value, error, isFocus, usrInput]);

  const typeListConfig: TypeListConfigMap = {
    otp: { keyboardType: 'default' },
    text: { keyboardType: 'default' },
    username: { keyboardType: 'default', icon: 'account' },
    phone: {
      icon: 'phone',
      keyboardType: 'phone-pad',
      validation: getNumberOnly,
    },
    number: {
      keyboardType: 'decimal-pad',
      validation: getNumberOnly,
    },
    password: {
      icon: ['eye', 'eye-off'],
      onPress: () => setshowPass(!showPass),
      state: showPass,
      keyboardType: 'default',
    },
    area: {
      icon: 'resize-bottom-right',
      keyboardType: 'default',
    },
    search: {
      icon: 'magnify',
      keyboardType: 'default',
    },
    email: {
      icon: 'email-outline',
      keyboardType: 'email-address',
    },
    time: {
      icon: 'clock-outline',
      onPress: () => setDatePickerVisibility(!isDatePickerVisible),
      keyboardType: 'default',
      typeable: false,
    },
    date: {
      icon: 'calendar-month',
      onPress: () => setDatePickerVisibility(!isDatePickerVisible),
      keyboardType: 'default',
      typeable: false,
    },
    image: {
      icon: 'file-image-plus-outline',
      onPress: () => setisPickerShow(!isPickerShow),
      keyboardType: 'default',
      typeable: false,
    },
    switch: {
      onPress: () => setisSelected(!isSelected),
      keyboardType: 'default',
      typeable: false,
      state: isSelected,
    },
    check: {
      // todo
      icon: 'chevron-down',
      keyboardType: 'default',
      typeable: false,
      onPress: () => setisModalShow(!isModalShow),
    },
    radio: {
      // icon: ['radiobox-marked', 'radiobox-blank'],
      icon: 'chevron-down',
      keyboardType: 'default',
      typeable: false,
      onPress: () => setisModalShow(!isModalShow),
      // state: isSelected,
    },
  };

  const fieldStateBorder = () => {
    if (isFocus) return COLOR_BASE_PRIMARY_DARK;
    else if (success) return COLOR_EVENT_SUCCESS;
    else if (error) return COLOR_EVENT_ERROR;
    else if (!editable) return COLOR_FONT_PRIMARY_LIGHT;
    else return COLOR_BORDER;
  };

  const fieldStateBackground = () => {
    if (!editable) return COLOR_EVENT_INACTIVE;
    else if (error) return COLOR_BACKGROUND_ERROR;
    else if (success) return COLOR_BACKGROUND_SUCCESS;
    else return COLOR_WHITE;
  };

  const icons = () => {
    const typeConfig = typeListConfig[type];
    if (typeConfig) {
      if (typeof typeConfig.icon === 'string') {
        return typeConfig.icon;
      } else if (Array.isArray(typeConfig.icon)) {
        return typeConfig.state ? typeConfig.icon[0] : typeConfig.icon[1];
      }
    }
  };

  const rightComponent = () => {
    if (isFocus && usrInput !== '') {
      return (
        <TouchableOpacity
          style={styles.SideInputItemWrap}
          onPress={() => onInteract('')}
        >
          <Icon name={'close'} size={22} color={COLOR_EVENT_ERROR} />
        </TouchableOpacity>
      );
    } else if (type == 'switch') {
      return (
        <View style={styles.SideInputItemWrap}>
          <Switch
            value={value}
            onValueChange={() => {
              handleFieldPress();
            }}
          />
        </View>
      );
    } else if (typeListConfig[type].icon) {
      return (
        <>
          {typeListConfig[type].typeable == false && (
            <View style={styles.sideInputBorder} />
          )}
          <TouchableOpacity
            disabled={typeListConfig[type].onPress == undefined}
            style={[
              styles.SideInputItemWrap,
              type == 'area' && { alignItems: 'flex-end', paddingBottom: 12 },
            ]}
            onPress={() => typeListConfig[type].onPress()}
          >
            <Icon name={icons()} size={22} color={COLOR_FONT_PRIMARY_DARK} />
          </TouchableOpacity>
        </>
      );
    } else if (right) {
      return (
        <>
          <View style={styles.sideInputBorder} />
          <View style={styles.SideInputItemCustom}>{right}</View>
        </>
      );
    }
  };

  const leftComponent = () => {
    if (left)
      return (
        <>
          <View style={styles.SideInputItemCustom}>{left}</View>
          <View style={styles.sideInputBorder} />
        </>
      );
  };

  const disableState = () => {
    if (
      !typeListConfig[type].typeable &&
      typeListConfig[type].onPress !== undefined &&
      editable == false
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleFieldPress = () => {
    if (disableState) {
      if (typeListConfig[type]?.onPress !== undefined) {
        typeListConfig[type].onPress();
      }
    }
  };

  const basicInput = () => {
    return (
      <TouchableOpacity
        disabled={disableState()}
        onPress={() => handleFieldPress()}
        style={{
          borderRadius: borderRadius,
          borderColor: fieldStateBorder(),
          height: type == 'area' ? 120 : heightByScreen(7),
          backgroundColor: fieldStateBackground(),
          borderWidth: 1,
          marginVertical: 4,
          flexDirection: 'row',
        }}
      >
        {leftComponent()}
        {Array.isArray(value) ? (
          <ScrollView
            horizontal
            style={{
              flexDirection: 'row',
              flex: 1,
            }}
          >
            {value.length == 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  paddingHorizontal: spacing.xs,
                }}
              >
                <Text color={COLOR_FONT_PRIMARY_LIGHT}>{rest.placeholder}</Text>
              </View>
            ) : (
              value.map((item, index) => (
                <Button
                  key={index}
                  title={item.label}
                  type="outline"
                  icon="close"
                  style={{
                    marginRight: spacing.xs,
                  }}
                  rippleRadius={borderRadius}
                  onPress={() => {
                    if (index >= 0 && index < usrInput.length) {
                      usrInput.splice(index, 1); // Remove one element at the specified index
                      onInteract(usrInput);
                    }
                  }}
                />
              ))
            )}
          </ScrollView>
        ) : (
          <TextInput
            keyboardType={typeListConfig[type].keyboardType ?? 'default'}
            ref={ref}
            {...rest}
            onFocus={e => {
              if (rest.onFocus) rest.onFocus(e);
              setisFocus(true);
            }}
            onBlur={e => {
              if (rest.onBlur) rest.onBlur(e);
              setisFocus(false);
            }}
            value={usrInput}
            onChangeText={txt => {
              const validationFunction = typeListConfig[type]?.validation;
              const finalValue = validationFunction
                ? validationFunction(txt)
                : txt;
              onInteract(finalValue);
            }}
            style={styles.innerInput}
            placeholderTextColor={COLOR_FONT_PRIMARY_LIGHT}
            multiline={type == 'area'}
            textAlignVertical={type == 'area' ? 'top' : 'center'}
            editable={typeListConfig[type].typeable ?? editable}
            secureTextEntry={type == 'password' && showPass}
          />
        )}

        {rightComponent()}
      </TouchableOpacity>
    );
  };

  const labelText = () => {
    if (label) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text weight="bold">{label}</Text>
          {required && (
            <Text weight="bold" color={COLOR_EVENT_ERROR}>
              {' '}
              *
            </Text>
          )}
        </View>
      );
    }
  };

  const messageInfo = () => {
    let iconName: string, iconColor: string, text: string | boolean;
    if (error) {
      iconName = 'alert-outline';
      iconColor = COLOR_EVENT_ERROR;
      text = error;
    } else if (success) {
      iconName = 'check';
      iconColor = COLOR_EVENT_SUCCESS;
      text = success;
    } else if (required) {
      iconName = 'alert-circle-outline';
      iconColor = COLOR_FONT_PRIMARY_DARK;
      text = required;
    }
    if (typeof text !== 'boolean' && iconName) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={iconName} size={16} color={iconColor} />
          <Text style={{ color: iconColor }}> {text}</Text>
        </View>
      );
    }
    // if (Array.isArray(error)) {
    //   error.map(txt => {
    //     return (
    //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <Icon name={'alert-outline'} size={16} color={COLOR_EVENT_ERROR} />
    //         <Text style={{ color: iconColor }}> {txt}</Text>
    //       </View>
    //     );
    //   });
    // } else {
    //   if (typeof text !== 'boolean' && iconName) {
    //     return (
    //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <Icon name={iconName} size={16} color={iconColor} />
    //         <Text style={{ color: iconColor }}> {text}</Text>
    //       </View>
    //     );
    //   }
    // }
  };

  const mainInput = () => {
    if (type == 'otp') {
      return (
        <Otp
          value={value}
          length={length}
          onInteract={values => onInteract(values)}
          editable={editable}
        />
      );
    } else if (type == 'image') {
      return (
        <ImagePicker
          data={value}
          onInteract={data => onInteract(data)}
          borderRadius={borderRadius}
        />
      );
    } else return basicInput();
  };

  return (
    <KeyboardAvoidingView style={[{ paddingVertical: 8 }, style]}>
      {labelText()}
      {mainInput()}
      {messageInfo()}
      {(type == 'date' || type == 'time') && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={type}
          onConfirm={data => {
            onInteract(
              dayjs(data).format(type == 'time' ? 'HH:mm' : 'DD/MM/YYYY')
            );
            setDatePickerVisibility(!isDatePickerVisible);
          }}
          onCancel={() => setDatePickerVisibility(false)}
          locale="en_GB"
          is24Hour={true}
        />
      )}
      {/* todo multipicker */}
      {data?.length !== 0 && (type == 'check' || type == 'radio') && (
        <ModalList
          type={type}
          isVisible={isModalShow}
          data={data}
          isSearch={true}
          onClose={() => setisModalShow(false)}
          selectedValue={usrInput}
          onSelect={(data: any) => onInteract(data)}
          title={label}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default forwardRef(Component);
// supaya tombol di child bisa di pencet
// tambahin ini di setiap scrollview / flatlist ==>
//  keyboardShouldPersistTaps='always'
