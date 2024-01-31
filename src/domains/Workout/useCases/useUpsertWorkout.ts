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
    if (props?.exercises?.length === 0) return;
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
        updatedAt: Date.now(),
      });
      return workout;
    }

    workout = await workoutService.createWorkout({
      ...props,
      user_id: user!.uid,
      title: props.title || 'Desconhecido',
      createdAt: Date.now(),
    });

    return workout;
  };

  return {
    upsertWorkout,
  };
}
