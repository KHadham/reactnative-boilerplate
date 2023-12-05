import { getNumberOnly, toTitleCase } from '@utils/index';
import {
  COLOR_EVENT_ERROR,
  COLOR_EVENT_INACTIVE,
  COLOR_EVENT_SUCCESS,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_EVENT_INFORMATION,
  FONT_PRIMARY_MEDIUM,
  COLOR_WHITE,
  COLOR_FONT_PRIMARY_LIGHT,
} from '@themes/index';
import { BaseView, ModalList, Button, Switch } from '@components';

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
  Animated,
  Text,
  TextInput,
  StatusBar,
  Image,
  Keyboard,
  FlatList,
  Easing,
  TouchableWithoutFeedback,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import dayjs from 'dayjs';

import { Icon } from '@components';

import styles from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
// import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import ImagePicker from 'react-native-image-crop-picker';
import { openImagePicker } from '@utils/permissions';

import { heightByScreen } from '@utils/dimensions';
import { LayoutAnimationHandler } from '@utils/uiHandler';
// type TextWrapProps = TextProps & {

type Props = TextInputProps & {
  label?: string,
  error?: any,
  value: any,
  onInteract?: Function,
  type?:
    | 'text'
    | 'password'
    | 'time'
    | 'date'
    | 'select'
    | 'switch'
    | 'area'
    | 'search'
    | 'check'
    | 'radio'
    | 'image'
    | 'number'
    | 'otp'
    | string
  data?: Array<String>,
  length?: number,
  borderRadius?: number,
  style?: ViewStyle,
  editable?: boolean,
};

const Component: ForwardRefRenderFunction<TextInput, Props> = (
  {
    label,
    value = '',
    onInteract,
    error = null,
    type = 'text',
    data,
    length,
    borderRadius = 10,
    style,
    editable,
    ...rest
  },
  ref: Ref<TextInput>
) => {
  const listPhotoRef = useRef(null);
  const otpInputsRef = useRef([]);

  const [usrInput, setusrInput] = useState(value);
  const [isSelected, setisSelected] = useState(false);
  const [isModalShow, setisModalShow] = useState(false);
  const [isPickerShow, setisPickerShow] = useState(false);
  const [isPreviewModal, setisPreviewModal] = useState(false);
  const [isFocus, setisFocus] = useState(false);
  const [isFocusOtp, setisFocusOtp] = useState(null);
  const [imagePreview, setimagePreview] = useState('');
  const [showPass, setshowPass] = useState(type == 'password');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    setusrInput(value);
    setisSelected(value);
  }, [value]);

  useEffect(() => {
    LayoutAnimationHandler();
  }, [value, error]);

  const pickOption = async (camera: boolean) => {
    setisPickerShow(false);
    if (camera) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        onInteract([...usrInput, image]);
        console.log(image);
      });
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      })
        .then(image => {
          onInteract([...usrInput, image]);
          console.log(image);
        })
        .catch(error => console.log('error :>> ', error));
    }
    // listPhotoRef.current.scrollToIndex({
    //   index: 0,
    //   animated: true,
    //   viewOffset: 0,
    //   viewPosition: 1,
    // });
    // listPhotoRef.current.scrollToEnd({ animated: true });

    // ImagePicker.clean()
    //   .then(() => {
    //     console.log('removed all tmp images from tmp directory');
    //   })
    //   .catch(e => {});
  };

  const typeListConfig = [
    {
      type: 'text',
      icon: '',
      onPress: () => setshowPass(!showPass),
      editable: true,
      emptyBtn: true,
    },
    {
      type: 'number',
      icon: '',
      onPress: () => {},
      editable: true,
      emptyBtn: true,
    },
    {
      type: 'password',
      icon: ['eye', 'eye-off'],
      onPress: () => setshowPass(!showPass),
      state: showPass,
      editable: true,
    },
    {
      type: 'time',
      icon: 'clock-outline',
      onPress: () => setDatePickerVisibility(!isDatePickerVisible),
    },
    {
      type: 'date',
      icon: 'calendar-month',
      onPress: () => setDatePickerVisibility(!isDatePickerVisible),
    },
    {
      type: 'select',
      icon: 'chevron-down',
      onPress: () => setisModalShow(!isModalShow),
    },
    {
      type: 'switch',
      onPress: () => setisSelected(!isSelected),
    },
    {
      type: 'area',
      icon: 'resize-bottom-right',
      onPress: () => setshowPass(!showPass),
      editable: true,
    },
    {
      type: 'search',
      icon: 'magnify',
      emptyBtn: true,
      onPress: () => console.log('asdas :>> '),
      editable: true,
    },
    {
      type: 'check',
      icon: ['checkbox-marked-outline', 'checkbox-blank-outline'],
    },
    {
      type: 'radio',
      icon: ['radiobox-marked', 'radiobox-blank'],
    },
    {
      type: 'image',
      icon: 'plus',
      onPress: () => setisPickerShow(!isPickerShow),
    },
  ].find(data => data.type == type);

  const borderColor = () => {
    if (error) {
      return COLOR_EVENT_ERROR;
    } else if (isFocus) {
      return COLOR_EVENT_SUCCESS;
    } else {
      return COLOR_EVENT_INACTIVE;
    }
  };

  const handleOtpInput = (params: any, index: number) => {
    if (params.key == 'Backspace') {
      if (value[index] == ' ') {
        otpInputsRef.current[index - 1].focus();
      } else if (value[index] !== undefined) {
        onInteract(value.slice(0, index) + ' ' + value.slice(index + 1));
      }
      if (index == 0) {
        otpInputsRef.current[index].blur();
      }
    } else {
      if (getNumberOnly(params.key) !== '') {
        onInteract(
          value.slice(0, index) +
            getNumberOnly(params.key) +
            value.slice(index + 1)
        );
        if (index + 1 == length) {
          otpInputsRef.current[index].blur();
        } else {
          otpInputsRef.current[index + 1].focus();
        }
      } else {
        // Snackbar;
        // infokan user untuk masukin angka aja
      }
    }
  };

  const suffix = () => {
    if (typeListConfig) {
      const iconSwitch = typeListConfig.state
        ? typeListConfig.icon[0]
        : typeListConfig.icon[1];
      const icons = Array.isArray(typeListConfig.icon)
        ? iconSwitch
        : typeListConfig.icon;

      if (
        (type === 'text' || type === 'search') &&
        isFocus &&
        usrInput !== ''
      ) {
        return (
          <TouchableOpacity
            style={[styles.rightIcon(type)]}
            onPress={() => onInteract('')}
          >
            <Icon name={'close'} size={22} />
          </TouchableOpacity>
        );
      } else if (typeListConfig.icon) {
        return (
          <TouchableOpacity
            style={[styles.rightIcon(type)]}
            onPress={() => typeListConfig.onPress()}
          >
            <Icon name={icons} size={22} />
          </TouchableOpacity>
        );
      }
    }
    return null;
  };

  const prefix = () => {
    if (type == 'date' || type == 'time') {
      console.log('value length :>> ', value);
      return (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={type}
          onConfirm={() => setDatePickerVisibility(!isDatePickerVisible)}
          onCancel={() => setDatePickerVisibility(false)}
          locale="en_GB"
          is24Hour={true}
        />
      );
    } else return null;
  };

  const pickerModal = () => (
    <Modal
      isVisible={isPickerShow}
      onBackdropPress={() => setisPickerShow(false)}
      onSwipeComplete={() => setisPickerShow(false)}
      swipeDirection={['down']}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      propagateSwipe={true}
    >
      <StatusBar barStyle={'light-content'} />
      <BaseView style={styles.pickerModal}>
        <Ripple
          onPress={() => pickOption(true)}
          style={{ alignItems: 'center', flex: 1, padding: 20 }}
        >
          <Icon name={'camera'} size={22} />
          <Text>Dari Kamera</Text>
        </Ripple>
        <Ripple
          onPress={() => pickOption(false)}
          style={{ alignItems: 'center', flex: 1, padding: 20 }}
        >
          <Icon name={'folder-image'} size={22} />
          <Text>Dari Galleri</Text>
        </Ripple>
      </BaseView>
    </Modal>
  );

  const listModal = () => {
    return (
      <ModalList
        visible={isModalShow}
        data={data}
        isSearch={true}
        onClose={() => setisModalShow(false)}
        selectedValue={usrInput}
        onSelect={(txt: any) => onInteract(txt)}
      />
    );
  };

  const previewModal = () => (
    <Modal
      isVisible={isPreviewModal}
      onBackdropPress={() => setisPreviewModal(false)}
      onSwipeComplete={() => setisPreviewModal(false)}
      propagateSwipe={true}
      swipeDirection={['down', 'left', 'right', 'up']}
    >
      <View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            setisPreviewModal(false);
          }}
        >
          <Icon name={'close'} size={22} color="white" />
        </TouchableOpacity>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: imagePreview }}
        />
      </View>
    </Modal>
  );

  const selectedIcon = (item: any) => {
    const selected = usrInput?.includes(item);
    if (type == 'switch') {
      return selected;
    }
    return selected ? typeListConfig.icon[0] : typeListConfig.icon[1];
  };

  const handleValueChange = (item: any) => {
    var selectedIndex = usrInput.indexOf(item);
    if (type == 'radio') {
      onInteract(item);
    } else {
      if (selectedIndex > -1) {
        usrInput.splice(selectedIndex, 1);
        onInteract([...usrInput]);
      } else {
        onInteract([...usrInput, item]);
      }
    }
  };

  const basicInput = () => {
    return (
      <View
        onTouchEnd={() => type !== 'password' && typeListConfig?.onPress()}
        style={{
          borderWidth: 1,
          marginVertical: 4,
          borderRadius: borderRadius,
          borderColor: borderColor(),
          flexDirection: 'row',
          height: type == 'area' ? 120 : heightByScreen(8),
          minHeight: 40,
          backgroundColor: COLOR_WHITE,
        }}
      >
        {prefix()}
        <TextInput
          ref={ref}
          {...rest}
          pointerEvents="auto"
          value={usrInput}
          onChangeText={txt =>
            onInteract(type == 'number' ? getNumberOnly(txt) : txt)
          }
          style={{
            flex: 7,
            paddingHorizontal: 8,
            color: COLOR_FONT_PRIMARY_DARK,
          }}
          placeholderTextColor={COLOR_FONT_PRIMARY_LIGHT}
          multiline={type == 'area'}
          textAlignVertical={type == 'area' ? 'top' : 'center'}
          onFocus={() => setisFocus(true)}
          onBlur={() => setisFocus(false)}
          editable={editable && typeListConfig?.editable == true}
          secureTextEntry={type == 'password' && showPass}
          keyboardType={type == 'number' ? 'number-pad' : 'default'}
        />
        {suffix()}
      </View>
    );
  };

  const renderMultipleInput = ({ item }) => {
    return (
      <Ripple
        style={{
          borderWidth: 1,
          marginVertical: 4,
          borderRadius: borderRadius,
          borderColor: borderColor(),
          flexDirection: 'row',
          height: heightByScreen(7.5),
        }}
        rippleContainerBorderRadius={4}
        onPress={() => handleValueChange(item)}
      >
        {type !== 'switch' && (
          <TouchableOpacity
            style={styles.itemSelect}
            onPress={() => {
              handleValueChange(item);
            }}
          >
            <Icon
              name={selectedIcon(item)}
              size={22}
              // color={error ? COLOR_EVENT_ERROR : COLOR_FONT_PRIMARY_DARK}
            />
          </TouchableOpacity>
        )}
        {/* {type == 'switch' && <View style={{ marginRight: 6 }} />} */}
        <TextInput
          value={item}
          // placeholder={placeholder}
          style={{
            flex: 1,
            color: COLOR_FONT_PRIMARY_DARK,
            paddingLeft: 6,
          }}
          textAlignVertical={'center'}
          editable={false}
        />
        {type == 'switch' && (
          <View style={[styles.rightIcon(type)]}>
            <Switch
              value={selectedIcon(item)}
              onSwitch={() => handleValueChange(item)}
            />
          </View>
        )}
      </Ripple>
    );
  };

  const mainInput = () => {
    if (type == 'check' || type == 'radio' || type == 'switch') {
      return <FlatList data={data} renderItem={renderMultipleInput} />;
    } else if (type == 'otp') {
      return (
        <View style={styles.pickerWrap}>
          {[...Array(length)].map((item, index) => (
            <View
              style={{
                borderWidth: 1,
                flex: 1,
                flexDirection: 'row',
                borderRadius: 12,
                margin: 2,
                maxWidth: 48,
                justifyContent: 'center',
                borderColor:
                  isFocusOtp == index
                    ? COLOR_EVENT_SUCCESS
                    : COLOR_EVENT_INACTIVE,
              }}
            >
              <TextInput
                value={value?.split('')[index]}
                key={index}
                textAlign="center"
                keyboardType="number-pad"
                maxLength={1}
                onFocus={() => setisFocusOtp(index)}
                onBlur={() => setisFocusOtp(null)}
                onKeyPress={({ nativeEvent }) =>
                  handleOtpInput(nativeEvent, index)
                }
                editable={editable}
                ref={ref => (otpInputsRef.current[index] = ref)}
              />
            </View>
          ))}
        </View>
      );
    } else if (type == 'image') {
      return (
        <View style={styles.pickerWrap}>
          <FlatList
            data={usrInput}
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={listPhotoRef}
            renderItem={({ item, index }) => (
              <View style={[styles.listImg, { borderColor: borderColor() }]}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => {
                    usrInput.splice(index, 1);
                    onInteract([...usrInput]);
                  }}
                >
                  <Icon name={'close'} size={22} color="white" />
                </TouchableOpacity>
                <Ripple
                  onPress={() => {
                    setimagePreview(item.path);
                    setisPreviewModal(true);
                  }}
                >
                  <Image
                    style={{
                      width: 86,
                      height: 86,
                      borderRadius: borderRadius,
                    }}
                    resizeMethod="auto"
                    resizeMode="cover"
                    source={{ uri: item?.path }}
                  />
                </Ripple>
              </View>
            )}
            ListFooterComponent={
              <Button
                onPress={() => setisPickerShow(true)}
                style={[
                  styles.footerImgList,
                  { borderColor: borderColor(), flex: 1 },
                ]}
              >
                <Icon name={'image'} size={50} />
                <Icon name={'camera-plus'} size={10} />
              </Button>
            }
          />
        </View>
      );
    } else {
      return basicInput();
    }
  };

  const labelText = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: error ? COLOR_EVENT_ERROR : COLOR_FONT_PRIMARY_DARK,
            marginRight: 6,
            fontFamily: 'Inter-Regular',
          }}
        >
          {toTitleCase(label)}
        </Text>
        {error && (
          <TouchableOpacity>
            <Icon
              name={'information-outline'}
              size={16}
              color={COLOR_EVENT_ERROR}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={[{ paddingVertical: 8 }, style]}>
      {label && labelText()}
      {mainInput()}
      {error && <Text style={{ color: COLOR_EVENT_ERROR }}>{error}</Text>}
      {/* {listModal()} */}
      {pickerModal()}
      {previewModal()}
    </View>
  );
};

export default forwardRef(Component);
