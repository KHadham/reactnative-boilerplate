import { View, Text } from 'react-native';
import React from 'react';
import { spacing } from '@constants/spacing';
import { COLOR_FONT_PRIMARY_LIGHT, COLOR_WHITE } from '@themes/index';

const index = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: -spacing.sm,
        backgroundColor: COLOR_WHITE,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
      }}
    >
      <View
        style={{
          borderWidth: 2,
          width: 50,
          borderRadius: 100,
          borderColor: COLOR_FONT_PRIMARY_LIGHT,
          margin: 12,
        }}
      />
    </View>
  );
};

export default index;
