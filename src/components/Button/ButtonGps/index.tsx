import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Icon, ModalConfirmation, ModalList } from '@components';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_WHITE } from '@themes/index';
import { spacing } from '@constants/spacing';
import { LayoutAnimationHandler } from '@utils/uiHandler';
import {
  getCurrentLocation,
  gpsEnabler,
  animateMapToTargetRegion,
} from '@utils/location';

const index = ({ onPress, mapRef }) => {
  const [modalSetting, setmodalSetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinate, setcoordinate] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getLocation(false);

    // const timer = setInterval(
    //   () =>
    //     setcoordinate({
    //       latitude: 0,
    //       longitude: 0,
    //     }),
    //   5000
    // ); // 60000 milliseconds = 1 minute

    // // Clean up the interval timer when the component unmounts
    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  const onPressGps = () => {
    if (coordinate.latitude == 0) {
      getLocation(true);
    } else {
      animateMapToTargetRegion({
        ref: mapRef.current,
        ...coordinate,
        latitudeDelta: 0.00001,
        longitudeDelta: 0.00001,
      });
      onPress(coordinate);
    }
  };

  const getLocation = navigate => {
    setIsLoading(true);
    getCurrentLocation({ ref: mapRef.current, navigate })
      .then(data => {
        setcoordinate(data);
      })
      .catch(error => {
        if (error.message == 'No location provider available.') {
          setmodalSetting(true);
        }
        // Handle the error here
      })
      .finally(() => setIsLoading(false));
  };

  const turnGpsOn = () => {
    setmodalSetting(false);

    gpsEnabler()
      .then(data => {
        getLocation(true);
      })
      .catch(err => {
        setmodalSetting(true);
      });
  };

  return (
    <>
      <Button
        style={{
          borderRadius: 100,
          backgroundColor: COLOR_BASE_PRIMARY_MAIN,
          padding: spacing.sm,
        }}
        onPress={() => onPressGps()}
        position="top-right"
      >
        {isLoading ? (
          <ActivityIndicator color={COLOR_WHITE} />
        ) : (
          <Icon color={COLOR_WHITE} name="plus" />
        )}
      </Button>
      <ModalConfirmation
        title={'Yahh GPS nya mati!'}
        subTitle={'GPS Perlu di hidupkan untuk mengakses fitur ini'}
        isVisible={modalSetting}
        onClose={() => setmodalSetting(false)}
        onSuccess={() => turnGpsOn()}
        successText="Aktifkan GPS"
      />
    </>
  );
};

export default index;
