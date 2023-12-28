import {SerieType} from './SerieType';

export type ExercisesInWorkoutType = {
  exercise_id: string;
  anotation?: string;
  series: SerieType[];
};
