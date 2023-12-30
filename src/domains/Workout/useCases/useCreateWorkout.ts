import {WorkoutType} from '@/models';
import {workoutService} from '../workoutService';
import {useAuth} from '@/contexts';
import Toast from 'react-native-toast-message';

export function useUpsertWorkout() {
  const {user} = useAuth();

  const upsertWorkout = async (
    props: Omit<WorkoutType, 'user_id' | 'createdAt'>,
  ) => {
    let workout = {} as WorkoutType;

    const workoutAlreadyExists = await workoutService.getWorkoutById(props._id);
    const isUpdatig = !!workoutAlreadyExists;

    Toast.show({
      type: 'success',
      props: {message: 'Treino salvo com sucesso!'},
    });

    if (isUpdatig) {
      workout = await workoutService.createWorkout({
        ...props,
        createdAt: workoutAlreadyExists.createdAt,
        user_id: workoutAlreadyExists.user_id,
        updatedAt: new Date().getTime(),
      });
      return workout;
    }

    workout = await workoutService.createWorkout({
      ...props,
      user_id: user!.uid,
      createdAt: new Date().getTime(),
    });

    return workout;
  };

  return {
    upsertWorkout,
  };
}
