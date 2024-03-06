import Toast from 'react-native-toast-message';
import {workoutService} from '../workoutService';

export function useDeleteWorkout() {
  const deleteWorkout = async (workoutId: string) => {
    const workout = await workoutService.getWorkoutById(workoutId);

    if (workout) {
      await workoutService.createWorkout({
        ...workout,
        deletedAt: Date.now(),
      });
      Toast.show({
        type: 'success',
        props: {message: 'Treino deletado com sucesso!'},
      });
    }
  };

  return {
    deleteWorkout,
  };
}
