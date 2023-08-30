import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dukungan from './Dukungan';
import KoordinatorKelurahan from './KoordinatorKelurahan';
import RelawanTps from './RelawanTps';
import Statistik from './Statistik';
import Laporan from './Laporan';
import Penjadwalan from './Penjadwalan';

import { Animated, TouchableOpacity, View } from 'react-native';
import { BaseView, Header } from '@components';
import { COLOR_BASE_PRIMARY_MAIN, FONT_SIZE_CAPTION } from '@themes/index';
const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={{ opacity }}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabScreen() {
  return (
    <BaseView>
      <Header title="SiMPUS"  />
      <Tab.Navigator
        // tabBar={props => <MyTabBar {...props} />}
        initialRouteName="Dukungan"
        screenOptions={{
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
          name="Statistik"
          component={Statistik}
          options={{ tabBarLabel: 'Statistik' }}
        />
        <Tab.Screen
          name="Monitoring"
          component={Laporan}
          options={{ tabBarLabel: 'Monitoring' }}
        />
       
      </Tab.Navigator>
    </BaseView>
  );
}
