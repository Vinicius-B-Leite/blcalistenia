import {useGetHistoric} from '@/domains';
import {useAppTheme} from '@/hooks';
import {Theme} from '@/theme';
import {useEffect, useState} from 'react';
import {PieChart} from 'react-native-chart-kit';

type RepsRange = {
  name: '1 - 4' | '5 - 8' | '9 - 12' | '13 +';
  porcentage: number;
  color: string;
};

export function useRepsRange() {
  const [repsRange, setRepsRange] = useState<RepsRange[]>();
  const {historic} = useGetHistoric();
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

    return allSeries.filter(
      serie => Number(serie.rep) >= min && Number(serie.rep) <= max,
    ).length;
  };

  const filterByRepsRange = () => {
    setRepsRange([
      {
        name: '1 - 4',
        porcentage: getIterval(1, 4),
        color: theme.colors.contrast,
      },
      {
        name: '5 - 8',
        porcentage: getIterval(5, 8),
        color: theme.colors.darkContrast,
      },
      {
        name: '9 - 12',
        porcentage: getIterval(9, 12),
        color: theme.colors.secondContrast,
      },
      {
        name: '13 +',
        porcentage: getIterval(13, Infinity),
        color: theme.colors.thirdContrast,
      },
    ]);
  };

  useEffect(() => {
    filterByRepsRange();
  }, [historic]);

  return {
    repsRange,
    range,
  };
}
