import {exerciseAdapter} from './exerciseAdapter';
import {ExerciseType} from '@/models/ExerciseType';
import {storage} from '@/storage/storage';

export const exerciseService = {
  getExercise: async () => {
    const exercises = await storage.get<ExerciseType>('Exercise');

    return exercises.map(exerciseAdapter.adapter);
  },
  createExercise: async (exercise: ExerciseType) => {
    const exerciseCreated = await storage.upset<ExerciseType>('Exercise', {
      ...exercise,
    });

    return exerciseCreated;
  },
  deleteExercise: async (exerciseId: string) => {
    await storage.delete('Exercise', exerciseId);

    return;
  },
};
