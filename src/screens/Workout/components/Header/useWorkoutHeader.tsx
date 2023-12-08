import {useDispatch} from 'react-redux';

import BackgroundService from 'react-native-background-actions';
import {resetTimer, setWorkout} from '@/features/Workout/workoutSlicer';
import {WorkoutType} from '@/models/WorkoutType';
import {useRealm} from '@/services/realm/realm';
import {pickeImage} from '@/utils/pickImage';

import {Alert} from 'react-native';
import {useEffect, useRef} from 'react';
import {useAppNavigation} from '@/hooks/useAppNavigation';
import {useAppSelector} from '@/hooks/useAppSelector';

export default function useWorkoutHeader() {
  const navigation = useAppNavigation();
  const realm = useRealm();

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

  const saveWorkout = () => {
    const isWorkoutSuggest = workoutRef.current._id.includes('suggestWorkout');
    if (isWorkoutSuggest) return;
    console.log(workoutRef.current.banner);
    realm.write(() => {
      realm.create<WorkoutType>(
        'Workout',
        {
          _id: workoutRef.current._id,
          anotation: workoutRef.current.anotation,
          exercises: workoutRef.current.exercises,
          title: workoutRef.current.title || 'Novo Treino',
          banner: workoutRef.current.banner || '',
          user_id: '',
        },
        Realm.UpdateMode.Modified,
      );

      navigation.navigate('HomeStack', {screen: 'Home'});
    });
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
