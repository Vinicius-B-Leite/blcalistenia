

export const ExerciseSchema = {
    name: "Exercise",
    properties: {
        name: {
            type: 'string',
            indexed: true
        },
        categories: 'string[]',
        muscles: 'string[]'
    },
    primaryKey: 'name',
    
};
