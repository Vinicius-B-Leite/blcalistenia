import {HistoricType} from '@/models/HistoricType';
import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking';
import {MarkedDates} from 'react-native-calendars/src/types';

export const getDatesTrained = (
  config: MarkingProps,
  historic: HistoricType[],
) => {
  const dates = historic?.map(h => h.date);

  let datesConfigureds: MarkedDates = {};

  dates?.forEach(d => {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(d.getDate() + 1).padStart(2, '0')}`;

    datesConfigureds[key] = config;
  });

  return datesConfigureds;
};
