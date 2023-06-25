export const SuggestWorkout: Realm.ObjectSchema = {
    name: 'SuggestWorkout',
    primaryKey: '_id',
    properties:{
        _id: {
            type: 'string',
            indexed: true
        },
        workout: 'string',
        level: 'string'
    }
}