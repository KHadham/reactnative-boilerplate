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
  Text,
  TextInput,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Icon } from '@components';
import { heightByScreen } from '@utils/dimensions';
import styles from './../styles';

type Props =
  | {
    onPress?: () => void,
    children?: never,
    icon: string,
  }
  | {
    onPress?: () => void,
    children: React.ReactNode,
    icon?: string,
  };

const component = ({ onPress, icon = '', children }: Props) => {
  const iconUi = () => {
    if (icon) {
      return <Icon name={icon} size={22} />
    } else {
      return null
    }
  }
  return (
    <TouchableOpacity style={styles.SideInputItemCustom} onPress={onPress}>
      {children ? children : iconUi()}
    </TouchableOpacity>
  );
};

export default component;
