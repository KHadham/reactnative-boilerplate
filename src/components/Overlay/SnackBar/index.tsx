import { TouchableOpacity, View } from 'react-native';
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
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import Toast from 'react-native-toast-message';
import { StyleSheet } from 'react-native';

interface componentProps {
  event: string;
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

  if (props) {
    return (
      <TouchableOpacity
        onPress={() => Toast.hide()}
        style={styles.globalLoadingWrap}
      >
        <View
          {...props}
          style={[
            styles.globalLoadingChild,
            {
              backgroundColor: events.backgroundColor,
              borderColor: events.borderColor,
              marginBottom: heightByScreen(20),
            },
          ]}
        >
          <View style={styles.title}>
            <Text size="subTitle" weight="bold">
              {text}
            </Text>
          </View>
          <View style={styles.iconWrap}>
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
              <View style={{ marginRight: spacing.md }}>
                <Icon name={events.icon} size={24} color={events.borderColor} />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        {...props}
        style={[
          styles.globalLoadingChild,
          {
            backgroundColor: events.backgroundColor,
            borderColor: events.borderColor,
          },
        ]}
      >
        <View style={styles.title}>
          <Text size="subTitle" weight="bold">
            {text}
          </Text>
        </View>
        <View style={styles.iconWrap}>
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
            <View style={{ marginRight: spacing.md }}>
              <Icon name={events.icon} size={24} color={events.borderColor} />
            </View>
          )}
        </View>
      </View>
    );
  }
};
export default App;

const styles = StyleSheet.create({
  globalLoadingWrap: {
    backgroundColor: 'rgba(56, 56, 56,0.4)',
    width: widthByScreen(100),
    flex: 1,
    alignItems: 'center',
    height: heightByScreen(120),
    bottom: heightByScreen(-20),
    justifyContent: 'flex-end',
  },
  globalLoadingChild: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    flex: 4,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: spacing.md,
  },
});
