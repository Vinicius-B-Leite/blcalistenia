import {HistoricType} from '@/models';
import {useEffect, useState} from 'react';
import {historicService} from '../historicService';

export function useGetHistoric() {
  const [historic, setHistoric] = useState<HistoricType[]>([]);

  const fetchHistoric = async () => {
    const historicResponse = await historicService.getHistoric();

    setHistoric(historicResponse);
  };

  useEffect(() => {
    fetchHistoric();
  }, []);

  return {
    historic,
    fetchHistoric,
  };
}
