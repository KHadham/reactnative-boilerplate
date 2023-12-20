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
import {
  goToPlaystore,
  navigates,
  useNavigationHandler,
} from '@utils/navigation';
import {
  COLOR_BACKGROUND_INFORMATION,
  COLOR_BACKGROUND_SUCCESS,
  COLOR_EVENT_ERROR,
  COLOR_EVENT_INACTIVE,
  COLOR_GREY,
  COLOR_WHITE,
} from '@themes/index';
import { useProfile } from '../hooks/useProfile';
import { useVerify } from '@authApp/hooks/useVerify';
// import profilStore from '@profileApp/stores';
import { openSettings } from 'react-native-permissions';
import { FlashList } from '@shopify/flash-list';
import { widthByScreen } from '@utils/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { useProfileStore } from '@profileApp/stores/storage';
import styles from '@profileApp/styles';

const App: React.FC = () => {
  const { navigate } = useNavigationHandler();
  const { dataEmployee, dataPersonal } = useProfile();
  const { data: dataAuth } = useVerify();
  const [baseModal, setbaseModal] = useState('');

  const MENULIST = [
    {
      title: 'Akun',
      data: [
        {
          title: 'Informasi Personal',
          right: () => {
            navigate({ parent: 'Profile', screen: 'InformasiPersonal' });
          },
        },
        // {
        //   title: 'Data Kepegawaian',
        //   right: () => {
        //     navigate({ parent: 'Profile', screen: 'DataKepegawaian' });
        //   },
        // },
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
          right: () => {},
        },
        {
          title: 'Chat Admin',
          right: () => {},
        },
        {
          title: 'Produk Hukum',
          right: () => {
            navigate({ parent: 'Profile', screen: 'ProdukHukum' });
          },
        },
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
          colors={[COLOR_BACKGROUND_INFORMATION, '#FFFFFF']}
          style={styles.gradientHeader}
        />
        <View style={styles.headerContentWrap}>
          <Avatar
            source={dataEmployee?.foto}
            size={spacing.xxl}
            badge={'online'}
            count={10}
            avatarColor="white"
          />
          <View style={styles.innerheaderContentWrap}>
            <Text size="title" weight="bold">
              {dataAuth?.nama}
              <Text size="desc"> ({dataPersonal?.user_group})</Text>
            </Text>
            <View style={styles.nameLabelWrap}>
              <Icon name="phone" />
              <Text size="desc"> {dataAuth?.telepon}</Text>
            </View>
            <View style={styles.nameLabelWrap}>
              <Icon name="email-outline" />
              <Text size="desc"> {dataAuth?.email}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <BaseView
      baseModal={baseModal}
      onCloseBaseModal={() => setbaseModal('')}
      statusBarColor={COLOR_BACKGROUND_INFORMATION}
    >
      <SectionList
        ListFooterComponentStyle={{ margin: spacing.md }}
        stickySectionHeadersEnabled={true}
        ListHeaderComponent={() => header()}
        showsVerticalScrollIndicator={false}
        sections={MENULIST}
        contentContainerStyle={{}}
        keyExtractor={(item, index) => item.title + index}
        ItemSeparatorComponent={() => (
          <Separator marginHorizontal={spacing.md} />
        )}
        renderItem={({ item, index }) => (
          <ItemList
            style={{
              paddingHorizontal: spacing.md,
              backgroundColor: COLOR_WHITE,
            }}
            desc={item.title}
            rightAction={item.right}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              backgroundColor: COLOR_WHITE,
              padding: spacing.md,
              borderBottomWidth: 0.5,
              borderColor: COLOR_EVENT_INACTIVE,
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
            style={{ marginVertical: spacing.sm }}
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
