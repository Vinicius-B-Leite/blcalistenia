import {useAppNavigation, useAppSelector} from '@/hooks';

import {useDispatch} from 'react-redux';
import BackgroundService from 'react-native-background-actions';
import {resetTimer, setWorkout, updateTimer} from '@/features';
import {options, sleep} from '@/utils';

import {WorkoutType} from '@/models';
import {Alert} from 'react-native';
import {useUpsertWorkout, useCreateHistoric} from '@/domains';

export default function useChronometer() {
  const dispatch = useDispatch();

  const workout = useAppSelector(state => state.workout.workout);
  const {upsertWorkout} = useUpsertWorkout();
  const {handleCreateHistoric} = useCreateHistoric();
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
    BackgroundService.stop().then(async () => {
      await handleCreateHistoric({
        workout: JSON.stringify(workout),
        date: new Date(),
        timerInSeconds: timer,
      });

      if (!isWorkoutSuggest) {
        await upsertWorkout({
          _id: workout._id,
          anotation: workout.anotation,
          exercises: workout.exercises,
          title: workout.title,
          banner: workout.banner || '',
        });
      }

      dispatch(resetTimer());
      dispatch(setWorkout({} as WorkoutType));
      navigation.navigate('HomeStack', {screen: 'Home'});
    });
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
