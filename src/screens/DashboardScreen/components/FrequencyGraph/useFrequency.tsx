import {months} from '@/constants';
import {useGetHistoric} from '@/domains';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';

export function useFrequency() {
  const isFocused = useIsFocused();
  const {historic} = useGetHistoric([isFocused]);
  const [historicFiltered, setHistoricFiltered] = useState<ChartData | null>(
    null,
  );

  useEffect(() => {
    orderByMonth();
  }, [historic]);

  const orderByMonth = () => {
    let dataset: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    historic.forEach(h => {
      const monthInDataset = h.date.getMonth();
      dataset[monthInDataset] += 1;
    });

    setHistoricFiltered({
      labels: months,
      datasets: [
        {
          data: dataset,
        },
      ],
    });
  };

  return {historicFiltered, refresh: orderByMonth};
}
