import { getNumberOnly, toTitleCase } from '@utils/index';
import {
  COLOR_EVENT_ERROR,
  COLOR_EVENT_INACTIVE,
  COLOR_EVENT_SUCCESS,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_FONT_PRIMARY_LIGHT,
} from '@themes/index';

import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  Ref,
} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Icon } from '@components';
import { LayoutAnimationHandler } from '@utils/uiHandler';
import styles from './../styles';

type Props = TextInputProps & {
  label?: string,
  error?: any,
  borderRadius?: number,
  style?: ViewStyle,
};

const Component: ForwardRefRenderFunction<TextInput, Props> = (
  { label, error = null, borderRadius = 10, style, ...rest },
  ref: Ref<TextInput>
) => {
  const [isFocus, setisFocus] = useState(false);
  const [showPass, setshowPass] = useState(false);

  useEffect(() => {
    LayoutAnimationHandler();
  }, [rest.value, error]);

  const borderColor = () => {
    if (error) {
      return COLOR_EVENT_ERROR;
    } else if (isFocus) {
      return COLOR_EVENT_SUCCESS;
    } else {
      return COLOR_EVENT_INACTIVE;
    }
  };

  const basicInput = () => {
    return (
      <View
        onTouchEnd={() => setshowPass(!showPass)}
        style={[
          styles.basicInput,
          {
            borderColor: borderColor(),
            borderRadius: borderRadius,
          },
        ]}
      >
        <TextInput
          {...rest}
          ref={ref}
          pointerEvents="auto"
          style={styles.input}
          placeholderTextColor={COLOR_FONT_PRIMARY_LIGHT}
          textAlignVertical={'center'}
          onFocus={() => setisFocus(true)}
          onBlur={() => setisFocus(false)}
        />
      </View>
    );
  };

  const labelText = () => {
    return (
      <View >
        <Text
          style={{
            color: error ? COLOR_EVENT_ERROR : COLOR_FONT_PRIMARY_DARK,
            marginRight: 6,
            fontFamily: 'Inter-Regular',
          }}
        >
          {toTitleCase(label)}
        </Text>
      </View>
    );
  };

  return (
    <View style={[{ paddingVertical: 8 }, style]}>
      {label && labelText()}
      {basicInput()}
      {error && (
        <View>
          <Icon
            name={'information-outline'}
            size={16}
            color={COLOR_EVENT_ERROR}
          />
          <Text style={{ color: COLOR_EVENT_ERROR }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default forwardRef(Component);
