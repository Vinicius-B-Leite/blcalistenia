import {workoutAdapter} from './workoutAdapter';
import {WorkoutType} from '@/models';
import {storage} from '@/storage';

export const workoutService = {
  getWorkouts: async () => {
    const workoutsObject = await storage.get('Workout');

    const workouts = workoutsObject.map(workoutAdapter.adapter);

    return workouts;
  },
  getWorkoutById: async (workoutId: string) => {
    const workoutObject = await storage.getById('Workout', workoutId);

    const workout = workoutObject
      ? workoutAdapter.adapter(workoutObject)
      : null;
    return workout;
  },
  createWorkout: async (props: WorkoutType) => {
    const workoutCreated = await storage.upset('Workout', props);

    return workoutCreated;
  },
  deleteWorkout: async (workoutId: string) => {
    await storage.delete('Workout', workoutId);
  },
};
