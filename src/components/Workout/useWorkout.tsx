import {useDeleteWorkout} from '../../domains/Workout/useCases/useDeleteWorkout';

import {Alert} from 'react-native';

export default function useWorkout() {
  const {deleteWorkout} = useDeleteWorkout();

  const handleDelete = (workoutTitle: string, workoutId: string) => {
    Alert.alert('Deletar', 'Deseja deletar o treino ' + workoutTitle + '?', [
      {
        text: 'Sim',
        onPress: () => deleteWorkout(workoutId),
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
