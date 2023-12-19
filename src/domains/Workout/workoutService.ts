import {SCHEMA_KEYS} from '../../constansts/schemaKeys';
import {openRealm} from '@/services/realm/realm';
import {workoutAdapter} from './workoutAdapter';
import {WorkoutType} from '@/models/WorkoutType';

export const workoutService = {
  getWorkouts: async () => {
    const realm = await openRealm();

    const workoutsObject = realm.objects(SCHEMA_KEYS.Workout).toJSON();

    const workouts = workoutsObject.map(workoutAdapter.adapter);
    return workouts;
  },
  createWorkout: async ({
    _id,
    banner,
    exercises,
    title,
    user_id,
    anotation,
  }: WorkoutType) => {
    const realm = await openRealm();

    let workoutCreated = {} as WorkoutType;
    realm.write(() => {
      workoutCreated = realm.create<WorkoutType>(
        'Workout',
        {
          _id: _id,
          anotation: anotation,
          exercises: exercises,
          title: title || 'Novo Treino',
          banner: banner || '',
          user_id: user_id,
        },
        Realm.UpdateMode.Modified,
      );
    });

    return workoutCreated;
  },
  deleteWorkout: async (exerciseId: string) => {
    const realm = await openRealm();

    const workout = realm.objectForPrimaryKey(SCHEMA_KEYS.Workout, exerciseId);
    realm.write(() => {
      realm.delete(workout);
    });
  },
};
