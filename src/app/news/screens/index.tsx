import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
// import styles from './styles';
import { Header, Icon } from '@components';
import { navigate } from '@utils/navigation';
import { BaseView, Text } from '@components';
import { useBearStore } from '../stores/stores';

import PengumumanScreen from './pengumuman';
import BeritaScreen from './berita';
import EventScreen from './event';
import { COLOR_BASE_PRIMARY_MAIN, FONT_SIZE_CAPTION } from '@themes/index';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { heightByScreen } from '@utils/dimensions';

export default function TabScreen() {
  const Tab = createMaterialTopTabNavigator();

  // const bears = useBearStore(state => state.bears);

  const [first, setfirst] = useState('');

  //   useEffect(() => {
  // Toast.show({
  //   type: 'success',
  //   text1: 'Hello',
  //   text2: 'This is some something 👋'
  // });

  //     return () => {
  //       second;
  //     };
  //   }, []);
  return (
    <BaseView>
      <Header title="Informasi" left="" />
      <Tab.Navigator
        // tabBar={props => <MyTabBar {...props} />}
        initialRouteName="Pengumuman"
        screenOptions={{
          // tabBarGap: 100,
          tabBarAndroidRipple: { borderless: false },
          tabBarActiveTintColor: COLOR_BASE_PRIMARY_MAIN,
          tabBarLabelStyle: {
            fontSize: FONT_SIZE_CAPTION,
            fontFamily: 'Inter-Bold',
            textTransform: 'none',
          },
          tabBarScrollEnabled: true,

          // tabBarStyle: { backgroundColor: 'powderblue' },
        }}
      >
        <Tab.Screen
          name="Berita"
          component={BeritaScreen}
          options={{ tabBarLabel: 'Berita' }}
        />
        <Tab.Screen
          name="Pengumuman"
          component={PengumumanScreen}
          options={{ tabBarLabel: 'Pengumuman' }}
        />
        <Tab.Screen
          name="Acara"
          component={EventScreen}
          options={{ tabBarLabel: 'Acara' }}
        />
      </Tab.Navigator>
    </BaseView>
  );
}
