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
} from '@app/styles';
import { Text } from '@components/index';
interface componentProps {
  event: 'error' | 'success' | 'info' | 'warning' | 'inactive';
  text: string;
  props: any;
}
const App: React.FC<componentProps> = ({ text, event, props }) => {
  const events = [
    {
      eventName: 'error',
      backgroundColor: COLOR_EVENT_ERROR,
      borderColor: COLOR_BACKGROUND_ERROR,
    },
    {
      eventName: 'success',
      backgroundColor: COLOR_BACKGROUND_SUCCESS,
      borderColor: COLOR_EVENT_SUCCESS,
    },
    {
      eventName: 'info',
      backgroundColor: COLOR_EVENT_INFORMATION,
      borderColor: COLOR_BACKGROUND_INFORMATION,
    },
    {
      eventName: 'warning',
      backgroundColor: COLOR_EVENT_WARNING,
      borderColor: COLOR_BACKGROUND_WARNING,
    },
    {
      eventName: 'inactive',
      backgroundColor: COLOR_EVENT_INACTIVE,
      borderColor: COLOR_BACKGROUND_INACTIVE,
    },
  ].find(data => data.eventName == event);

  return (
    <View
      {...props}
      style={{
        width: '90%',
        backgroundColor: events.backgroundColor,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 20,
        borderColor: events.borderColor,
        borderWidth: 0.5,
      }}
    >
      <Text.Bold>{text}</Text.Bold>
    </View>
  );
};
export default App;
