import {ExerciseType} from '@/models/ExerciseType';
import {exerciseService} from '../exerciseService';

export function useCreateExercise() {
  const createExercise = async (exercise: Omit<ExerciseType, '_id'>) => {
    return await exerciseService.createExercise(exercise);
  };

  return {
    createExercise,
  };
}
