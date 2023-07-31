import { BaseView } from '@components';
import Button from '@components/index/Button';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import styles from './styles';
import { Icon } from '@components';

import { checkPermission } from './permissionHandler';
import Header from '@components/index/Header';
import { COLOR_EVENT_SUCCESS } from '@themes/index';

type HomeScreenProps = {
  navigation: any,
};

const Screen = ({ navigation }: HomeScreenProps) => {
  return (
    <BaseView style={{ flex: 1 }}>
      <Header title="Button" />
      <ScrollView>
        <Button
          rippleRadius={12}
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            justifyContent: 'space-between',
            padding: 12,
            borderRadius: 12,
            borderColor: COLOR_EVENT_SUCCESS,
          }}
        >
          <Text>Selected</Text>
          <Icon
            name={'radiobox-marked'}
            size={20}
            color={COLOR_EVENT_SUCCESS}
          />
        </Button>
        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => Alert.alert('outline')}
            title="outline"
            type="outline"
            disabled={true}
          />
          <Button
            onPress={() => Alert.alert('dashed')}
            title="dashed"
            type="dashed"
          />
        </View>
        <Button onPress={() => Alert.alert('tes')} title="tes" />
        <Button
          onPress={() => Alert.alert('disabled')}
          title="disabled"
          disabled={true}
        />
        <Button onPress={() => Alert.alert('andmous')}>
          <Image
            source={require('@images/logo-full-horizontal.png')}
            resizeMode="contain"
            style={{ width: '100%', height: 100 }}
          />
        </Button>
        <View style={{ flexDirection: 'row' }}>
          <Button>
            <Image
              source={require('@images/logo.png')}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
            <Text>PTPN</Text>
          </Button>
          <Button>
            <Image
              source={require('@images/logo-full-vertical.png')}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
            <Text>Andomus tech</Text>
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // width: '100%',
          }}
        >
          <Button
            onPress={() => Alert.alert('underlined')}
            title="underlined disable"
            disabled={true}
            type="underlined"
          />
          <Button
            onPress={() => Alert.alert('underlined')}
            title="underlined"
            type="underlined"
          />
          <Button
            onPress={() => Alert.alert('danger')}
            title="danger"
            type="underlined"
            color="danger"
          />
        </View>
        <Button
          onPress={() => Alert.alert('danger')}
          title="danger"
          color="danger"
        />
        <Button onPress={() => Alert.alert('info')} title="info" color="info" />
        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => Alert.alert('warning')}
            title="warning"
            color="warning"
          />
          <Button
            onPress={() => Alert.alert('success')}
            title="success"
            color="success"
          />
        </View>
        <Button
          onPress={() => Alert.alert('tes3')}
          title="tes3"
          type="underlined"
        />
      </ScrollView>
    </BaseView>
  );
};

export default Screen;
