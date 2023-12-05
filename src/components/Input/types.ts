import { KeyboardTypeOptions, TextInputProps, ViewStyle } from "react-native";

export type InputType =
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
  |'username'
  |'search'
  |'image'

export type InputProps = {
  label?: string;
  labelSelection?: string;
  valueSelection?: string;
  error?: string;
  success?: string;
  required?: string | boolean ;
  value: any| string | string[];
  onInteract: Function;
  type?: InputType;
  data?: string | Array<{ value: string; label: string }>;
  length?: InputType extends 'otp' ? number : undefined;
  borderRadius?: number;
  style?: ViewStyle;
  left?: React.ReactElement | null | undefined;
  right?: React.ReactElement | null | undefined;
  disabled?: boolean
  isLoading?: boolean
}&TextInputProps;

export type TypeConfig = {
    icon?: string | string[];
    keyboardType: KeyboardTypeOptions;
    onPress?: () => void;
    state?: string | boolean;
    validation?: Function;
    typeable?: boolean
  };

export type TypeListConfigMap = Record<string, TypeConfig>;