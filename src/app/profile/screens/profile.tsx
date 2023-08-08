import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SectionList,
  StatusBar,
} from 'react-native';
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
import { goToPlaystore, navigate, navigates } from '@utils/navigation';
import {
  COLOR_BACKGROUND_INFORMATION,
  COLOR_BACKGROUND_SUCCESS,
  COLOR_EVENT_ERROR,
  COLOR_GREY,
  COLOR_WHITE,
} from '@themes/index';
import { useProfile } from '../hooks/useProfile';
// import profilStore from '@profileApp/stores';
import { openSettings } from 'react-native-permissions';
import { FlashList } from '@shopify/flash-list';
import { widthByScreen } from '@utils/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { useProfileStore } from '@profileApp/stores';
import { isColorDark } from '@utils/uiHandler';

const App: React.FC = () => {
  const { doVerifyToken, getProfilDetail, data } = useProfile();
  const { user, personal, employee } = useProfileStore();

  const [baseModal, setbaseModal] = useState('');

  const DATA = [
    {
      title: 'Akun',
      data: [
        {
          title: 'Informasi Personal',
          right: () => {
            navigate({ parent: 'Profile', screen: 'InformasiPersonal' });
          },
        },
        {
          title: 'Data Kepegawaian',
          right: () => {
            navigate({ parent: 'Profile', screen: 'DataKepegawaian' });
          },
        },
        {
          title: 'Ganti Password',
          right: () => {
            navigate({ parent: 'Profile', screen: 'GantiPassword' });
          },
        },
      ],
    },
    {
      title: 'Bantuan',
      data: [
        {
          title: 'Pertanyaan Umum (F.A.Q)',
          right: () => {
            doVerifyToken();
          },
        },
        {
          title: 'Chat Admin',
          right: () => {
            getProfilDetail();
          },
        },
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
        <LinearGradient
          colors={['#E0F8D8', '#FFFFFF']}
          style={{
            position: 'absolute',
            width: widthByScreen(100),
            height: '100%',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: spacing.sm,
          }}
        >
          <Avatar
            source={employee?.foto}
            size={spacing.xxl}
            badge={'online'}
            count={10}
            avatarColor="white"
          />
          <View
            style={{
              margin: spacing.md,
              justifyContent: 'center',
              alignContent: 'center',
              flex: 1,
            }}
          >
            <Text size="title" weight="bold">
              {user?.nama}
              <Text size="desc"> ({personal?.user_group})</Text>
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="phone" />
              <Text size="desc"> {personal?.email}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="email-outline" />
              <Text size="desc"> {personal?.phone}</Text>
            </View>
          </View>
        </View>

        {/* <FlashList
          ListHeaderComponentStyle={{ marginLeft: spacing.md }}
          ListFooterComponentStyle={{ marginLeft: spacing.md }}
          data={[1, 2, 3, 4]}
          horizontal
          estimatedItemSize={10}
          ItemSeparatorComponent={() => <Spacer />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.md }}
          renderItem={({ item, index }) => (
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLOR_GREY,
                padding: 16,
                minWidth: widthByScreen(40),
                backgroundColor: 'white',
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
        /> */}
      </View>
    );
  };

  return (
    <BaseView
      baseModal={baseModal}
      onCloseBaseModal={() => setbaseModal('')}
      statusBarColor={'#E0F8D8'}
    >
      <SectionList
        ListFooterComponentStyle={{ margin: spacing.md }}
        stickySectionHeadersEnabled={true}
        ListHeaderComponent={() => header()}
        showsVerticalScrollIndicator={false}
        sections={DATA}
        contentContainerStyle={{}}
        keyExtractor={(item, index) => item.title + index}
        ItemSeparatorComponent={() => <Separator margin={spacing.md} />}
        renderItem={({ item, index }) => (
          <ItemList
            style={{ marginHorizontal: spacing.md }}
            desc={item.title}
            rightAction={item.right}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              backgroundColor: COLOR_WHITE,
              padding: spacing.md,
            }}
          >
            <Text size="title" weight="bold" style={{}}>
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
