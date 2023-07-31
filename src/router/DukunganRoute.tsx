import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@screens/Splash';
import HomeScreen from 'src/screens/HomeScreen';
import DetailsScreen from 'src/screens/DetailScreen';
import Login from 'src/screens/Template/Login';
import Button from 'src/screens/Template/Button';
import Template from 'src/screens/Template';

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
