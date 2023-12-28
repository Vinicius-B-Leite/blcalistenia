import {ExercisesInWorkoutType} from './ExercisesInWorkoutType';

export type WorkoutType = {
  _id: string;
  title: string;
  banner: string;
  exercises: ExercisesInWorkoutType[];
  anotation?: string;
  user_id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
