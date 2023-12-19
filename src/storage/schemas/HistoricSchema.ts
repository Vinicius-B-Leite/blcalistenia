import Realm from 'realm';

export const HistoricSchema: Realm.ObjectSchema = {
  name: 'Historic',
  properties: {
    _id: {
      type: 'string',
      indexed: true,
    },
    workout: 'string',
    timerInSeconds: 'int',
    date: 'date',
    user_id: 'string',
  },
  primaryKey: '_id',
};
