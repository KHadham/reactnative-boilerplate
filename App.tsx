import { RecoilRoot } from 'recoil';
import BaseAppRoute from '@router/Index';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message';
import { View, Text } from 'react-native';
import {
  COLOR_BACKGROUND,
  COLOR_BACKGROUND_ERROR,
  COLOR_BACKGROUND_SUCCESS,
  COLOR_EVENT_ERROR,
  COLOR_EVENT_SUCCESS,
} from '@app/styles';

import { SnackBar } from '@components/index';
const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  // success: props => (
  //   <BaseToast
  //     {...props}
  //     style={{ borderLeftColor: 'pink' }}
  //     contentContainerStyle={{ paddingHorizontal: 15 }}
  //     text1Style={{
  //       fontSize: 15,
  //       fontWeight: '400',
  //     }}
  //   />
  // ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  // error: props => (
  //   <ErrorToast
  //     {...props}
  //     text1Style={{
  //       fontSize: 17,
  //     }}
  //     text2Style={{
  //       fontSize: 15,
  //     }}
  //   />
  // ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  error: ({ text1, props }) => (
    <SnackBar text={text1} event="error" props={props} />
  ),
  success: ({ text1, props }) => (
    <SnackBar text={text1} event="success" props={props} />
  ),
  warning: ({ text1, props }) => (
    <SnackBar text={text1} event="warning" props={props} />
  ),
  info: ({ text1, props }) => (
    <SnackBar text={text1} event="info" props={props} />
  ),
  inactive: ({ text1, props }) => (
    <SnackBar text={text1} event="inactive" props={props} />
  ),
};
function App() {
  return (
    <RecoilRoot>
      <BaseAppRoute />
      <Toast position="bottom" config={toastConfig} />
    </RecoilRoot>
  );
}

export default App;
