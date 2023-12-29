import React, {useEffect} from 'react';

import Header from './components/Header';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/routes/Models';

import {useDispatch} from 'react-redux';
import {setCanEditWorkout, setWorkout} from '@/features';
import WorkoutList from './components/ExerciseList';
import ChronometerButton from './components/ChronometerButton';

import uuid from 'react-native-uuid';
import {WorkoutType} from '@/models';
import {useAppSelector, useAppTheme} from '@/hooks';
import {Container, Input} from '@/components';

type Navigation = StackScreenProps<RootStackParamList, 'Workout'>;

export const Workout: React.FC<Navigation> = ({route}) => {
  const theme = useAppTheme();

  const dispatch = useDispatch();
  const isTrainig = useAppSelector(state => state.workout?.isWorkingout);
  const workout = useAppSelector(state => state.workout?.workout);
  const canEditWorkout = useAppSelector(state => state.workout.canEdit);

  useEffect(() => {
    const isEditingWorkout = route.params.workout?._id;
    dispatch(
      setCanEditWorkout(route.params.canEdit === undefined ? true : false),
    );
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
    <Container>
      <Header />

      <Input
        editable={canEditWorkout}
        value={workout?.anotation}
        onChangeText={txt => dispatch(setWorkout({...workout, anotation: txt}))}
        placeholder="Anotação"
        placeholderTextColor={theme.colors.secondText}
        boxProps={{
          mb: 34,
        }}
      />

      <WorkoutList />
      <ChronometerButton />
    </Container>
  );
};

export default Workout;
