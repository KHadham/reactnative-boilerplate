import { View } from 'react-native';
import React from 'react';
import {
  COLOR_EVENT_SUCCESS,
  COLOR_EVENT_ERROR,
  COLOR_EVENT_INACTIVE,
  COLOR_EVENT_INFORMATION,
  COLOR_EVENT_WARNING,
  COLOR_BACKGROUND_SUCCESS,
  COLOR_BACKGROUND_ERROR,
  COLOR_BACKGROUND_INACTIVE,
  COLOR_BACKGROUND_INFORMATION,
  COLOR_BACKGROUND_WARNING,
  COLOR_WHITE,
  COLOR_GREY,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_BASE_PRIMARY_MAIN,
} from '@themes/index';
import { Text, Icon } from '@components';
import LottieView from 'lottie-react-native';
import { spacing } from '@constants/spacing';

interface componentProps {
  event: 'error' | 'success' | 'info' | 'warning' | 'inactive' | 'loading';
  text: string;
  props: any;
}
const App: React.FC<componentProps> = ({ text, event, props }) => {
  const events = [
    {
      eventName: 'error',
      backgroundColor: COLOR_BACKGROUND_ERROR,
      borderColor: COLOR_EVENT_ERROR,
      icon: 'close-circle-outline',
    },
    {
      eventName: 'success',
      backgroundColor: COLOR_BACKGROUND_SUCCESS,
      borderColor: COLOR_EVENT_SUCCESS,
      icon: 'check-circle-outline',
    },
    {
      eventName: 'info',
      backgroundColor: COLOR_EVENT_INFORMATION,
      borderColor: COLOR_BACKGROUND_INFORMATION,
      icon: 'information-outline',
    },
    {
      eventName: 'warning',
      backgroundColor: COLOR_EVENT_WARNING,
      borderColor: COLOR_BACKGROUND_WARNING,
      icon: 'alert-outline',
    },
    {
      eventName: 'inactive',
      backgroundColor: COLOR_EVENT_INACTIVE,
      borderColor: COLOR_BACKGROUND_INACTIVE,
      icon: 'cog',
    },
    {
      eventName: 'loading',
      backgroundColor: COLOR_WHITE,
      borderColor: COLOR_GREY,
      icon: '',
    },
  ].find(data => data.eventName == event);

  return (
    <View
      {...props}
      style={{
        width: '90%',
        backgroundColor: events.backgroundColor,
        borderRadius: 10,
        // alignItems: 'center',
        // padding: 20,
        borderColor: events.borderColor,
        borderWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ flex: 4, margin: spacing.md }} weight="bold">
        {text}
      </Text>
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
      >
        {events.eventName == 'loading' ? (
          <LottieView
            source={require('@animation/loadingSpin.json')}
            autoPlay
            loop
            colorFilters={[
              {
                keypath: 'Shape Layer 1',
                color: COLOR_BASE_PRIMARY_DARK,
              },
              {
                keypath: 'Shape Layer 2',
                color: COLOR_BASE_PRIMARY_MAIN,
              },
            ]}
          />
        ) : (
          <View style={{marginRight: spacing.md}}>
            <Icon name={events.icon} size={24} color={events.borderColor} />
          </View>
        )}
      </View>
    </View>
  );
};
export default App;
