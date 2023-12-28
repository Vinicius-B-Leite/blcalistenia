import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dimensions} from 'react-native';

import {Svg, Circle, G, CircleProps} from 'react-native-svg';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {useAnimatedProps} from 'react-native-reanimated';
import {Text} from '@/components';
import {useAppTheme} from '@/hooks';
import {getMinutesFromSeconds, getSeconds} from '@/utils';

const RADIUS = Dimensions.get('screen').width * 0.4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const STROKE_WIDTH = 15;
const HALF_CIRCLE = RADIUS + STROKE_WIDTH;

type CountDownProps = {
  totalSeconds: number;
  onFineshed?: () => void;
};
export type CountDownRef = {
  addSecond: (seconds: number) => void;
  lessSecond: (seconds: number) => void;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CountDown = React.forwardRef<CountDownRef, CountDownProps>(
  ({totalSeconds, onFineshed}, ref) => {
    const theme = useAppTheme();
    const animatedValue = useSharedValue(totalSeconds); //0 desc || totalSeconds asc
    const [counter, setCounter] = useState(totalSeconds);
    const [totalTimer, setTotalTimer] = useState(totalSeconds);

    const animatedProps = useAnimatedProps((): CircleProps => {
      return {
        strokeDashoffset: animatedValue.value,
      };
    });

    const animate = useCallback((timer: number) => {
      const porcentageTimerInTotalSeconds = (timer * 100) / totalSeconds;
      const timerPorcentageOfCircumference =
        (CIRCUMFERENCE * porcentageTimerInTotalSeconds) / 100;

      animatedValue.value = withTiming(timerPorcentageOfCircumference, {
        duration: 1000,
      });
    }, []);

    useEffect(() => {
      setTimeout(() => {
        if (counter !== 0) {
          animate(totalSeconds - counter + 1);
          setCounter(old => old - 1);
        } else {
          if (onFineshed) onFineshed();
        }
      }, 1000);
    }, [counter]);

    const addSecond = (seconds: number) => {
      setCounter(old => {
        if (old + seconds > totalSeconds) {
          return old;
        }
        setTotalTimer(oldT => oldT + seconds);
        return old + seconds;
      });
    };

    const lessSecond = (seconds: number) => {
      setCounter(old => {
        setTotalTimer(oldT => oldT - seconds);
        if (old - seconds < 0) {
          return 0;
        }
        return old - seconds;
      });
    };

    useImperativeHandle(ref, () => ({addSecond, lessSecond}), [
      addSecond,
      lessSecond,
    ]);

    return (
      <View
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
        }}>
        <View style={[StyleSheet.absoluteFill, {justifyContent: 'center'}]}>
          <Text preset="primaryTitle" textAlign="center">
            {getMinutesFromSeconds(counter)}:{getSeconds(counter)}
          </Text>
          <Text preset="pLarge" textAlign="center">
            {getMinutesFromSeconds(totalTimer)}:{getSeconds(totalTimer)}
          </Text>
        </View>
        <Svg
          height={RADIUS * 2}
          width={RADIUS * 2}
          viewBox={`0 0 ${HALF_CIRCLE * 2} ${HALF_CIRCLE * 2}`}>
          <G rotation="-90" origin={`${HALF_CIRCLE}, ${HALF_CIRCLE}`}>
            <Circle
              cx="50%"
              cy="50%"
              r={RADIUS}
              stroke={theme.colors.darkContrast}
              fill="transparent"
              strokeWidth={STROKE_WIDTH}
            />
            <AnimatedCircle
              animatedProps={animatedProps}
              cx="50%"
              cy="50%"
              r={RADIUS}
              stroke={theme.colors.contrast}
              fill="transparent"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={CIRCUMFERENCE}
              strokeLinecap="round"
            />
          </G>
        </Svg>
      </View>
    );
  },
);

export default CountDown;
