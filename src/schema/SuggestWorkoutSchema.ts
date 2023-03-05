export const SuggestWorkout: Realm.ObjectSchema = {
    name: 'SuggestWorkout',
    properties:{
        id: {
            type: 'string',
            indexed: true
        },
        workout: 'Workout',
        level: 'string'
    }
}