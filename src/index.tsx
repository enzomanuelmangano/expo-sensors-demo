import { Dimensions, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedSensor,
  SensorType,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  BackdropBlur,
  Blur,
  BlurMask,
  Canvas,
  Fill,
  Group,
  LinearGradient,
  Oval,
  RadialGradient,
  Rect,
  RoundedRect,
  Shadow,
  vec,
} from '@shopify/react-native-skia';
import { useMemo } from 'react';

const CanvasSize = {
  width: 500,
  height: 500,
};

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const SquareSize = 170;
const App = () => {
  // const rotation = useAnimatedSensor(SensorType.ROTATION, {
  //   interval: 20,
  //   adjustToInterfaceOrientation: false,
  // });
  const rotationGravity = useAnimatedSensor(SensorType.GRAVITY, {
    interval: 20,
    adjustToInterfaceOrientation: true,
  });

  // const animatedStyle = useAnimatedStyle(() => {
  //   const { z, x } = rotationGravity.sensor.value;

  //   const rotateX = interpolate(
  //     z,
  //     [-10, -6, -1],
  //     [-25, 0, 25],
  //     Extrapolation.CLAMP,
  //   );

  //   const rotateY = interpolate(
  //     x,
  //     [-5, 0, 5],
  //     [25, 0, -25],
  //     Extrapolation.CLAMP,
  //   );

  //   return {
  //     transform: [
  //       { perspective: 100 },
  //       { rotateX: `${rotateX}deg` },
  //       { rotateY: `${rotateY}deg` },
  //     ],
  //   };
  // });

  const rotateX = useDerivedValue(() => {
    const { z } = rotationGravity.sensor.value;

    return interpolate(
      z,
      [-10, -6, -1],
      [-Math.PI / 8, 0, Math.PI / 8],
      Extrapolation.CLAMP,
    );
  });

  const rotateY = useDerivedValue(() => {
    const { x } = rotationGravity.sensor.value;

    return interpolate(
      x,
      [-5, 0, 5],
      [Math.PI / 8, 0, -Math.PI / 8],
      Extrapolation.CLAMP,
    );
  });

  const rTransform = useDerivedValue(() => {
    return [
      { perspective: 200 },
      { rotateX: rotateX.value },
      { rotateY: rotateY.value },
    ];
  });

  const shadowDx = useDerivedValue(() => {
    return interpolate(
      rotateY.value,
      [-Math.PI / 8, 0, Math.PI / 8],
      [10, 0, -10],
      Extrapolation.CLAMP,
    );
  });

  const shadowDy = useDerivedValue(() => {
    return interpolate(
      rotateX.value,
      [-Math.PI / 8, 0, Math.PI / 8],
      [7, 0, 10], // Exception instead of (-10 use 7)
      Extrapolation.CLAMP,
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Canvas style={StyleSheet.absoluteFill}>
        <Fill color={'red'}>
          <RadialGradient
            c={vec(windowWidth / 2, windowHeight / 2)}
            r={windowWidth / 1.6}
            colors={['#252525', '#000000']}
          />
          <Blur blur={50} />
        </Fill>
      </Canvas>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Canvas
          style={{
            height: CanvasSize.height,
            width: CanvasSize.width,
          }}>
          <Group
            origin={vec(CanvasSize.width / 2, CanvasSize.height / 2)}
            transform={rTransform}>
            <Group>
              <RoundedRect
                x={CanvasSize.width / 2 - SquareSize / 2}
                y={CanvasSize.height / 2 - SquareSize / 2}
                width={SquareSize}
                height={SquareSize}
                color="#101010"
                r={35}
              />
              <RoundedRect
                x={CanvasSize.width / 2 - SquareSize / 2}
                y={CanvasSize.height / 2 - SquareSize / 2}
                width={SquareSize}
                height={SquareSize}
                color="#101010"
                r={35}>
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, CanvasSize.height / 1.8)}
                  colors={['#2e2e2e', '#0e0e0e']}
                />
                <Blur blur={10} />
              </RoundedRect>

              <Shadow color="#4c4c4c" inner blur={0} dx={0} dy={1} />
              <Shadow color="#000000" blur={3.5} dx={shadowDx} dy={shadowDy} />
            </Group>
            <ReactLogoSkia />
          </Group>
        </Canvas>
      </View>
    </View>
  );
};

const Size = 60;

const ReactLogoSkia = () => {
  const oval = useMemo(() => {
    return (
      <Oval
        x={-Size}
        y={-Size / 2.5}
        width={Size * 2}
        height={(Size / 2.5) * 2}
        color="#cecece"
        style="stroke"
        strokeWidth={2}
      />
    );
  }, []);
  return (
    <Group>
      <Group
        transform={[
          {
            translateX: CanvasSize.width / 2,
          },
          { translateY: CanvasSize.height / 2 },
        ]}>
        {oval}
        <Group transform={[{ rotate: Math.PI / 3 }]}>{oval}</Group>
        <Group transform={[{ rotate: (Math.PI * 2) / 3 }]}>{oval}</Group>
      </Group>
      <BlurMask blur={3} style="solid" />
    </Group>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export { App };
