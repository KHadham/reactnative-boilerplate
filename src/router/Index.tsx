import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SplashScreen from '@authApp/screens/splash';
import AuthRoute from './AuthRoute';
import TabNavigator from './TabNavigator';
import WebView from '@othersApp/screens/webView';
import Simpus from '../screens/_Dukungan';
import Semeter from './SemeterRoute';

import ProfileRoute from './ProfileRoute';
import { setNavigationRef } from '@utils/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={setNavigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            detachPreviousScreen: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthRoute} />
          <Stack.Screen name="Tab" component={TabNavigator} />
          <Stack.Screen name="Profile" component={ProfileRoute} />
          <Stack.Screen name="Simpus" component={Simpus} />
          <Stack.Screen name="Semeter" component={Semeter} />
          <Stack.Screen name="WebView" component={WebView} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
