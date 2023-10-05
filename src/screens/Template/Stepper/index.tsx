// import React, { useEffect, useRef, useState } from 'react';
// import { View, ScrollView, Image } from 'react-native';
// import Toast from 'react-native-toast-message';
// import IMAGES from '@images';
// import styles from './styles';
// import { Icon } from '@components';
// import BaseView from '@src/components/BaseView';
// import {
//   Stepper,
//   Text,
//   Input,
//   Button,
//   AutoImage,
//   Carousel,
// } from '@src/components';
// import { widthByScreen } from '@utils/dimensions';

// import { navigate } from '@utils/navigation';
// import { spacing } from '@constants/spacing';

// const Screen = () => {
//   const [step, setstep] = useState(1);
//   const [noHp, setnoHp] = useState('');
//   const scrollViewRef = useRef(null);

//   // const handleScrollEvent = handleHorizontalScroll();

//   // useEffect(() => {
//   // Toast.show({
//   //   type: 'success',
//   //   text1: `asd${step}`,
//   //   position:'bottom'
//   // });
//   // scrollToIndexHorizontal(step, scrollViewRef);
//   // }, [step]);
//   //   useEffect(() => {

//   //     return () => {
//   //       second;
//   //     };
//   //   }, []);

//   return (
//     <BaseView style={{}}>
//       <Carousel

//         data={[
//           {
//             image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
//             title: 'DCKTRP Dilengkapi dengan Data Real Time',
//             desc: 'DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan legislatif hingga kepala daerah yang berbasis web dan mobile',
//           },
//           {
//             image:
//               'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1200px-Sunflower_from_Silesia2.jpg',
//             title: 'DCKTRP Dilengkapi dengan Data Real Time',
//             desc: 'DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan legislatif hingga kepala daerah yang berbasis web dan mobile',
//           },
//           {
//             image: 'https://rickandmortyapi.com/api/character/avatar/99.jpeg',
//             title: 'DCKTRP 3',
//             desc: 'DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan legislatif hingga kepala daerah yang berbasis web dan mobile',
//           },
//         ]}
//       />
//       <View style={{ padding: spacing.sm }}>
//         <Button
//           title="Masuk"
//           onPress={() =>
//             navigate('Login', {
//               value: noHp,
//               type: 'Whatsapp',
//             })
//           }
//         />
//         {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <View style={styles.line} />
//           <Text size='desc' style={{ margin: spacing.sm }}>
//             Atau daftar sebagai
//           </Text>
//           <View style={styles.line} />
//         </View> */}
//         <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//           <Button
//             // style={{ flex: 1,borderWidth:3 }}
//             type="outline"
//             title="Legislatif"
//             onPress={() =>
//               navigate('Login', {
//                 value: noHp,
//                 type: 'Whatsapp',
//               })
//             }
//           />
//           <Button
//             // style={{ flex: 1 }}
//             type="outline"
//             title="Kepala Daerah"
//             onPress={() =>
//               navigate('Register', {
//                 value: noHp,
//                 type: 'Whatsapp',
//               })
//             }
//           />
//         </View>
//       </View>
//     </BaseView>
//   );
// };

// export default Screen;
import { heightByScreen, widthByScreen } from '@utils/dimensions';
import { BaseView } from '@components';
import Header from '@components/index/Header';
import Stepper from '@components/index/Stepper';
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
import {
  handleHorizontalScroll,
  scrollToIndexHorizontal,
} from '@utils/scrolling';

const SplashScreen = () => {
  const [step, setstep] = useState(1);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToIndexHorizontal(step, scrollViewRef);
  }, [step]);

  return (
    <BaseView error={false}>
      <Header title="Stepper" />
      <ScrollView>
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollViewRef}
          onMomentumScrollEnd={event =>
            handleHorizontalScroll(event).then(
              (data: React.SetStateAction<number>) => setstep(data)
            )
          }
        >
          <View
            style={{
              height: 100,
              width: widthByScreen(100),
              backgroundColor: 'red',
            }}
          />
          <View
            style={{
              height: 100,
              width: widthByScreen(100),
              backgroundColor: 'blue',
            }}
          />
          <View
            style={{
              height: 100,
              width: widthByScreen(100),
              backgroundColor: 'pink',
            }}
          />
          <View
            style={{
              height: 100,
              width: widthByScreen(100),
              backgroundColor: 'green',
            }}
          />
        </ScrollView>
        {/* step bar with content */}
        <Stepper
          dataStep={4}
          currentStep={step}
          onPressStep={(index: React.SetStateAction<number>) => {
            setstep(index);
          }}
          type="bar"
        />
        <Stepper
          dataStep={4}
          currentStep={step}
          onPressStep={(index: React.SetStateAction<number>) => {
            setstep(index);
          }}
          type="dot"
        />
        {/* step single 1*/}
        <Stepper
          dataStep={[
            'informasi pribadi',
            'domisili tempat tinggal',
            'informasi caleg',
            'e-ktp dan foto profil',
            'status kependudukan',
          ]}
          currentStep={step}
          onPressStep={(index: React.SetStateAction<number>) => setstep(index)}
          type="default"
        />
        {/* step single 2 */}
        <Stepper
          dataStep={[
            {
              title: 'informasi pribadi',
              desc: 'Dana akan diteruskan ke penjual.',
            },
            {
              title: 'domisili tempat tinggal',
              desc:
                'Transaksi telah dikonfirmasi pembeli dan menunggu review Tokopedia.',
            },
            {
              title: 'informasi caleg',
              desc: 'Received by nina',
            },
            {
              title: 'e-ktp dan foto profil',
              desc: 'Pesanan Anda dalam proses pengiriman oleh kurir.',
            },
          ]}
          currentStep={step}
          onPressStep={(index: React.SetStateAction<number>) => setstep(index)}
          type="default"
        />
        {/* step dengan nomor */}
        <Stepper
          type="vertical"
          dataStep={[
            'informasi pribadi',
            'domisili tempat tinggal',
            'informasi caleg',
            'e-ktp dan foto profil',
          ]}
          currentStep={step}
          onPressStep={(index: React.SetStateAction<number>) => setstep(index)}
        />
        <Stepper
        type='circle'
          dataStep={[
            {
              title: 'Transaksi selesai.',
              desc: 'Dana akan diteruskan ke penjual.',
            },
            {
              title: 'Transaksi dikonfirmasi.',
              desc:
                'Transaksi telah dikonfirmasi pembeli dan menunggu review Tokopedia.',
            },
            {
              title: 'Pesanan telah tiba di tujuan.',
              desc: 'Received by nina',
            },
            {
              title: 'Pesanan telah dikirim.',
              desc: 'Pesanan Anda dalam proses pengiriman oleh kurir.',
            },
            { title: 'Pemesanan sedang diproses oleh penjual.' },
            {
              title: 'Pembayaran sudah Diverifikasi.',
              desc:
                'Pembayaran telah diterima Tokopedia dan pesanan Anda sudah diteruskan ke penjual.',
            },
          ]}
          currentStep={step}
          onPressStep={(index: React.SetStateAction<number>) => setstep(index)}
        />
        {/* step vertical */}
        <Stepper
          type={'vertical'}
          dataStep={[
            {
              title: 'Transaksi selesai.',
              desc: 'Dana akan diteruskan ke penjual.',
            },
            {
              title: 'Transaksi dikonfirmasi.',
              desc:
                'Transaksi telah dikonfirmasi pembeli dan menunggu review Tokopedia.',
            },
            {
              title: 'Pesanan telah tiba di tujuan.',
              desc: 'Received by nina',
            },
            {
              title: 'Pesanan telah dikirim.',
              desc: 'Pesanan Anda dalam proses pengiriman oleh kurir.',
            },
            { title: 'Pemesanan sedang diproses oleh penjual.' },
            {
              title: 'Pembayaran sudah Diverifikasi.',
              desc:
                'Pembayaran telah diterima Tokopedia dan pesanan Anda sudah diteruskan ke penjual.',
            },
          ]}
          currentStep={step}
          onPressStep={(index: React.SetStateAction<number>) => setstep(index)}
        />
      </ScrollView>
    </BaseView>
  );
};

export default SplashScreen;
