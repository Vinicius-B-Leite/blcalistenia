import {useDispatch} from 'react-redux';

import BackgroundService from 'react-native-background-actions';
import {resetTimer, setWorkout} from '@/features/Workout/workoutSlicer';
import {WorkoutType} from '@/models/WorkoutType';
import {pickeImage} from '@/utils/pickImage';

import {Alert} from 'react-native';
import {useEffect, useRef} from 'react';
import {useAppNavigation} from '@/hooks/useAppNavigation';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useCreateWorkout} from '../../../../domains/Workout/useCases/useCreateWorkout';
import {upsetWorkout} from '@/features/WorkoutList/workoutListSlicer';
import {useAuth} from '@/contexts/AuthContext';

export default function useWorkoutHeader() {
  const navigation = useAppNavigation();
  const {user} = useAuth();
  const {handleCreateWorkout} = useCreateWorkout();

  const dispatch = useDispatch();

  const isWorkingout = useAppSelector(state => state.workout.isWorkingout);
  const workout = useAppSelector(state => state.workout.workout);

  const isWorkingoutRef = useRef(isWorkingout);
  isWorkingoutRef.current = isWorkingout;

  const workoutRef = useRef(workout);
  workoutRef.current = workout;

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
    if (isWorkoutSuggest) return;

    const workoutCreated = await handleCreateWorkout({
      ...workoutRef.current,
      user_id: user!.uid,
    });
    dispatch(upsetWorkout(workoutCreated));

    navigation.navigate('HomeStack', {screen: 'Home'});
  };

  const handleSelectImage = async () => {
    try {
      const res = await pickeImage();
      if (res.assets && res.assets[0].uri) {
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
