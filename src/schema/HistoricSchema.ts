export const HistoricSchema: Realm.ObjectSchema = {
    name: 'Historic',
    properties: {
        _id:{
            type: 'int',
            indexed: true
        },
        workout: 'string',
        timerInSeconds: 'int',
        date: 'date'
    },
    primaryKey: '_id',
};
