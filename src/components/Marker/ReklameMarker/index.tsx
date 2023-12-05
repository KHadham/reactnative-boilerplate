import React, { useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';
import { hexToMatrix } from '@utils/uiHandler';
import { Image, View } from 'react-native';

import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { MARKER } from '@images';
import colors from '@themes/colors';
import { BaseAtributInterface } from '@semeterApp/stores/interfaces';
import { Icon, ModalBasic, Text } from '@components';
import { spacing } from '@constants/spacing';
import {
  COLOR_EVENT_ERROR,
  COLOR_EVENT_INFORMATION,
  COLOR_WHITE,
} from '@themes/index';

interface AppProps {
  index: number;
  item: {
    attributes: BaseAtributInterface,
    geometry: {
      x: number,
      y: number,
    },
  };
  coordinate: {
    latitude: number,
    longitude: number,
  };
  detailScreen: any;
}

const tindakanToImage = {
  0: MARKER.marker,
  1: MARKER.markerPemberitahuan,
  2: MARKER.markerSp,
  3: MARKER.markerSp,
  4: MARKER.markerSp,
  5: MARKER.markerSegel,
  6: MARKER.markerSpb,
  7: MARKER.markerBongkar,
};

const groupToColor = {
  0: colors.orange.orange_60,
  1: colors.bronze.bronze_60,
  2: colors.green.green_40,
  3: colors.purple.purple_40,
  4: colors.sky.sky_40,
  5: colors.sky.sky_40,
  6: colors.dusk.dusk_50,
};

const App: React.FC<AppProps> = ({ item, coordinate, detailScreen }) => {
  const [isDetailVisible, setisDetailVisible] = useState(false);
  const image =
    tindakanToImage[item.attributes.KD_JENIS_TINDAKAN] || MARKER.marker;
  const group = groupToColor[item.attributes.GROUP_BY_ID];

  return (
    <Marker
      coordinate={coordinate}
      tracksViewChanges={false}
      onPress={() => {
        setisDetailVisible(true);
        // onPress(item.attributes.REKLAME_ID);
      }}
      style={{
        borderWidth: 1,
        borderRadius: 100,
      }}
    >
      <ColorMatrix matrix={hexToMatrix(group)}>
        <Image
          source={image}
          style={{
            width: widthByScreen(5),
            height: widthByScreen(5),
          }}
        />
      </ColorMatrix>
      <ModalBasic
        header
        isVisible={isDetailVisible}
        onClose={() => setisDetailVisible(false)}
        style={{}}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: spacing.md,
            backgroundColor: COLOR_WHITE,
          }}
        >
          <Text weight="bold" size="title" style={{ flex: 1 }}>
            {item.attributes?.KONTEN || 'Judul kosong'}
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.xs }}>
            <Icon name="trash-can-outline" color={COLOR_EVENT_ERROR} />
            <Icon name="pencil-outline" color={COLOR_EVENT_INFORMATION} />
            <Icon name="close" onPress={() => setisDetailVisible(false)} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLOR_WHITE,
            paddingHorizontal: spacing.md,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text weight="bold">{item.attributes?.STRUKTUR} : </Text>
              <Text weight="bold">{item.attributes?.JENIS}</Text>
            </View>
            <Text type="italic">{item.attributes?.KODE}</Text>
          </View>
          <Text>
            {item.attributes?.LOKASI},{item.attributes?.KEL},
            {item.attributes?.KEC},{item.attributes?.WIL}
          </Text>
        </View>
        {detailScreen}
      </ModalBasic>
    </Marker>
  );
};

export default App;
