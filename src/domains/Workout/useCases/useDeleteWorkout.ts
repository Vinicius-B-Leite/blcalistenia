import {workoutService} from '../workoutService';

export function useDeleteWorkout() {
  return {
    deleteWorkout: workoutService.deleteWorkout,
  };
}
