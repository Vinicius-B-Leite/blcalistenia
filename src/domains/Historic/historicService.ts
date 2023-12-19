import {SCHEMA_KEYS} from '../../constansts/schemaKeys';
import {openRealm} from '@/services/realm/realm';
import {historicAdapter} from './historicAdapter';

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
