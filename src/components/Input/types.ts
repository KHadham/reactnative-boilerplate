import { KeyboardTypeOptions, TextInputProps, ViewStyle } from "react-native";

type InputType =
  | 'text'
  | 'password'
  | 'number'
  | 'phone'
  | 'email'
  | 'area'
  | 'time'
  | 'date'
  | 'image'
  | 'select'
  | 'check'
  | 'radio'
  | 'switch'
  | 'otp'
  | string;

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  success?: string;
  required?: string | boolean | string;
  value: any;
  onInteract?: Function;
  type?: InputType;
  data?: Array<string>;
  length?: InputType extends 'otp' ? number : undefined;
  borderRadius?: number;
  style?: ViewStyle;
  leftComponent?: React.ReactElement | null | undefined;
  rightComponent?: React.ReactElement | null | undefined;
  disabled?: boolean
};

export type TypeConfig = {
    icon?: string | string[];
    keyboardType: KeyboardTypeOptions;
    onPress?: () => void;
    state?: string | boolean;
    validation?: Function;
    typeable?: boolean
  };

export type TypeListConfigMap = Record<string, TypeConfig>;