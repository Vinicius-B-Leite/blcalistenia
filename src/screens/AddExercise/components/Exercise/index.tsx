import React, {memo, useCallback} from 'react';
import {ExerciseType} from '../../../../models/ExerciseType';

import {FlatList} from 'react-native';
import useExercise from './useExercise';
import {BoxPressable} from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

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
      <Text preset="pMedium" textTransform="capitalize">
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
