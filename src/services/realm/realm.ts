import {createRealmContext} from '@realm/react';
import {WorkoutSchema} from '../../storage/schemas/WorkoutSchema';
import {ExerciseSchema} from '../../storage/schemas/ExerciseSchema';
import {SerieSchema} from '../../storage/schemas/SerieSchema';
import {ExerciseWorkout} from '../../storage/schemas/ExerciseWorkoutSchema';
import {SuggestWorkout} from '../../storage/schemas/SuggestWorkoutSchema';
import {HistoricSchema} from '../../storage/schemas/HistoricSchema';
import Realm from 'realm';
import {UserSchema} from '../../storage/schemas/UserSchema';

export async function openRealm() {
  const realm = await Realm.open({
    deleteRealmIfMigrationNeeded: true,
    path: '/data/data/com.blcalistenia/files/newRealm.realm',
    schema: [
      HistoricSchema,
      SuggestWorkout,
      WorkoutSchema,
      ExerciseSchema,
      SerieSchema,
      ExerciseWorkout,
      UserSchema,
    ],
  });

  return realm;
}
