import {
  WorkoutSchema,
  ExerciseSchema,
  SerieSchema,
  ExerciseWorkout,
  SuggestWorkout,
  HistoricSchema,
  UserSchema,
} from '@/storage';
import Realm from 'realm';

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
