import {
  WorkoutSchema,
  ExerciseSchema,
  SerieSchema,
  ExerciseWorkout,
  HistoricSchema,
  UserSchema,
} from '@/storage';
import Realm from 'realm';

export async function openRealm() {
  const realm = await Realm.open({
    deleteRealmIfMigrationNeeded: true,

    schema: [
      HistoricSchema,
      WorkoutSchema,
      ExerciseSchema,
      SerieSchema,
      ExerciseWorkout,
      UserSchema,
    ],
  });
  return realm;
}
