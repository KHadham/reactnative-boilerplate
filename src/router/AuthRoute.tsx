import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '@authApp/screens/splash';
import OnBoarding from '@authApp/screens/onBoarding';
import Verifikasi from '@authApp/screens/verifikasi';
import Registrasi from '@authApp/screens/register';
import Login from '@authApp/screens/login';

import { STORAGE_KEY } from '@constants/index';
import { onBoardState } from '@utils/state';
import { storage } from '@utils/storage';


const Stack = createStackNavigator();

const App = () => {
  // const onBoardStatus = useRecoilValue(onBoardState);

  // const [state, setstate] = useState(null);
  // useEffect(() => {
  //   console.log('onBoardStatus xxxx:>> ', onBoardStatus);
  //   // getOnboardStats();
  // }, [onBoardStatus]);

  // const getOnboardStats = async () => {
  //   try {
  //     const value = await storage.getString(STORAGE_KEY.SKIP_ONBOARD);
  //     setstate(value);
  //   } catch (e) {
  //     return 'error';
  //     // error reading value
  //   }
  // };
  const onBoardStatus = storage.getItem(STORAGE_KEY.SKIP_ONBOARD);

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
          <Stack.Screen name="Register" component={Registrasi} />
          {/* FAQ screen */}
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
