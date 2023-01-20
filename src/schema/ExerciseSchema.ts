
export const ExerciseSchema = {
    name: "Exercise",
    embedded: true,
    properties: {
        name: 'string',
        anotation: 'string?',
        type: 'string',
        series: 'Serie[]'
    },
};
