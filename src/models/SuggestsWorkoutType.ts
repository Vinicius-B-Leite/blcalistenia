export type WorkoutLevel = 'begginer' | 'intermate';
export type SuggestWorkoutType = {
  _id: string;
  workout: string;
  level: WorkoutLevel;
};
