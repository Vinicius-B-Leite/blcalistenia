import {ExerciseType} from '@/models';
import {exerciseService} from '../exerciseService';
import uuid from 'react-native-uuid';
import {useAuth} from '@/contexts';

export function useCreateExercise() {
  const {user} = useAuth();

  const createExercise = async (
    exercise: Omit<ExerciseType, '_id' | 'user_id' | 'createdAt'>,
  ) => {
    return await exerciseService.upsertExercise({
      ...exercise,
      _id: uuid.v4().toString(),
      user_id: user!.uid,
      createdAt: new Date(),
    });
  };

  return {
    createExercise,
  };
}
