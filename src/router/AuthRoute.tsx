import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoarding from '@authApp/screens/onBoarding';
import Verifikasi from '@authApp/screens/verifikasi';
import Registrasi from '@authApp/screens/register';
import Login from '@authApp/screens/login';

import { STORAGE_KEY } from '@constants/index';
import { storage } from '@utils/storage';


const Stack = createStackNavigator();

const App = () => {
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
