import React, {useEffect} from 'react';
import * as S from './styles';

import Header from './components/Header';
import {useTheme} from 'styled-components/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/Models';

import {useDispatch} from 'react-redux';
import {setWorkout} from '../../features/Workout/workoutSlicer';
import WorkoutList from './components/ExerciseList';
import ChronometerButton from '../../components/ChronometerButton';

import uuid from 'react-native-uuid';
import {WorkoutType} from '../../models/WorkoutType';
import {useAppSelector} from '@/hooks/useAppSelector';

type Navigation = StackScreenProps<RootStackParamList, 'Workout'>;

const Workout: React.FC<Navigation> = ({route}) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const isTrainig = useAppSelector(state => state.workout?.isWorkingout);
  const workout = useAppSelector(state => state.workout?.workout);

  useEffect(() => {
    const isEditingWorkout = route.params.workout?._id;

    if (isEditingWorkout) {
      dispatch(setWorkout({...route.params.workout}));
    } else {
      if (!isTrainig) {
        const _id = uuid.v4().toString();
        dispatch(
          setWorkout({
            ...workout,
            user_id: '',
            _id,
          }),
        );
      }
    }
    return () => {
      if (!isTrainig) {
        dispatch(setWorkout({} as WorkoutType));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTrainig]);

  return (
    <S.Container>
      <Header />

      <S.AnotationContainer>
        <S.Anotation
          value={workout?.anotation}
          onChangeText={txt =>
            dispatch(setWorkout({...workout, anotation: txt}))
          }
          placeholder="Anotação"
          placeholderTextColor={theme.colors.darkText}
        />
      </S.AnotationContainer>

      <WorkoutList />
      <ChronometerButton />
    </S.Container>
  );
};

export default Workout;
