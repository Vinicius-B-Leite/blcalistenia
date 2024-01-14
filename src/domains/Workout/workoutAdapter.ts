import {WorkoutType} from '@/models';

function adapter(workout: any): WorkoutType {
  return {
    _id: workout._id,
    banner: workout.banner,
    exercises: workout.exercises,
    title: workout.title,
    user_id: workout.user_id,
    anotation: workout.anotation,
    createdAt: workout.createdAt,
    deletedAt: workout.deletedAt,
    updatedAt: workout.updatedAt,
  };
}

export const workoutAdapter = {
  adapter,
};
