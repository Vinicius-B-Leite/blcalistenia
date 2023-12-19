import {openRealm} from '@/services/realm/realm';
import {historicAdapter} from './historicAdapter';
import {SCHEMA_KEYS} from '../../storage/config';

export const historicService = {
  getHistoric: async () => {
    const realm = await openRealm();

    const historicObj = realm
      .objects(SCHEMA_KEYS.Historic)
      .sorted('date', true)
      .toJSON();
    const historic = historicObj.map(historicAdapter.adapter);

    return historic;
  },
};
