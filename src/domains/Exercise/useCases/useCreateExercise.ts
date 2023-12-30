import {ExerciseType} from '@/models';
import {exerciseService} from '../exerciseService';
import uuid from 'react-native-uuid';
import {useAuth} from '@/contexts';
import Toast from 'react-native-toast-message';

export function useCreateExercise() {
  const {user} = useAuth();

  const createExercise = async (
    exercise: Omit<ExerciseType, '_id' | 'user_id' | 'createdAt'>,
  ) => {
    const exerciseCreated = await exerciseService.upsertExercise({
      ...exercise,
      _id: uuid.v4().toString(),
      user_id: user!.uid,
      createdAt: new Date().getTime(),
    });

    Toast.show({
      type: 'success',
      props: {message: 'Exercício criado com sucesso!'},
    });
    return exerciseCreated;
  };

  return {
    createExercise,
  };
}
