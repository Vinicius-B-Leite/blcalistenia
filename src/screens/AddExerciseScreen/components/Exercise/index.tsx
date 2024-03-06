import React, {memo, useCallback} from 'react';
import {ExerciseType} from '@/models';

import {FlatList} from 'react-native';
import useExercise from './useExercise';

import {Text, BoxPressable} from '@/components';

type Prosp = {item: ExerciseType};

const Exercise: React.FC<Prosp> = ({item}) => {
  const {handleAddExercise, handleDelete} = useExercise();

  return (
    <BoxPressable
      bg="primaryBg"
      borderRadius={10}
      mb={14}
      p={14}
      onPress={() => handleAddExercise(item.name)}
      onLongPress={() => handleDelete(item)}>
      <Text
        testID={`exercise-${item.name}`}
        preset="pMedium"
        textTransform="capitalize"
        numberOfLines={1}>
        {item.name}
      </Text>
      <FlatList
        data={item.muscles}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({item: m}) => (
          <Text preset="pSmall" mr={8} color="secondText">
            {m}
          </Text>
        )}
      />
    </BoxPressable>
  );
};

export default memo(Exercise, (prev, nxt) => Object.is(prev, nxt));
