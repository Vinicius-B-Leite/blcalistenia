import {HistoricType} from '@/models';
import {useEffect, useState} from 'react';
import {historicService} from '../historicService';

export function useGetHistoric<T>(dependenciesProp?: T[]) {
  const dependencies = dependenciesProp || [];
  const [historic, setHistoric] = useState<HistoricType[]>([]);

  const fetchHistoric = async () => {
    const historicResponse = await historicService.getHistoric();
    const historicOrdenedByDate = historicResponse.sort((a, b) =>
      a.date > b.date ? -1 : 1,
    );
    setHistoric(historicOrdenedByDate);
  };

  useEffect(() => {
    fetchHistoric();
  }, dependencies);

  return {
    historic,
    refetchHistoric: fetchHistoric,
  };
}
