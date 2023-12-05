import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Share, Linking, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

let navigationRef: { dispatch: (arg0: CommonActions.Action) => void };

export const goToPlaystore = () => {
  const url =
    Platform.OS === 'ios'
      ? 'itms-apps://apps.apple.com/tr/app/times-tables-lets-learn/id1055437768?l=tr'
      : 'http://play.google.com/store/apps/details?id=com.google.android.apps.maps';

  Linking.openURL(url).catch(err =>
    console.error('An error occurred while opening the app store:', err)
  );
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

// export const getParams = () => {
//   const route = useRoute();
//   console.log('route :>> ', route);
//   return route.params;
// };

export const getParams = () => {
  const route = useRoute();
  return route?.params;
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
  params?: { [key: string]: any }, // Allow any key-value pairs for params
}) => {
  const navigation = useNavigation();

  if (parent !== undefined) {
    // navigationRef?.dispatch(
    //   CommonActions.navigate(parent, { screen: screen, ...params })
    // );
    navigation.navigate(parent, { screen: screen, ...params });
  } else {
    // navigationRef?.dispatch(
    //   CommonActions.navigate({ name: screen, ...params })
    // );
    navigation.navigate({ name: screen, ...params });
  }
};

export const goBack = () => {
  const navigation = useNavigation();
  navigation.goBack();
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

export function useNavigationHandler() {
  const navigation = useNavigation();
  const route = useRoute();

  const goBack = () => {
    navigation.goBack();
  };

  const navigate = ({
    parent,
    screen,
    params,
  }: {
    parent?: string,
    screen: string,
    params?: { [key: string]: any },
  }) => {
    if (parent !== undefined) {
      navigation.navigate(parent, { screen: screen, params: params });
    } else {
      navigation.navigate(screen, { params: params });
    }
  };

  const getParam = () => {
    return route?.params;
  };

  const reset = (routeName, params, index) => {
    navigation.reset({
      index: index || 0,
      routes: [{ name: routeName, params }],
    });
  };

  const push = (screenName, params) => {
    navigation.push(screenName, params);
  };

  const pop = n => {
    navigation.pop(n);
  };

  const popToTop = () => {
    navigation.popToTop();
  };

  const replace = (screenName, params) => {
    navigation.replace(screenName, params);
  };

  const setParams = params => {
    navigation.setParams(params);
  };

  const onShare = async ({
    title = '',
    message = '',
    url = '',
  }: {
    title?: string,
    message: string,
    url?: string,
  }) => {
    try {
      const result = await Share.share({
        title: title,
        message: message,
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan saat membagikan konten',
      });
    }

  };

  const onPressLink = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan saat membuka link',
      });
    }
  };

  return {
    goBack,
    navigate,
    getParam,
    reset,
    push,
    pop,
    popToTop,
    replace,
    setParams,
    onShare,
    onPressLink
    // Add more navigation functions here if needed
  };
}
