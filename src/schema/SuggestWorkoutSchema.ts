export const SuggestWorkout: Realm.ObjectSchema = {
    name: 'SuggestWorkout',
    properties:{
        id: {
            type: 'string',
            indexed: true
        },
        workout: 'string',
        level: 'string'
    }
}