import { View, Text, TextInput, ViewStyle } from 'react-native'
import React, { useRef, useState } from 'react'
import styles from './../styles'
import { getNumberOnly } from '@utils/index';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_EVENT_INACTIVE, COLOR_EVENT_SUCCESS } from '@themes/index';
import { LayoutAnimationHandler } from '@utils/uiHandler';


interface IndexProps {
  value: string;
  length: number;
  onInteract: (arg0: any) => any;
}

const index = ({ value = '', length, onInteract }: IndexProps) => {
  const otpInputsRef = useRef([]);
  const [isFocusOtp, setisFocusOtp] = useState(null);

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
      }
    }
  };

  const focusStyle = (index: number): ViewStyle => {
    LayoutAnimationHandler()
    if (isFocusOtp === index) {
      return {
        borderColor: COLOR_BASE_PRIMARY_MAIN,
        elevation: 5,
      };
    } else {
      return {
        borderColor: COLOR_EVENT_INACTIVE,
        elevation: 0
      };
    }
  };

  return (
    <View style={styles.pickerWrap}>
      {[...Array(length)].map((item, index) => (
        <View style={[styles.otpBlock, focusStyle(index)]} key={index}>
          <TextInput
            value={value?.split('')[index]}
            textAlign="center"
            keyboardType="number-pad"
            maxLength={1}
            onFocus={() => setisFocusOtp(index)}
            onBlur={() => setisFocusOtp(null)}
            onKeyPress={({ nativeEvent }) =>
              handleOtpInput(nativeEvent, index)
            }
            // editable={editable}
            ref={ref => (otpInputsRef.current[index] = ref)}
          />
        </View>
      ))}
    </View>
  )
}

export default index