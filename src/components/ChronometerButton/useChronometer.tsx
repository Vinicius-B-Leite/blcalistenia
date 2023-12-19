import {useAppNavigation} from '@/hooks/useAppNavigation';
import {useAppSelector} from '@/hooks/useAppSelector';

import {useDispatch} from 'react-redux';
import BackgroundService from 'react-native-background-actions';
import {
  resetTimer,
  setWorkout,
  updateTimer,
} from '@/features/Workout/workoutSlicer';
import {options, sleep} from '@/utils/backgroundActionsConfig';
import {HistoricType} from '@/models/HistoricType';
import {WorkoutType} from '@/models/WorkoutType';
import {Alert} from 'react-native';

export default function useChronometer() {
  const dispatch = useDispatch();
  const workout = useAppSelector(state => state.workout.workout);

  const navigation = useAppNavigation();

  const everyIntensiveTask = async () => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      dispatch(updateTimer(i));
      BackgroundService.updateNotification({
        taskDesc: `Tempo atual: ${String(Math.floor(i / 60)).padStart(
          2,
          '0',
        )}:${String(i % 60).padStart(2, '0')}`,
      });
      await sleep(1000);
    }
  };

  const finishWorkout = (timer: number) => {
    const isWorkoutSuggest = workout._id.includes('suggestWorkout');
    // BackgroundService.stop().then(() => {
    //   realm?.write(() => {
    //     realm.create<HistoricType>('Historic', {
    //       workout: JSON.stringify(workout),
    //       date: new Date(),
    //       timerInSeconds: timer,
    //       _id: realm.objects('Historic').length + 1,
    //       user_id: '',
    //     });

    //     if (!isWorkoutSuggest) {
    //       realm.create<WorkoutType>(
    //         'Workout',
    //         {
    //           _id: workout._id,
    //           anotation: workout.anotation,
    //           exercises: workout.exercises,
    //           title: workout.title,
    //           banner: workout.banner || '',
    //           user_id: '',
    //         },
    //         Realm.UpdateMode.Modified,
    //       );
    //     }

    //     dispatch(resetTimer());
    //     dispatch(setWorkout({} as WorkoutType));
    //     navigation.navigate('HomeStack', {screen: 'Home'});
    //   });
    // });
  };
  const handleFinishWorkout = (timer: number) => {
    Alert.alert('Encerrar o treino', 'Você deseja encerrar o treino?', [
      {
        text: 'Sim',
        onPress: () => finishWorkout(timer),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  };

  const startWorkout = async () => {
    await BackgroundService.start(everyIntensiveTask, options);
  };

  return {
    handleFinishWorkout,
    startWorkout,
  };
}
