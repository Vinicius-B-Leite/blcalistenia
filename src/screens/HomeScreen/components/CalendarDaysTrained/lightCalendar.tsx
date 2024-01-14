import {getDatesTrained} from '@/utils';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {CalendarProps} from './types';
import {light} from '@/theme';

const LightCalendar: React.FC<CalendarProps> = ({historic}) => {
  return (
    <Calendar
      theme={{
        backgroundColor: light.colors.primaryBg,
        arrowColor: light.colors.darkContrast,
        calendarBackground: light.colors.primaryBg,
        todayTextColor: light.colors.text,
        dayTextColor: light.colors.text,
        textSectionTitleColor: light.colors.darkContrast,
        textDisabledColor: light.colors.secondText,
        monthTextColor: light.colors.contrast,
        todayBackgroundColor: light.colors.contrast,
      }}
      style={{
        backgroundColor: light.colors.primaryBg,
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
          dotColor: light.colors.contrast,
        },
        historic,
      )}
    />
  );
};

export default LightCalendar;
