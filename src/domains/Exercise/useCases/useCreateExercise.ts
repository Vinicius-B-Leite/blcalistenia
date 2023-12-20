import {ExerciseType} from '@/models/ExerciseType';
import {exerciseService} from '../exerciseService';
import uuid from 'react-native-uuid';
import {useAuth} from '@/contexts/AuthContext';

export function useCreateExercise() {
  const {user} = useAuth();

  const createExercise = async (
    exercise: Omit<ExerciseType, '_id' | 'user_id'>,
  ) => {
    return await exerciseService.createExercise({
      ...exercise,
      _id: uuid.v4().toString(),
      user_id: user!.uid,
    });
  };

  return {
    createExercise,
  };
}
