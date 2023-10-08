import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import dataKepegawaian from '@profileApp/screens/dataKepegawaian';
import Home from '@semeterApp/screens';
import Form from '@semeterApp/screens/form';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Form" component={Form} />
    </Stack.Navigator>
  );
};

export default App;
