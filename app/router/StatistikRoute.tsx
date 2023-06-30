import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@screens/Splash';
import HomeScreen from '@screens/HomeScreen';
import DetailsScreen from '@screens/DetailScreen';
import Login from '@screens/Template/Login';
import Button from '@screens/Template/Button';
import Template from '@screens/Template';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Button" component={Button} />
    </Stack.Navigator>
  );
};

export default App;
