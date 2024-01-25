import Toast from 'react-native-toast-message';
import {exerciseService} from '../exerciseService';

export function useDeleteExercise() {
  const deleteExercise = async (exerciseId: string) => {
    const exercise = await exerciseService.getExerciseById(exerciseId);
    await exerciseService.upsertExercise({
      ...exercise,
      deletedAt: Date.now(),
    });
    Toast.show({
      type: 'success',
      props: {message: 'Exercício deletado com sucesso!'},
    });
  };

  return {
    deleteExercise,
  };
}
