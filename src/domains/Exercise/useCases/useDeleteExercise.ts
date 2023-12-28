import {exerciseService} from '../exerciseService';

export function useDeleteExercise() {
  const deleteExercise = async (exerciseId: string) => {
    const exercise = await exerciseService.getExerciseById(exerciseId);
    await exerciseService.upsertExercise({
      ...exercise,
      deletedAt: new Date(),
    });
  };

  return {
    deleteExercise,
  };
}
