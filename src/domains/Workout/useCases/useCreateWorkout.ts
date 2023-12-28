import {WorkoutType} from '@/models';
import {workoutService} from '../workoutService';
import {useAuth} from '@/contexts';

export function useUpsertWorkout() {
  const {user} = useAuth();
  const upsertWorkout = async (
    props: Omit<WorkoutType, 'user_id' | 'createdAt'>,
  ) => {
    let workout = {} as WorkoutType;

    const workoutAlreadyExists = await workoutService.getWorkoutById(props._id);
    const isUpdatig = !!workoutAlreadyExists;

    if (isUpdatig) {
      workout = await workoutService.createWorkout({
        ...workoutAlreadyExists,
        updatedAt: new Date(),
      });
      return workout;
    }

    workout = await workoutService.createWorkout({
      ...props,
      user_id: user!.uid,
      createdAt: new Date(),
    });

    return workout;
  };

  return {
    upsertWorkout,
  };
}
