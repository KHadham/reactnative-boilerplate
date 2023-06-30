import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@app/screens/_Auth/Login';
import Register from '@app/screens/_Auth/Register';
import OnBoarding from '@app/screens/_Auth/OnBoarding';
import Verifikasi from '@app/screens/_Auth/Verifikasi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@app/constants/index';
import { atom, useRecoilValue } from 'recoil';
import { onBoardState } from '@state';

const Stack = createStackNavigator();

const App = () => {
  const onBoardStatus = useRecoilValue(onBoardState);

  const [state, setstate] = useState(null);
  useEffect(() => {
    console.log('onBoardStatus xxxx:>> ', onBoardStatus);
    // getOnboardStats();
  }, [onBoardStatus]);

  const getOnboardStats = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY.SKIP_ONBOARD);
      setstate(value);
    } catch (e) {
      return 'error';
      // error reading value
    }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {onBoardStatus == null ? (
        <>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Verifikasi" component={Verifikasi} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
