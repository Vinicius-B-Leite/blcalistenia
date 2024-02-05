import {historicAdapter} from './historicAdapter';
import {storage} from '@/storage';
import {HistoricType, HistoricTypeStorage} from '@/models';

export const historicService = {
  getHistoric: async () => {
    const historicObj = await storage.get<HistoricTypeStorage>('Historic');
    const historic = historicObj.map(historicAdapter.adapter);

    return historic;
  },
  createHistoric: async (historic: HistoricType) => {
    const historicCreated = await storage.upset('Historic', {
      ...historic,
      workout: JSON.stringify(historic.workout),
    });
    return historicAdapter.adapter(historicCreated);
  },
};
