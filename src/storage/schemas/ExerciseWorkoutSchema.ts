export const ExerciseWorkout = {
  name: 'ExerciseWorkout',
  embedded: true,
  properties: {
    exercise_id: 'string',
    anotation: 'string?',
    series: 'Serie[]',
  },
};
