import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@homeApp/screens/home';
import Berita from '@newsApp/screens';
import Faq from '@othersApp/screens/faq';
import Profil from '@profileApp/screens';
import { Icon, Text } from '@components';
import {
  COLOR_BASE_PRIMARY_DARK,
  COLOR_GREY,
  COLOR_WHITE,
  FONT_SIZE_DESC,
} from '@themes/index';
import { ColorValue, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { heightByScreen } from '@utils/dimensions';
import { useTabCount } from '@utils/state/tabBar';
import Modal from 'react-native-modal';
import { useNavigationHandler } from '@utils/navigation';

const Tab = createBottomTabNavigator();

const TabIcon = (icon: string, color: string, focused) => (
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

const TabIconPlus = (icon: string, color: string, focused) => {
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);
  const { navigate } = useNavigationHandler();

  const surveySelectToggle = () => {
    setIsSelectionVisible(!isSelectionVisible);
  };

  const modalSurveySelect = () => {
    return (
      <Modal
        isVisible={isSelectionVisible}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        swipeDirection={'down'}
        onBackdropPress={() => surveySelectToggle()}
        onBackButtonPress={() => surveySelectToggle()}
        onSwipeComplete={() => surveySelectToggle()}
      >
        <SafeAreaView
          style={{
            backgroundColor: COLOR_WHITE,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}
        >
          <View style={{ padding: 20, gap: 10 }}>
            <Text size="title" weight="bold" style={{ marginBottom: 4 }}>
              Mau survey apa ?
            </Text>
            <Text
              size="subTitle"
              onPress={() => {
                navigate({
                  screen: 'WebView',
                  params: {
                    item: {
                      url: 'https://dcktrp.jakarta.go.id/si-mpus/schedule-manual-add',
                      name: 'Monitoring Perangkat Pusdatin',
                    },
                  },
                });
              }}
            >
              Monitoring Perangkat Pusdatin
            </Text>
            <Text
              size="subTitle"
              onPress={() => {
                navigate({
                  screen: 'WebView',
                  params: {
                    item: {
                      url: 'https://dcktrp.jakarta.go.id/semeter',
                      name: 'Monitoring Perangkat Pusdatin',
                    },
                  },
                });
              }}
            >
              Reklame
            </Text>

            <Text
              size="subTitle"
              onPress={() => {
                navigate({
                  screen: 'WebView',
                  params: {
                    item: {
                      url: 'https://dcktrp.jakarta.go.id/spj/rencana-kegiatan/create',
                      name: 'E-PENGADAAN',
                    },
                  },
                });
              }}
            >
              E-Pengadaan
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <>
      {modalSurveySelect()}
      <TouchableOpacity
        onPress={() => surveySelectToggle()}
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: COLOR_GREY,
          borderRadius: 100,
          bottom: 14,
          width: 60,
          height: 60,
          backgroundColor: COLOR_WHITE,
        }}
      >
        <Icon name={icon} size={focused ? 32 : 28} color={color} />
      </TouchableOpacity>
    </>
  );
};

const MainTabNavigator = () => {
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
      <Tab.Screen
        name="Info"
        component={Berita}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) =>
            TabIcon('newspaper', color, focused),
        })}
      />
      <Tab.Screen
        name="Lapor"
        component={Berita}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) =>
            TabIconPlus('plus', color, focused),
        })}
      />
      <Tab.Screen
        name="F.A.Q"
        component={Faq}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) =>
            TabIcon('frequently-asked-questions', color, focused),
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
