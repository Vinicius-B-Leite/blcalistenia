import {openRealm} from '@/services/realm/realm';
import {exerciseAdapter} from './exerciseAdapter';
import {SCHEMA_KEYS} from '../../storage/config';
import {ExerciseType} from '@/models/ExerciseType';
import uuid from 'react-native-uuid';
import {storage} from '@/storage/storage';

export const exerciseService = {
  getExercise: async () => {
    const exercises = await storage.get<ExerciseType>('Exercise');

    return exercises.map(exerciseAdapter.adapter);
  },
  createExercise: async (exercise: Omit<ExerciseType, '_id'>) => {
    const exerciseCreated = await storage.upset<ExerciseType>('Exercise', {
      ...exercise,
      _id: uuid.v4().toString(),
    });

    return exerciseCreated;
  },
  deleteExercise: async (exerciseId: string) => {
    await storage.delete('Exercise', exerciseId);

    return;
  },
};
