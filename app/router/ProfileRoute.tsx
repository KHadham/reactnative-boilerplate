import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profil from '@screens/_Profil/Profil';
import KeamanAkun from '@screens/_Profil/KeamanAkun';
import DataPribadi from '@screens/_Profil/DataPribadi';


const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="KeamananAkun" component={KeamanAkun} />
      <Stack.Screen name="DataPribadi" component={DataPribadi} />
    </Stack.Navigator>
  );
};

export default App;
