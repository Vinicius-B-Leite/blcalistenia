import {openRealm} from '@/services/realm/realm';
import {historicAdapter} from './historicAdapter';
import {SCHEMA_KEYS} from '../../storage/config';
import {storage} from '@/storage/storage';
import {HistoricType} from '@/models/HistoricType';

export const historicService = {
  getHistoric: async () => {
    const historicObj = await storage.get<HistoricType>('Historic');
    const historic = historicObj.map(historicAdapter.adapter);

    return historic;
  },
};
