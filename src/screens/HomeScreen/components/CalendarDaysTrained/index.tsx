import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {getDatesTrained} from '@/utils/';
import {useGetHistoric} from '@/domains';
import {useAppTheme} from '@/hooks';

export type CalendarRef = {
  openCalendar: () => void;
  closeCalendar: () => void;
};

const CalendarDaysTrained = forwardRef<CalendarRef>(({}, ref) => {
  const theme = useAppTheme();
  const top = useSharedValue(-Dimensions.get('screen').height);
  const {historic} = useGetHistoric();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  const openCalendar = () => {
    top.value = withTiming(0, {duration: 1000});
  };
  const closeCalendar = () => {
    top.value = withTiming(-Dimensions.get('screen').height, {duration: 1000});
  };
  useImperativeHandle(ref, () => ({openCalendar, closeCalendar}), [
    openCalendar,
    closeCalendar,
  ]);

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <Calendar
        theme={{
          backgroundColor: theme.colors.primaryBg,
          arrowColor: theme.colors.darkContrast,
          calendarBackground: theme.colors.primaryBg,
          todayTextColor: theme.colors.text,
          dayTextColor: theme.colors.text,
          textSectionTitleColor: theme.colors.darkContrast,
          textDisabledColor: theme.colors.secondText,
          monthTextColor: theme.colors.contrast,
          todayBackgroundColor: theme.colors.contrast,
        }}
        style={{
          backgroundColor: theme.colors.primaryBg,
        }}
        initialDate={new Date().toString()}
        monthFormat={'MMMM'}
        firstDay={1}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        markedDates={getDatesTrained(
          {
            selected: false,
            marked: true,
            dotColor: theme.colors.contrast,
          },
          historic,
        )}
      />

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
