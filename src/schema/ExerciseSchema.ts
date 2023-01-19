
export const ExerciseSchema = {
    name: "Exercise",
    properties: {
        _id:{
            type: 'int',
            indexed: true
        },
        name: 'string',
        anotation: 'string?',
        type: 'string',
        series: 'Serie[]'
    },
    primaryKey: "_id",
};
