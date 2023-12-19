export const WorkoutSchema = {
    name: 'Workout',
    properties: {
        _id: {
            type: 'string',
            indexed: true
        },
        title: 'string',
        banner: 'string',
        exercises: 'ExerciseWorkout[]',//id exerciese[]
        anotation: 'string?',
        user_id: 'string'
    },
    primaryKey: '_id',
};