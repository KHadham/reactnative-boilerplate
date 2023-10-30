import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Icon, ModalList } from '@components';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_WHITE } from '@themes/index';
import { spacing } from '@constants/spacing';
import { LayoutAnimationHandler } from '@utils/uiHandler';

const index = ({ selectedValue, onSelect }) => {
  const [modalLayer, setmodalLayer] = useState(false);

//   useEffect(() => {
//     LayoutAnimationHandler()
//   }, [modalLayer])
  
  return (
    <>
      <Button
        style={{
          borderRadius: 100,
          backgroundColor: COLOR_BASE_PRIMARY_MAIN,
          padding: spacing.sm,
        }}
        onPress={() => setmodalLayer(true)}
        position="top-right"
      >
        <Icon color={COLOR_WHITE} name="layers-triple-outline" />
      </Button>
      <ModalList
        isSearch={false}
        data={[
          {
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            name: 'Peta Struktur',
          },
          {
            url: 'https://tataruang.jakarta.go.id/server/rest/services/Peta_Dasar_Tile/MapServer/tile/{z}/{y}/{x}',
            name: 'Peta Ops',
          },
          {
            url: 'https://tataruang.jakarta.go.id/server/rest/services/Kawasan_Reklame_Tile/MapServer/tile/{z}/{y}/{x}',
            name: 'Kawasan Reklame',
          },
        ]}
        onClose={() => setmodalLayer(false)}
        title={'Layer List'}
        isVisible={modalLayer}
        selectedValue={selectedValue}
        onSelect={data => onSelect(data)}
        keyTitle={'item.name'}
      />
    </>
  );
};

export default index;
