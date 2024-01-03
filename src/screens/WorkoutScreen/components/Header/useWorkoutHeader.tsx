import {useDispatch} from 'react-redux';

import BackgroundService from 'react-native-background-actions';
import {resetTimer, setWorkout} from '@/features/Workout/workoutSlicer';
import {pickeImage} from '@/utils';

import {Alert} from 'react-native';
import {useEffect, useRef} from 'react';
import {useAppNavigation, useAppSelector} from '@/hooks';

import {useUpsertWorkout} from '@/domains';
import {upsetWorkout} from '@/features';
import {useAuth} from '@/contexts';
import Toast from 'react-native-toast-message';

export default function useWorkoutHeader() {
  const navigation = useAppNavigation();
  const canEditWorkout = useAppSelector(state => state.workout.canEdit);
  const {upsertWorkout} = useUpsertWorkout();

  const dispatch = useDispatch();

  const isWorkingout = useAppSelector(state => state.workout.isWorkingout);
  const workout = useAppSelector(state => state.workout.workout);

  const isWorkingoutRef = useRef(isWorkingout);
  isWorkingoutRef.current = isWorkingout;

  const workoutRef = useRef(workout);

  workoutRef.current = workout;
  const canEditWorkoutRef = useRef(canEditWorkout);
  canEditWorkoutRef.current = canEditWorkout;

  const cancelWorkout = () => {
    Alert.alert('Deseja cancelar o treino', 'Você deseja cancelar o treino?', [
      {
        text: 'Sim',
        onPress: () => {
          BackgroundService.stop().then(() => {
            dispatch(resetTimer());
            navigation.navigate('HomeStack', {screen: 'Home'});
          });
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  };

  const saveWorkout = async () => {
    const isWorkoutSuggest = workoutRef.current._id.includes('suggestWorkout');

    if (isWorkoutSuggest || !canEditWorkoutRef.current) return;

    const workoutCreated = await upsertWorkout({
      ...workoutRef.current,
    });
    dispatch(upsetWorkout(workoutCreated));

    navigation.navigate('HomeStack', {screen: 'Home'});
  };

  const handleSelectImage = async () => {
    try {
      if (!canEditWorkout) return;
      const res = await pickeImage();
      if (res.assets && res.assets[0].uri) {
        Toast.show({
          type: 'success',
          props: {message: 'Imagem selecionada!'},
        });
        dispatch(setWorkout({...workout, banner: res.assets[0].uri}));
      }
    } catch (error) {
      console.log('handleSelectImage => ' + error);
    }
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', event => {
      if (event.data.action.type == 'GO_BACK' && !isWorkingoutRef.current) {
        saveWorkout();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleSelectImage,
    isWorkingout,
    workout,
    cancelWorkout,
    onChangeTitleText: (txt: string) =>
      dispatch(setWorkout({...workout, title: txt})),
  };
}
