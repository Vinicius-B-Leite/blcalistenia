import {openRealm} from '@/services/realm/realm';
import {exerciseAdapter} from './exerciseAdapter';
import {SCHEMA_KEYS} from '../../constansts/schemaKeys';
import {ExerciseType} from '@/models/ExerciseType';
import uuid from 'react-native-uuid';

export const exerciseService = {
  getExercise: async () => {
    const realm = await openRealm();

    const exercises = realm
      .objects(SCHEMA_KEYS.Exercise)
      .toJSON() as ExerciseType[];

    return exercises.map(exerciseAdapter.adapter);
  },
  createExercise: async (exercise: Omit<ExerciseType, '_id'>) => {
    const realm = await openRealm();

    let exerciseCreated = {} as ExerciseType;
    realm.write(() => {
      exerciseCreated = realm
        .create<ExerciseType>(SCHEMA_KEYS.Exercise, {
          _id: uuid.v4().toString(),
          ...exercise,
        })
        .toJSON() as ExerciseType;
    });

    return exerciseCreated;
  },
  deleteExercise: async (exerciseId: string) => {
    const realm = await openRealm();

    const exercise = realm.objectForPrimaryKey(
      SCHEMA_KEYS.Exercise,
      exerciseId,
    );
    if (exercise) {
      realm.write(() => {
        realm.delete(exercise);
      });
    }

    return;
  },
};
