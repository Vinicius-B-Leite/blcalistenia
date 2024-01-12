import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useImperativeHandle,
} from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {useGetHistoric} from '@/domains';

import {ThemeContext} from '@/contexts';
import DarkCalendar from './darkCalendar';
import LightCalendar from './lightCalendar';

export type CalendarRef = {
  openCalendar: () => void;
  closeCalendar: () => void;
};

const CalendarDaysTrained = forwardRef<CalendarRef>(({}, ref) => {
  const {theme} = useContext(ThemeContext);
  const Calendar = theme === 'dark' ? DarkCalendar : LightCalendar;
  const top = useSharedValue(-Dimensions.get('screen').height);
  const {historic} = useGetHistoric();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  const openCalendar = useCallback(() => {
    top.value = withTiming(0, {duration: 1000});
  }, [top]);
  const closeCalendar = useCallback(() => {
    top.value = withTiming(-Dimensions.get('screen').height, {duration: 1000});
  }, [top]);
  useImperativeHandle(ref, () => ({openCalendar, closeCalendar}), [
    openCalendar,
    closeCalendar,
  ]);

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <Calendar historic={historic} />
      <TouchableOpacity
        activeOpacity={0}
        style={[styles.closeButton]}
        onPress={closeCalendar}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    flex: 1,
    opacity: 0.9,
  },
});

export default memo(CalendarDaysTrained);
