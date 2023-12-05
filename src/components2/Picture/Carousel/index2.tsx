// import React, { useEffect, useRef, useState } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import Toast from 'react-native-toast-message';
// import IMAGES from '@images';
// import styles from './styles';
// import { Icon } from '@components';
// import { widthByScreen } from '@utils/dimensions';
// import { spacing } from '@constants/spacing';
// import { Text, Stepper, AutoImage } from '@src/components';
// import Carousel from 'react-native-reanimated-carousel';
// import TCarouselProps from 'react-native-reanimated-carousel';

// interface AppProps {
//   data: Array<object>;
//   indicator?: boolean;
//   // props?: TCarouselProps
// }
// type TCarouselProps = /*unresolved*/ any;

// const App: React.FC<AppProps> = ({
//   indicator = true,
//   data = [
//     {
//       image: '',
//       title: '',
//       desc: '',
//     },
//   ],
// }) => {
//   const CarouselRef = useRef(null);

//   const [step, setstep] = useState(1);

//   //   useEffect(() => {
//   // Toast.show({
//   //   type: 'success',
//   //   text1: 'Hello',
//   //   text2: 'This is some something 👋'
//   // });

//   //     return () => {
//   //       second;
//   //     };
//   //   }, []);

//   return (
//     <View>
//       <Carousel
//         ref={CarouselRef}
//         snapEnabled
//         mode="parallax"
//         loop
//         width={widthByScreen(100)}
//         height={500}
//         data={data}
//         // scrollAnimationDuration={1000}
//         onSnapToItem={index => setstep(index + 1)}
//         renderItem={({ index, item }) => (
//           <View
//             style={{
//               width: widthByScreen(100),
//               padding: spacing.md,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <AutoImage
//               source={{
//                 uri: item.image,
//               }}
//               maxWidth={widthByScreen(100)}
//               // style={{ flex: 1, borderRadius: 20, marginBottom: spacing.md }}
//             />
//             {item.title && (
//               <Text size='header' position='center'>
//                 {item.title}
//               </Text>
//             )}
//             {item.desc && (
//               <Text size='desc' position='center'>{item.desc}</Text>
//             )}
//           </View>
//         )}
//       />
//       {indicator && (
//         <Stepper
//           style={{ marginHorizontal: 100 }}
//           dataStep={data.length}
//           currentStep={step}
//           onPressStep={(index: React.SetStateAction<number>) => {
//             Toast.show({
//               type: 'success',
//               text1: `asd${index}`,
//             });
//             CarouselRef.current.scrollTo(index);
//             // CarouselRef?.current?.scrollTo({
//             //   x: (index - 1) * widthByScreen(100),
//             //   animated: true,
//             // });
//           }}
//           singleStep={true}
//         />
//       )}
//     </View>
//   );
// };

// export default App;
// {
//   /* <ScrollView
//         showsHorizontalScrollIndicator={false}
//         style={{}}
//         horizontal
//         pagingEnabled
//         ref={scrollViewRef}
//         onScroll={event => {
//           setstep(
//             Math.floor(
//               event.nativeEvent.contentOffset.x /
//                 Math.floor(widthByScreen(100)) +
//                 1
//             )
//           );
//         }}
//         // onMomentumScrollEnd={
//         // event => setstep(Math.floor(event.nativeEvent.contentOffset.x) / Math.floor(widthByScreen(100)) + 1)
//         // handleHorizontalScroll(event).then(
//         //   (data: React.SetStateAction<number>) => setstep(data)
//         // )
//         // }
//       >
//         <View
//           style={{
//             width: widthByScreen(100),
//             padding: spacing.md,
//             justifyContent: 'center',``
//             alignItems: 'center',
//           }}
//         >
//           <AutoImage
//             source={{
//               uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1200px-Sunflower_from_Silesia2.jpg',
//             }}
//             maxWidth={widthByScreen(90)}
//             style={{ flex: 1, borderRadius: 20, marginBottom: spacing.md }}
//           />
//           <Text size='header' position='center'>
//             DCKTRP Dilengkapi dengan Data Real Time
//           </Text>
//           <Text size='desc' position='center'>
//             DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan
//             legislatif hingga kepala daerah yang berbasis web dan mobile
//           </Text>
//         </View>
//         <View
//           style={{
//             width: widthByScreen(100),
//             padding: spacing.md,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <AutoImage
//             source={{
//               uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1200px-Sunflower_from_Silesia2.jpg',
//             }}
//             maxWidth={widthByScreen(90)}
//             style={{ flex: 1, borderRadius: 20, marginBottom: spacing.md }}
//           />
//           <Text size='header' position='center'>
//             DCKTRP Dilengkapi dengan Data Real Time
//           </Text>
//           <Text size='desc' position='center'>
//             DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan
//             legislatif hingga kepala daerah yang berbasis web dan mobile
//           </Text>
//         </View>
//         <View
//           style={{
//             width: widthByScreen(100),
//             padding: spacing.md,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <AutoImage
//             source={{
//               uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1200px-Sunflower_from_Silesia2.jpg',
//             }}
//             maxWidth={widthByScreen(90)}
//             style={{ flex: 1, borderRadius: 20, marginBottom: spacing.md }}
//           />
//           <Text size='header' position='center'>
//             DCKTRP Dilengkapi dengan Data Real Time
//           </Text>
//           <Text size='desc' position='center'>
//             DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan
//             legislatif hingga kepala daerah yang berbasis web dan mobile
//           </Text>
//         </View>
//         <View
//           style={{
//             width: widthByScreen(100),
//             padding: spacing.md,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <AutoImage
//             source={IMAGES.bgCitata}
//             maxWidth={widthByScreen(90)}
//             style={{
//               flex: 1,
//               width: 300,
//               borderRadius: 20,
//               marginBottom: spacing.md,
//             }}
//           />
//           <Text size='header' position='center'>
//             DCKTRP Dilengkapi dengan Analisa Teraktual
//           </Text>
//           <Text size='desc' position='center'>
//             DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan
//             legislatif hingga kepala daerah yang berbasis web dan mobile
//           </Text>
//         </View>
//         <View
//           style={{
//             width: widthByScreen(100),
//             padding: spacing.md,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <AutoImage
//             source={{
//               uri: 'https://DCKTRP.com/img/hero-laptop.webp',
//             }}
//             maxWidth={widthByScreen(90)}
//             style={{ flex: 1, borderRadius: 20, marginBottom: spacing.md }}
//           />
//           <Text size='header' position='center'>
//             DCKTRP Dilengkapi dengan Analisa GIS
//           </Text>
//           <Text size='desc' position='center'>
//             DCKTRP menghadirkan inovasi digital yang dirancang untuk pemenangan
//             legislatif hingga kepala daerah yang berbasis web dan mobile
//           </Text>
//         </View>
//       </ScrollView>
//       <Stepper
//         style={{ marginHorizontal: 100 }}
//         dataStep={5}
//         currentStep={step}
//         onPressStep={(index: React.SetStateAction<number>) => setstep(index)}
//         singleStep={true}
//       /> */
// }
import { widthByScreen } from "@utils/dimensions";
import * as React from "react";
import { View,Button as SButton, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

// import { SBItem } from "../../components/SBItem";
// import SButton from "../../components/SButton";
// import { ElementsText, window } from "../../constants";

const PAGE_WIDTH = widthByScreen(100)
const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

function Index() {
  const [isVertical, setIsVertical] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
  const progressValue = useSharedValue<number>(0);
  const baseOptions = isVertical
    ? ({
      vertical: true,
      width: PAGE_WIDTH * 0.86,
      height: PAGE_WIDTH * 0.6,
    } as const)
    : ({
      vertical: false,
      width: PAGE_WIDTH,
      height: PAGE_WIDTH * 0.6,
    } as const);

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Carousel
        {...baseOptions}
        style={{
           width: PAGE_WIDTH * 0.86,
        }}
        loop
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        autoPlay={autoPlay}
        autoPlayInterval={1500}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={colors}
        renderItem={({ index }) =>
         <View style={{borderWidth:1}}>
          <Text>{index}</Text>
        </View>}
      />
      {!!progressValue && (
        <View
          style={
            isVertical
              ? {
                flexDirection: "column",
                justifyContent: "space-between",
                width: 10,
                alignSelf: "center",
                position: "absolute",
                right: 5,
                top: 40,
              }
              : {
                flexDirection: "row",
                justifyContent: "space-between",
                width: 100,
                alignSelf: "center",
                borderWidth:1
              }
          }
        >
          {colors.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={isVertical}
                length={colors.length}
              />
            );
          })}
        </View>
      )}
      <SButton
        onPress={() => setAutoPlay(!autoPlay)}
        title="aasd"
      />
      {/* <SButton
        onPress={() => {
          setIsVertical(!isVertical);
        }}
      >
        {isVertical ? "Set horizontal" : "Set Vertical"}
      </SButton>
      <SButton
        onPress={() => {
          setPagingEnabled(!pagingEnabled);
        }}
      >
        {`pagingEnabled:${pagingEnabled}`}
      </SButton>
      <SButton
        onPress={() => {
          setSnapEnabled(!snapEnabled);
        }}
      >
        {`snapEnabled:${snapEnabled}`}
      </SButton> */}
    </View>
  );
}

const PaginationItem: React.FC<{
  index: number
  backgroundColor: string
  length: number
  animValue: Animated.SharedValue<number>
  isRotate?: boolean
}> = (props) => {
  const { animValue, index, length, backgroundColor, isRotate } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        borderWidth:1,
        backgroundColor: "white",
        width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
            // borderWidth:1
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default Index;