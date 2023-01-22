export const WorkoutSchema = {
    name: "Workout",
    properties: {
        _id: {
            type: "int",
            indexed: true
        },
        title: "string",
        banner: "string",
        exercises: "ExerciseWorkout[]",//id exerciese[]
    },
    primaryKey: "_id",
};
