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
import {useAppSelector} from '@/hooks';
import Toast from 'react-native-toast-message';

export default function useExercise() {
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const {deleteExercise} = useDeleteExercise();
  const workout = useAppSelector(state => state.workout.workout);

  const handleAddExercise = (exerciseId: string) => {
    const exerciseAlreadyExistsInWorkout = workout.exercises.some(
      exercise => exercise.exercise_id === exerciseId,
    );

    if (exerciseAlreadyExistsInWorkout) {
      Toast.show({
        type: 'error',
        props: {message: 'Este exerciso já está no treino!'},
      });
      return;
    }
    dispatch(
      addExerciseToWorkout({
        exercise_id: exerciseId,
        series: [{rep: '', rest: '', serie: 1, done: false}],
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
