import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ExerciseInWorkoutItem from '../ExerciseInWorkoutItem';

import {useDispatch, useSelector} from 'react-redux';

import {addSerie, removeExercise} from '@/features';

import {useAppNavigation, useAppSelector, useAppTheme} from '@/hooks';

import {BoxPressable, Box, Text, Button, Icon} from '@/components';

const ExerciseList: React.FC = () => {
  const theme = useAppTheme();

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
            }
            showDeleteSerieButton={true}
            deleteExerciseBtn={
              <TouchableOpacity onPress={() => dispatch(removeExercise(item))}>
                <Icon
                  family="FontAwesome"
                  name="trash"
                  size={18}
                  color={'alert'}
                />
              </TouchableOpacity>
            }
          />
        )}
        ListFooterComponent={() => (
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
        )}
      />
    </Box>
  );
};

export default ExerciseList;
