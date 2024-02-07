import {dark} from '@/theme';
import {getDatesTrained} from '@/utils';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {CalendarProps} from './types';

const DarkCalendar: React.FC<CalendarProps> = ({historic}) => {
  return (
    <Calendar
      testID="calendar"
      theme={{
        backgroundColor: dark.colors.primaryBg,
        arrowColor: dark.colors.darkContrast,
        calendarBackground: dark.colors.primaryBg,
        todayTextColor: dark.colors.text,
        dayTextColor: dark.colors.text,
        textSectionTitleColor: dark.colors.darkContrast,
        textDisabledColor: dark.colors.secondText,
        monthTextColor: dark.colors.contrast,
        todayBackgroundColor: dark.colors.contrast,
      }}
      style={{
        backgroundColor: dark.colors.primaryBg,
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
          dotColor: dark.colors.contrast,
        },
        historic,
      )}
    />
  );
};

export default DarkCalendar;
