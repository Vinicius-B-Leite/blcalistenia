export const WorkoutSchema = {
    name: "Workout",
    properties: {
        _id: {
            type: "int",
            indexed: true
        },
        title: "string",
        banner: "string",
        exercises: "string[]",//id exerciese[]
    },
    primaryKey: "_id",
};
