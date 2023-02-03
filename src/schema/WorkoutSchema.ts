export const WorkoutSchema = {
    name: 'Workout',
    properties: {
        _id: {
            type: 'int',
            indexed: true
        },
        title: 'string',
        banner: 'string',
        exercises: 'ExerciseWorkout[]',//id exerciese[]
        anotation: 'string?',
        // assignee: {
        //     type: 'linkingObjects',
        //     objectType: 'Historic',
        //     property: 'workout'
        //   }
    },
    primaryKey: '_id',
};
