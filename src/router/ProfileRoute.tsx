import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profil from '@profileApp/screens';
import ChangePassword from '@profileApp/screens/changePassword';
import dataKepegawaian from '@profileApp/screens/dataKepegawaian';
import informasiPersonal from '@profileApp/screens/informasiPersonal';
import produkHukum from '@othersApp/screens/produkHukum';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="DataKepegawaian" component={dataKepegawaian} />
      <Stack.Screen name="InformasiPersonal" component={informasiPersonal} />
      <Stack.Screen name="GantiPassword" component={ChangePassword} />
      <Stack.Screen name="ProdukHukum" component={produkHukum} />
    </Stack.Navigator>
  );
};

export default App;
