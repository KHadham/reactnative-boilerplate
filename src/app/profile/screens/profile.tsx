import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, SectionList } from 'react-native';
import {
  BaseView,
  Text,
  ItemList,
  Separator,
  Avatar,
  Button,
  Icon,
  Spacer,
} from '@components';
import { spacing } from '@constants/spacing';
import { goToPlaystore, navigate } from '@utils/navigation';
import { COLOR_BACKGROUND_INFORMATION, COLOR_BACKGROUND_SUCCESS, COLOR_EVENT_ERROR, COLOR_GREY, COLOR_WHITE } from '@themes/index';
import GradientBg from '../../../../assets/svgs/GradientBg';
import { useProfile } from '../hooks/useProfile';
import profilStore from '@profileApp/stores';
import { openSettings } from 'react-native-permissions';
import { FlashList } from '@shopify/flash-list';
import { widthByScreen } from '@utils/dimensions';

const App: React.FC = () => {
  const { doVerifyToken } = useProfile();
  const { user } = profilStore();

  const [baseModal, setbaseModal] = useState('');

  useEffect(() => {
    console.log('user x:>> ', user);
  }, []);

  const DATA = [
    {
      title: 'Akun',
      data: [
        {
          title: 'Data Pribadi',
          right: () => {doVerifyToken()},
        },
        // { title: 'Data Caleg', right: () => {} },
        { title: 'Keamanan Akun', right: () => {} },
        // { title: 'Kode Referal', right: () => {} },
      ],
    },
    {
      title: 'Bantuan',
      data: [
        { title: 'Pertanyaan Umum (F.A.Q)', right: () => {} },
        { title: 'Chat Admin', right: () => {} },
        // { title: 'Kirim Tiket', right: () => {} },
      ],
    },
    {
      title: 'Aplikasi',
      data: [
        { title: 'Kebijakan Privasi', right: () => {} },
        { title: 'Ketentuan Layanan', right: () => {} },
        { title: 'Versi', right: 'v1.0.0' },
        {
          title: 'Perizinan',
          right: () => {
            openSettings();
          },
        },
        {
          title: 'Beri Rating',
          right: () => {
            goToPlaystore();
          },
        },
      ],
    },
  ];

  const header = () => {
    return (
      <View>
        {/* <View style={{position:'absolute',borderWidth:1,}}>
          <GradientBg color={COLOR_BACKGROUND_INFORMATION}/>
        </View> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            source={user?.nama}
            size={spacing.xxl}
            badge={'online'}
            count={10}
            avatarColor='white'
          />
          <View
            style={{
              margin: spacing.lg,
              justifyContent: 'center',
              alignContent: 'center',
              flex: 1,
            }}
          >
            <Text size="title" weight="bold">
              {user?.nama}
            </Text>
            <Text size="desc">{user?.email}</Text>
          </View>
        </View>

        <FlashList
          data={[1, 2, 3]}
          horizontal
          estimatedItemSize={10}
          ItemSeparatorComponent={() => <Spacer />}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLOR_GREY,
                padding: 16,
                minWidth: widthByScreen(35),
                backgroundColor:'white'
              }}
            >
              <Text size="desc">Total Pendukung</Text>
              <Spacer />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text size="title" weight="bold">
                  32123
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Icon name={'arrow-down-bold-circle'} color="red" size={25} />
                  <Text size="desc" color="red">
                    -5%
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <BaseView
      style={{ marginHorizontal: spacing.md }}
      baseModal={baseModal}
      onCloseBaseModal={() => setbaseModal('')}
    >
      <SectionList
        stickySectionHeadersEnabled={true}
        ListHeaderComponent={() => header()}
        showsVerticalScrollIndicator={false}
        sections={DATA}
        keyExtractor={(item, index) => item.title + index}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item, index }) => (
          <ItemList desc={item.title} rightAction={item.right} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ backgroundColor: COLOR_WHITE }}>
            <Text
              size="title"
              weight="bold"
              style={{ marginVertical: spacing.md }}
            >
              {title}
            </Text>
          </View>
        )}
        ListFooterComponent={
          <Button
            color={'danger'}
            containerStyle={{ marginVertical: spacing.sm }}
            title="Logout"
            onPress={() => setbaseModal('logout')}
            type="outline"
          />
        }
      />
    </BaseView>
  );
};

export default App;
