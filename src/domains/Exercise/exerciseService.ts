import {exerciseAdapter} from './exerciseAdapter';
import {ExerciseType} from '@/models';
import {storage} from '@/storage';

export const exerciseService = {
  getExerciseById: async (id: string) => {
    const exercise = await storage.getById<ExerciseType>('Exercise', id);

    return exercise;
  },
  getExercise: async () => {
    const exercises = await storage.get<ExerciseType>('Exercise');

    return exercises.map(exerciseAdapter.adapter);
  },
  upsertExercise: async (exercise: ExerciseType) => {
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
