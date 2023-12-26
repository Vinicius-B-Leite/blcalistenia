import {workoutAdapter} from './workoutAdapter';
import {WorkoutType} from '@/models';
import {storage} from '@/storage';

export const workoutService = {
  getWorkouts: async () => {
    const workoutsObject = await storage.get('Workout');

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
    const workoutCreated = await storage.upset('Workout', {
      _id: _id,
      anotation: anotation,
      exercises: exercises,
      title: title || 'Novo Treino',
      banner: banner || '',
      user_id: user_id,
    });

    return workoutCreated;
  },
  deleteWorkout: async (exerciseId: string) => {
    await storage.delete('Workout', exerciseId);
  },
};
