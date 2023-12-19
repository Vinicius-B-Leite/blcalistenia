import {exerciseService} from '../exerciseService';

export function useDeleteExercise() {
  return {
    deleteExercise: exerciseService.deleteExercise,
  };
}
