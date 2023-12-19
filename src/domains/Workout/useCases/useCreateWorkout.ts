import {workoutService} from '../workoutService';

export function useCreateWorkout() {
  return {
    handleCreateWorkout: workoutService.createWorkout,
  };
}
