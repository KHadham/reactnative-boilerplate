import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@screens/Home';
import Dukungan from '@app/screens/_Dukungan';
import Statistik from '@screens/Statistik';
import Profil from '@app/screens/_Profil/Profil';
import { Icon } from '@components/index';
import { COLOR_BASE_PRIMARY_DARK, FONT_SIZE_DESC } from '@app/styles';
import { ColorValue, Text, View } from 'react-native';
import { heightByScreen } from '@app/helper/dimensions';
import { LayoutAnimationHandler } from '@app/helper/animationUtils';

const Tab = createBottomTabNavigator();

const TabIcon = (icon: string, color: number | ColorValue, focused) => (
  <View
    style={{
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    }}
  >
    <Icon name={icon} size={focused ? 32 : 28} color={color} />
  </View>
);

const MainTabNavigator = () => {
  LayoutAnimationHandler();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLOR_BASE_PRIMARY_DARK,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: FONT_SIZE_DESC,
        },
        tabBarStyle: { height: heightByScreen(10) },
        // tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name={'Beranda'}
        component={Home}
        options={({ route }) => ({
          tabBarBadge: 3,
          tabBarIcon: ({ color, focused }) =>
            TabIcon('home-minus-outline', color, focused),
        })}
      />
      <Tab.Screen
        name="Dukungan"
        component={Dukungan}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) =>
            TabIcon('file-document-edit-outline', color, focused),
        })}
      />
      <Tab.Screen
        name="Statistik"
        component={Statistik}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) =>
            TabIcon('chart-line', color, focused),
        })}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) =>
            TabIcon('account', color, focused),
        })}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;