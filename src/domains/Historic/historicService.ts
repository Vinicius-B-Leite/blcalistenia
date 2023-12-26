import {historicAdapter} from './historicAdapter';
import {storage} from '@/storage';
import {HistoricType} from '@/models';

export const historicService = {
  getHistoric: async () => {
    const historicObj = await storage.get<HistoricType>('Historic');
    const historic = historicObj.map(historicAdapter.adapter);

    return historic;
  },
  createHistoric: async (historic: HistoricType) => {
    const historicCreated = await storage.upset('Historic', historic);
    return historicCreated;
  },
};
