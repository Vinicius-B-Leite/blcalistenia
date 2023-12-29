import {workoutService} from '../workoutService';

export function useDeleteWorkout() {
  const deleteWorkout = async (workoutId: string) => {
    const workout = await workoutService.getWorkoutById(workoutId);

    if (workout) {
      await workoutService.createWorkout({
        ...workout,
        deletedAt: new Date().getTime(),
      });
    }
  };

  return {
    deleteWorkout,
  };
}
