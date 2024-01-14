import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ExerciseInWorkoutItem from '../ExerciseInWorkoutItem';

import {useDispatch, useSelector} from 'react-redux';

import {addSerie, removeExercise} from '@/features';

import {useAppNavigation, useAppSelector, useAppTheme} from '@/hooks';

import {BoxPressable, Box, Text, Button, Icon} from '@/components';
import CreateSerie from './components/CreateSerie/CreateSerie';
import DeleteExercise from './components/DeleteExercise/DeleteExercise';
import AddExercise from './components/AddExercise/AddExercise';

const ExerciseList: React.FC = () => {
  const canEditWorkout = useAppSelector(state => state.workout.canEdit);

  const workout = useAppSelector(state => state.workout.workout);
  const navigation = useAppNavigation();
  const dispatch = useDispatch();

  return (
    <Box flex={1}>
      <FlashList
        data={workout.exercises}
        extraData={workout.exercises}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        estimatedItemSize={workout?.exercises?.length || 10}
        renderItem={({item}) => (
          <ExerciseInWorkoutItem
            item={item}
            createSerieBtn={
              <CreateSerie onPress={() => dispatch(addSerie(item))} />
            }
            showDeleteSerieButton={canEditWorkout}
            deleteExerciseBtn={
              <DeleteExercise onPress={() => dispatch(removeExercise(item))} />
            }
          />
        )}
        ListFooterComponent={() => (
          <AddExercise
            onPress={() =>
              navigation.navigate('HomeStack', {screen: 'AddExercise'})
            }
          />
        )}
      />
    </Box>
  );
};

export default ExerciseList;
