import {months} from '@/constants';
import {useGetHistoric} from '@/domains';
import {useEffect, useState} from 'react';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';

//TODO: buscar todas as vezes que o usuario treinou e filtrar por mes
export function useFrequency() {
  const [historicFiltered, setHistoricFiltered] = useState<ChartData | null>(
    null,
  );
  const {historic} = useGetHistoric();

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

  return {historicFiltered};
}
