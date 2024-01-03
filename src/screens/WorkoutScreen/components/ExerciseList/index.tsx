import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ExerciseInWorkoutItem from '../ExerciseInWorkoutItem';

import {useDispatch, useSelector} from 'react-redux';

import {addSerie, removeExercise} from '@/features';

import {useAppNavigation, useAppSelector, useAppTheme} from '@/hooks';

import {BoxPressable, Box, Text, Button, Icon} from '@/components';

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
              canEditWorkout && (
                <Button
                  label="+"
                  onPress={() => dispatch(addSerie(item))}
                  bg="contrast"
                  width={25}
                  height={25}
                  alignSelf="center"
                  borderRadius={'full'}
                  marginVertical={14}
                />
              )
            }
            showDeleteSerieButton={canEditWorkout}
            deleteExerciseBtn={
              canEditWorkout && (
                <TouchableOpacity
                  onPress={() => dispatch(removeExercise(item))}>
                  <Icon
                    family="FontAwesome"
                    name="trash"
                    size={18}
                    color={'alert'}
                  />
                </TouchableOpacity>
              )
            }
          />
        )}
        ListFooterComponent={() =>
          canEditWorkout ? (
            <BoxPressable
              alignSelf="center"
              onPress={() =>
                navigation.navigate('HomeStack', {screen: 'AddExercise'})
              }>
              <Text
                preset="pMedium"
                textDecorationLine="underline"
                color="contrast">
                Adiconar exercício
              </Text>
            </BoxPressable>
          ) : (
            <></>
          )
        }
      />
    </Box>
  );
};

export default ExerciseList;
