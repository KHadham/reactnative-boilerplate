import {
  COLOR_BASE_PRIMARY_DARK,
  color,
  COLOR_FONT_PRIMARY_DARK,
  COLOR_FONT_PRIMARY_LIGHT,
  COLOR_WHITE,
} from '@themes/index';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { toTitleCase } from '@utils/index';
// import Toast from 'react-native-simple-toast';
import { Circle } from 'react-native-svg';
import { widthByScreen } from '@utils/dimensions';
import {
  LayoutAnimationHandler,
  scrollToIndexHorizontal,
} from '@utils/uiHandler';
import { Text } from '@components';
type Props = {
  currentStep: number,
  dataStep: Array<string> | Array<object> | number,
  onPressStep?: Function,
  type?: 'dot' | 'bar' | 'circle' | 'vertical' | 'default',
  containerStyle?: ViewStyle,
  color: string
};

const Component: React.FC<Props> = ({
  currentStep,
  dataStep,
  onPressStep = () => { },
  containerStyle,
  type = 'default',
  color = COLOR_WHITE
}) => {
  const scrollViewRef = useRef(null);

  const [animationValues, setAnimationValues] = useState([]);
  const [animationRadial] = useState(new Animated.Value(1));

  const [totalStep, settotalStep] = useState(0);
  const [prevStep, setprevStep] = useState(0);

  useEffect(() => {
    const numSteps = Array.isArray(dataStep) ? dataStep.length : dataStep;
    settotalStep(numSteps);
    setAnimationValues(
      new Array(numSteps).fill(null).map(() => new Animated.Value(0))
    );
  }, []);

  useEffect(() => {
    barAnimating(currentStep);
  }, [animationValues, currentStep]);

  const barAnimating = (toStep: number) => {
    // LayoutAnimationHandler();
    scrollToIndexHorizontal(toStep, scrollViewRef);
    let animations: Animated.CompositeAnimation[];
    if (toStep > prevStep - 1) {
      animations = animationValues
        .slice(prevStep - 1, toStep)
        .map((value, index) => {
          return Animated.timing(value, {
            toValue: 1,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: false,
          });
        });
      Animated.sequence([
        Animated.timing(animationRadial, {
          toValue: 2,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(animationRadial, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.circle),
        }),
      ]).start();
    } else {
      animations = animationValues
        .slice(toStep, animationValues.length)
        .reverse()
        .map((value, index) => {
          return Animated.timing(value, {
            toValue: 0,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: false,
          });
        });
      Animated.sequence([
        Animated.timing(animationRadial, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(animationRadial, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.out(Easing.circle),
        }),
      ]).start();
    }
    Animated.sequence(animations).start(() => {
      setprevStep(toStep);
    });
  };

  const stepper = () => {
    if (Array.isArray(dataStep)) {
      if (type !== 'vertical') {
        // number
        return (
          <ScrollView
            horizontal={true}
            scrollEnabled={dataStep.length > 4}
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {Array.isArray(dataStep) &&
              dataStep.map((item, index) => (
                <>
                  <View style={{ width: index == 0 ? 20 : 0 }} />
                  <View key={index} style={styles.stepWrap}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Animated.View
                        style={[
                          styles.leftHorizontalBar,
                          animationValues[index] && {
                            height: index !== 0 ? 5 : 0,
                            backgroundColor: animationValues[index].interpolate(
                              {
                                inputRange: [0, 1],
                                outputRange: [
                                  '#8D98AA',
                                  color,
                                ],
                              }
                            ),
                          },
                        ]}
                      />
                      <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={() => {
                          onPressStep(index + 1);
                        }}
                      >
                        <View style={styles.txtInactive}>
                          <Text size="desc" style={{ color: 'white' }}>
                            {index + 1}
                          </Text>
                        </View>
                        <Animated.View
                          style={[
                            styles.stepNumber,
                            animationValues[index] && {
                              width: animationValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 26],
                              }),
                              opacity: animationValues[index],
                            },
                          ]}
                        >
                          <Text size="desc" style={{ color: 'white' }}>
                            {index + 1}
                          </Text>
                        </Animated.View>
                      </TouchableOpacity>
                      <Animated.View
                        style={[
                          styles.rightHorizontalBar,
                          animationValues[index + 1] && {
                            height: index < dataStep.length - 1 ? 5 : 0,
                            backgroundColor: animationValues[
                              index + 1
                            ].interpolate({
                              inputRange: [0, 1],
                              outputRange: ['#8D98AA', color],
                            }),
                          },
                        ]}
                      />
                    </View>
                    <Text
                      weight="bold"
                      onPress={() => onPressStep(index + 1)}
                      style={{
                        color:
                          index >= currentStep
                            ? 'grey'
                            : COLOR_FONT_PRIMARY_DARK,
                        textAlign: 'center',
                      }}
                    >
                      {toTitleCase(item?.title ? item?.title : item)}
                    </Text>
                  </View>
                  {dataStep.length > 4 && (
                    <View
                      style={{
                        width: index + 1 == dataStep.length ? 20 : 0,
                      }}
                    />
                  )}
                </>
              ))}
          </ScrollView>
        );
      } else {
        // vertical
        return (
          <ScrollView style={{ paddingHorizontal: 20 }}>
            {Array.isArray(dataStep) &&
              dataStep.map((item, index) => (
                <>
                  <View style={styles.verticalBarWrap} key={index}>
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity
                        style={{ marginVertical: 10 }}
                        onPress={() => {
                          onPressStep(index + 1);
                        }}
                      >
                        <View style={styles.txtInactive}>
                          <Text weight="bold" style={{ color: 'white' }}>
                            {index + 1}
                          </Text>
                        </View>
                        <Animated.View
                          style={[
                            styles.stepNumber,
                            animationValues[index] && {
                              height: animationValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 26],
                              }),
                              opacity: animationValues[index],
                            },
                          ]}
                        >
                          <Text weight="bold" style={{ color: 'white' }}>
                            {index + 1}
                          </Text>
                        </Animated.View>
                      </TouchableOpacity>
                      {index < dataStep.length - 1 && (
                        <Animated.View
                          style={[
                            styles.verticalBar,
                            animationValues[index + 1] && {
                              borderColor: animationValues[
                                index + 1
                              ].interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                  '#8D98AA',
                                  color,
                                ],
                              }),
                            },
                          ]}
                        />
                      )}
                    </View>
                    <View style={{ flex: 1, margin: 10 }}>
                      <Animated.Text
                        style={[
                          animationValues[index] && {
                            color: animationValues[index].interpolate({
                              inputRange: [0, 1],
                              outputRange: [
                                COLOR_FONT_PRIMARY_LIGHT,
                                COLOR_FONT_PRIMARY_DARK,
                              ],
                            }),
                          },
                          { fontFamily: 'Inter-Bold' },
                        ]}
                      >
                        {toTitleCase(item?.title ? item?.title : item)}
                      </Animated.Text>
                      {item.desc && (
                        <Animated.Text
                          style={[
                            animationValues[index] && {
                              color: animationValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                  COLOR_FONT_PRIMARY_LIGHT,
                                  COLOR_FONT_PRIMARY_DARK,
                                ],
                              }),
                              fontFamily: 'Inter-Regular',
                            },
                          ]}
                        >
                          {toTitleCase(item?.desc ? item?.desc : item)}
                        </Animated.Text>
                      )}
                    </View>
                  </View>
                </>
              ))}
          </ScrollView>
        );
      }
    } else {
      return barStepper();
    }
  };

  const barStepper = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {Array(dataStep)
        .fill(0)
        .map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              type !== 'bar' ? { width: 10 } : { flex: 1 },
              styles.barInactive,
            ]}
            onPress={() => onPressStep(index + 1)}
          >
            <View
              style={[
                styles.barActive,
                { width: index + 1 <= currentStep ? '100%' : '0%', backgroundColor: color },
              ]}
            />
          </TouchableOpacity>
        ))}
    </View>
  );

  const radialStepper = () => {
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={(currentStep / totalStep) * 100}
          tintColor={color}
          backgroundColor={COLOR_BASE_PRIMARY_DARK}
          rotation={0}
        >
          <Text size="title">
            {currentStep} / {totalStep}
          </Text>
        </AnimatedCircularProgress>
        <Animated.View
          style={[
            styles.stepTextWrap,
            {
              opacity: animationRadial.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, 1, 0],
              }),
              transform: [
                {
                  translateX: animationRadial.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [-50, 0, 50],
                  }),
                },
              ],
            },
          ]}
        >
          <Text size="title" style={{ textAlign: 'right' }}>
            {toTitleCase(
              dataStep[currentStep - 1]?.title ?? dataStep[currentStep - 1]
            )}
          </Text>
          {dataStep[currentStep - 1]?.desc && (
            <Text size="desc" style={{ textAlign: 'right' }}>
              {toTitleCase(dataStep[currentStep - 1]?.desc)}
            </Text>
          )}
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      {type == 'circle' && Array.isArray(dataStep)
        ? radialStepper()
        : stepper()}
    </View>
  );
};

export default Component;
