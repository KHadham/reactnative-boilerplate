import BaseAppRoute from './src/router/Index';
import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import { SnackBar } from '@components';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
const createSnackBar =
  (event: 'error' | 'success' | 'info' | 'warning' | 'inactive' | 'loading') =>
  ({ text1, props }: ToastConfigParams<any>) =>
    <SnackBar text={text1} event={event} props={props} />;

const toastConfig: ToastConfig = {
  error: createSnackBar('error'),
  success: createSnackBar('success'),
  warning: createSnackBar('warning'),
  info: createSnackBar('info'),
  inactive: createSnackBar('inactive'),
  loading: createSnackBar('loading'),
};

function App() {
  ReactNativeForegroundService.register();
  return (
    <>
      <BaseAppRoute />
      <Toast position="bottom" config={toastConfig} visibilityTime={1000} />
    </>
  );
}

export default App;