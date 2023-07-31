import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { BaseView } from '@components';
import Header from '@components/index/Header';
import Stepper from '@components/index/Stepper';
import Input from '@components/index/Input';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Animated,
  Text,
  TextInput,
  Easing,
  ScrollView,
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
// import Toast from 'react-native-simple-toast';
import {
  handleHorizontalScroll,
  scrollToIndexHorizontal,
} from '@utils/uiHandler';
import { COLOR_FONT_PRIMARY_DARK } from '@themes/index';

const SplashScreen = () => {
  const [step, setstep] = useState(1);
  const scrollViewRef = useRef(null);

  const handleScrollEvent = handleHorizontalScroll(
    step,
    () => setstep(step + 1),
    () => setstep(step - 1)
  );

  useEffect(() => {
    scrollToIndexHorizontal(step, scrollViewRef);
  }, [step]);

  return (
    <BaseView>
      <Header right="bantuan" />
      <ScrollView>
        {/* step bar with content */}
        <Stepper
          dataStep={4}
          currentStep={step}
          onPressStep={(index: React.SetStateAction<number>) => {
            setstep(index);
            // scrollToIndexHorizontal(index, scrollViewRef);
          }}
        />
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollViewRef}
          onMomentumScrollEnd={handleScrollEvent}
        >
          <View
            style={{
              flex: 1,
              width: widthByScreen(100),
            }}
          >
            <View style={{ margin: 16, marginTop: 0 }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 24,
                  color: COLOR_FONT_PRIMARY_DARK,
                }}
              >
                Informasi pribadi
              </Text>
              <Text>
                Lengkapi informasi pribadi Anda pada formulir pendaftaran ini
              </Text>
            </View>
            <Input
              label={`Nama Lengkap`}
              onInteract={(data: React.SetStateAction<string>) => {}}
              value={'Masukan Nama'}
            />
            <Input
              label={`NIK`}
              onInteract={(data: React.SetStateAction<string>) => {}}
              value={'Masukan NIK Ktp'}
            />
            <Input
              label={`Email`}
              onInteract={(data: React.SetStateAction<string>) => {}}
              value={'Email@email.com'}
            />
            <Input
              label={`No.HP / Telepon`}
              onInteract={(data: React.SetStateAction<string>) => {}}
              value={'08123456789'}
            />
          </View>
          <View
            style={{
              flex: 1,
              width: widthByScreen(100),
            }}
          >
            <View style={{ margin: 16, marginTop: 0 }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 24,
                  color: COLOR_FONT_PRIMARY_DARK,
                }}
              >
                Domisili Tempat Tinggal
              </Text>
              <Text>
                Lengkapi informasi pribadi Anda pada formulir pendaftaran ini
              </Text>
            </View>
            <Input
              label="Provinsi"
              onInteract={(data: React.SetStateAction<string>) => {}}
              data={['Egypt', 'Canada', 'Australia', 'Cilodong']}
              value={''}
              type="select"
              placeholder="Pilih Provinsi ..."
            />
            <Input
              label="Kabupaten / Kota"
              onInteract={(data: React.SetStateAction<string>) => {}}
              data={['Egypt', 'Canada', 'Australia', 'Cilodong']}
              value={''}
              type="select"
              placeholder="Pilih Kabupaten / Kota ..."
            />
            <Input
              label="Kecamatan"
              onInteract={(data: React.SetStateAction<string>) => {}}
              data={['Egypt', 'Canada', 'Australia', 'Cilodong']}
              value={''}
              type="select"
              placeholder="Pilih Kecamatan ..."
            />
            <Input
              label="Kelurahan"
              onInteract={(data: React.SetStateAction<string>) => {}}
              data={['Egypt', 'Canada', 'Australia', 'Cilodong']}
              value={''}
              type="select"
              placeholder="Pilih Kelurahan ..."
            />
            <Input
              label={`Alamat Rumah`}
              onInteract={(data: React.SetStateAction<string>) => {}}
              value={'Masukan Alamat Rumah'}
            />
          </View>
          <View
            style={{
              flex: 1,
              width: widthByScreen(100),
            }}
          >
            <View style={{ margin: 16, marginTop: 0 }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 24,
                  color: COLOR_FONT_PRIMARY_DARK,
                }}
              >
                Informasi Caleg
              </Text>
              <Text>
                Lengkapi informasi pribadi Anda pada formulir pendaftaran ini
              </Text>
            </View>
            <Input
              label="Level Pemilihan"
              onInteract={(data: React.SetStateAction<string>) => {}}
              data={['Egypt', 'Canada', 'Australia', 'Cilodong']}
              value={''}
              type="select"
              placeholder="Pilih Level Pemilihan ..."
            />
            <Input
              label="Daerah Pemilihan"
              onInteract={(data: React.SetStateAction<string>) => {}}
              data={['Egypt', 'Canada', 'Australia', 'Cilodong']}
              value={''}
              type="select"
              placeholder="Pilih Daerah Pemilihan ..."
            />
            <Input
              label="Partai Politik"
              onInteract={(data: React.SetStateAction<string>) => {}}
              data={['Egypt', 'Canada', 'Australia', 'Cilodong']}
              value={''}
              type="select"
              placeholder="Pilih Partai Politik"
            />
          </View>
          <View
            style={{
              flex: 1,
              width: widthByScreen(100),
            }}
          >
            <View style={{ margin: 16, marginTop: 0 }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 24,
                  color: COLOR_FONT_PRIMARY_DARK,
                }}
              >
                Upload e-KTP dan Foto Profil
              </Text>
              <Text>
                Lengkapi informasi pribadi Anda pada formulir pendaftaran ini
              </Text>
            </View>
            <Input
              label="Ambil Foto Ktp"
              onInteract={(data: React.SetStateAction<string>) => {}}
              value={''}
              type="image"
              length={1}
            />
            <View style={{ flexDirection: 'row' }}>
              <Input
                label="Ambil Foto Ktp"
                onInteract={(data: React.SetStateAction<string>) => {}}
                value={''}
                type="image"
                length={1}
              />
              <Input
                label="Ambil Foto Profil"
                onInteract={(data: React.SetStateAction<string>) => {}}
                value={''}
                type="image"
                length={1}
              />
            </View>
          </View>
        </ScrollView>
        {/* step single 1*/}
      </ScrollView>
    </BaseView>
  );
};

export default SplashScreen;
