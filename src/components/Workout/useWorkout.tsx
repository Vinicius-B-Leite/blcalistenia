import {useDispatch} from 'react-redux';
import {useDeleteWorkout} from '../../domains/Workout/useCases/useDeleteWorkout';

import {Alert} from 'react-native';
import {deleteWorkout} from '@/features/WorkoutList/workoutListSlicer';

export default function useWorkout() {
  const {deleteWorkout: deleteStorageWorkout} = useDeleteWorkout();
  const dispatch = useDispatch();

  const handleDeleteWorkout = async (workoutId: string) => {
    dispatch(deleteWorkout({workoutId}));
    await deleteStorageWorkout(workoutId);
  };
  const handleDelete = (workoutTitle: string, workoutId: string) => {
    Alert.alert('Deletar', 'Deseja deletar o treino ' + workoutTitle + '?', [
      {
        text: 'Sim',
        onPress: () => handleDeleteWorkout(workoutId),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  };

  return {
    handleDelete,
  };
}
