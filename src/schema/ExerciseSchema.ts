
export const ExerciseSchema = {
    name: "Exercise",
    properties: {
        name: {
            type: 'string',
            indexed: true
        },
        anotation: 'string?',
        type: 'string',
        muscles: 'string'
    },
    primaryKey: 'name'
};
