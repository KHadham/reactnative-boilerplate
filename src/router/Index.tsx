import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SplashScreen from '@authApp/screens/splash';
import AuthRoute from './AuthRoute';
import TabNavigator from './TabNavigator';
import Template from 'src/screens/Template';

// import AuthRoute from '@router/AuthRoute';
import ProfileRoute from 'src/router/ProfileRoute';
import StatistikRoute from 'src/router/StatistikRoute';
import DukunganRoute from 'src/router/DukunganRoute';
import HomeRoute from 'src/router/HomeRoute';
// import TabNavigator from 'src/router/TabNavigator';
import { setNavigationRef } from '@utils/navigation';
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
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            detachPreviousScreen: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          {/* <Stack.Screen name="Template" component={Template} /> */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthRoute} />
          <Stack.Screen name="Tab" component={TabNavigator} />
          {/* <Stack.Screen name="Home" component={HomeRoute} />
          <Stack.Screen name="Profile" component={ProfileRoute} />
          <Stack.Screen name="Statistik" component={StatistikRoute} />
          <Stack.Screen name="Dukungan" component={DukunganRoute} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
