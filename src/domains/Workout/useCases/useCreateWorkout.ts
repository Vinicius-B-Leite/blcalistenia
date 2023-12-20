import {WorkoutType} from '@/models/WorkoutType';
import {workoutService} from '../workoutService';
import {useAuth} from '@/contexts/AuthContext';

export function useCreateWorkout() {
  const {user} = useAuth();
  const handleCreateWorkout = async (props: Omit<WorkoutType, 'user_id'>) => {
    const workout = await workoutService.createWorkout({
      ...props,
      user_id: user!.uid,
    });

    return workout;
  };

  return {
    handleCreateWorkout,
  };
}
