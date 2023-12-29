import {useDeleteExercise} from '@/domains';
import {
  deleteExercise as deleteExerciseFromState,
  addExerciseToWorkout,
} from '@/features';

import {useAppNavigation} from '@/hooks/useAppNavigation';

import {ExerciseType} from '@/models';

import {initialsExercises} from '@/constants';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';

export default function useExercise() {
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const {deleteExercise} = useDeleteExercise();

  const handleAddExercise = (exerciseId: string) => {
    dispatch(
      addExerciseToWorkout({
        exercise_id: exerciseId,
        series: [{rep: 0, rest: 0, serie: 1, done: false}],
        anotation: '',
      }),
    );
    navigation.goBack();
  };

  const handleDelete = (exercise: ExerciseType) => {
    if (initialsExercises.includes(exercise)) return;
    Alert.alert(
      'Deletar exercício',
      'Você deseja deletar o exercício ' + exercise.name,
      [
        {
          text: 'Sim',
          onPress: async () => {
            await deleteExercise(exercise._id);

            dispatch(deleteExerciseFromState({exerciseId: exercise._id}));
          },
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return {
    handleAddExercise,
    handleDelete,
  };
}
