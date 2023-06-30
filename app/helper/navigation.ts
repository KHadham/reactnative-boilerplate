import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

let navigationRef: { dispatch: (arg0: CommonActions.Action) => void };

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

export const replace = (name: any, params: any) => {
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
