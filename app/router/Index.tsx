import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@app/screens/_Auth/Splash';
import Template from '@app/screens/Template';

// import AuthRoute from '@router/AuthRoute';
import ProfileRoute from '@router/ProfileRoute';
import StatistikRoute from '@router/StatistikRoute';
import DukunganRoute from '@router/DukunganRoute';
import HomeRoute from '@router/HomeRoute';
import TabNavigator from '@router/TabNavigator';
import { setNavigationRef } from '@helper/navigation';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const isLoggedIn = true;
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={setNavigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Template" component={Template} /> */}
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
          {/* <Stack.Screen name="Auth" component={AuthRoute} /> */}
          <Stack.Screen name="Tab" component={TabNavigator} />
          <Stack.Screen name="Home" component={HomeRoute} />
          <Stack.Screen name="Profile" component={ProfileRoute} />
          <Stack.Screen name="Statistik" component={StatistikRoute} />
          <Stack.Screen name="Dukungan" component={DukunganRoute} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
