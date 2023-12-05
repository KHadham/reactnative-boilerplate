import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import dataKepegawaian from '@profileApp/screens/dataKepegawaian';
import Home from '@semeterApp/screens';
import Form from '@semeterApp/screens/form';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      initialRouteName="SemeterHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SemeterHome" component={Home} />
      <Stack.Screen name="TambahReklame" component={Form} />
    </Stack.Navigator>
  );
};

export default App;
