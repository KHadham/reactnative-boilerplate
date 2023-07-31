import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Linking, Platform } from 'react-native';

let navigationRef: { dispatch: (arg0: CommonActions.Action) => void };

export const goToPlaystore = () => {
  const url = Platform.OS === 'ios'
    ? 'itms-apps://apps.apple.com/tr/app/times-tables-lets-learn/id1055437768?l=tr'
    : 'http://play.google.com/store/apps/details?id=com.google.android.apps.maps';

  Linking.openURL(url)
    .catch((err) => console.error('An error occurred while opening the app store:', err));
};

export const openSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};

export const setNavigationRef = (ref: any) => {
  navigationRef = ref;
};

export const getParam = (paramName: string | number) => {
  const route = useRoute();
  return route.params?.[paramName];
};

export const getParams = () => {
  const route = useRoute();
  return route.params;
};

export const navigates = (
  name: string,
  screen?: string,
  params?: { value: string, type: string }
) => {
  navigationRef?.dispatch(CommonActions.navigate(name, { screen, params }));
};

export const navigate = ({
  parent,
  screen,
  params,
}: {
  parent?: string,
  screen: string,
  params?: { value: string, type: string },
}) => {
  if (parent !== undefined) {
    navigationRef?.dispatch(
      CommonActions.navigate(parent, { screen: screen, params })
    );
  } else
    navigationRef?.dispatch(CommonActions.navigate({ name: screen, params }));
};

// navigate({
//   parent: 'Auth',
//   screen: 'Verifikasi',
//   params: {
//     value: noHp,
//     type: 'Whatsapp',
//   },
// })

export const goBack = () => {
  navigationRef?.dispatch(CommonActions.goBack());
};

export const reset = (name: any) => {
  navigationRef?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name }],
    })
  );
};

export const replace = (name: any, params?: any) => {
  navigationRef?.dispatch(
    CommonActions.replace({
      name,
      params,
    })
  );
};

export const push = (name: any, params: any) => {
  navigationRef?.dispatch(
    CommonActions.push({
      name,
      params,
    })
  );
};

export const pop = () => {
  navigationRef?.dispatch(CommonActions.pop());
};

export const popToTop = () => {
  navigationRef?.dispatch(CommonActions.popToTop());
};
