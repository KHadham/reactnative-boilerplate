import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@homeApp/screens/home';
import Berita from '@newsApp/screens';
import Statistik from '@homeApp/screens/statistik';
import Profil from '@profileApp/screens/profile';
import { Icon } from '@components';
import {
  COLOR_BASE_PRIMARY_DARK,
  COLOR_GREY,
  COLOR_WHITE,
  FONT_SIZE_DESC,
} from '@themes/index';
import { ColorValue, Text, View } from 'react-native';
import { heightByScreen } from '@utils/dimensions';
import { LayoutAnimationHandler } from '@utils/uiHandler';
import { useGlobalLoading } from '@utils/state/globalLoading';
import { useTabCount } from '@utils/state/tabBar';

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
  const isLoading = useGlobalLoading(state => state.isLoading);
  const berandaCount = useTabCount(state => state.beranda);

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
        tabBarStyle: {
          height: heightByScreen(10),
          backgroundColor: isLoading ? COLOR_GREY : COLOR_WHITE,
        },
      })}
    >
      <Tab.Screen
        name={'Beranda'}
        component={Home}
        options={({ route }) => ({
          tabBarBadge: berandaCount || null,
          tabBarIcon: ({ color, focused }) =>
            TabIcon('home-minus-outline', color, focused),
        })}
      />
      {/* <Tab.Screen
        name="Dukungan"
        component={Dukungan}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) =>
            TabIcon('file-document-edit-outline', color, focused),
        })}
      /> */}
      <Tab.Screen
        name="Berita"
        component={Berita}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) =>
            TabIcon('newspaper', color, focused),
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
