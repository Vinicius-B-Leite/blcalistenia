import {useGetHistoric} from '@/domains';
import {useAppTheme} from '@/hooks';
import {Theme} from '@/theme';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {PieChart} from 'react-native-chart-kit';

type RepsRange = {
  name: '1 - 4' | '5 - 8' | '9 - 12' | '13 +';
  porcentage: number;
  color: string;
};

export function useRepsRange() {
  const [repsRange, setRepsRange] = useState<RepsRange[]>();
  const isFocused = useIsFocused();
  const {historic} = useGetHistoric([isFocused]);
  const theme = useAppTheme();
  const range: {name: RepsRange['name']; color: keyof Theme['colors']}[] = [
    {name: '1 - 4', color: 'contrast'},
    {name: '5 - 8', color: 'darkContrast'},
    {name: '9 - 12', color: 'secondContrast'},
    {name: '13 +', color: 'thirdContrast'},
  ];

  const getIterval = (min: number, max: number) => {
    const allSeries = historic
      .map(hist => hist.workout.exercises.map(exer => exer.series))
      .flat()
      .flat();

    return {
      interval: allSeries.filter(
        serie => Number(serie.rep) >= min && Number(serie.rep) <= max,
      ).length,
      absolutTotal: allSeries.length,
    };
  };

  const getPorcentage = (min: number, max: number) => {
    const {absolutTotal, interval} = getIterval(min, max);
    if (absolutTotal === 0) {
      return 0;
    }

    const porcentage = interval / absolutTotal;

    return porcentage;
  };

  const filterByRepsRange = () => {
    setRepsRange([
      {
        name: '1 - 4',
        porcentage: getPorcentage(1, 4),
        color: theme.colors.contrast,
      },
      {
        name: '5 - 8',
        porcentage: getPorcentage(5, 8),
        color: theme.colors.darkContrast,
      },
      {
        name: '9 - 12',
        porcentage: getPorcentage(9, 12),
        color: theme.colors.secondContrast,
      },
      {
        name: '13 +',
        porcentage: getPorcentage(13, Infinity),
        color: theme.colors.thirdContrast,
      },
    ]);
  };

  useEffect(() => {
    filterByRepsRange();
  }, [historic, theme]);

  return {
    repsRange,
    range,
  };
}
