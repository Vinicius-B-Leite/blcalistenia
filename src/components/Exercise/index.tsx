import React, {memo, useCallback} from 'react';
import {ExerciseType} from '../../models/ExerciseType';
import * as S from './styles';
import {FlatList} from 'react-native';
import useExercise from './useExercise';

type Prosp = {item: ExerciseType};

const Exercise: React.FC<Prosp> = ({item}) => {
  const {handleAddExercise, handleDelete} = useExercise();

  return (
    <S.ExerciseContainer
      onPress={() => handleAddExercise(item.name)}
      onLongPress={() => handleDelete(item)}>
      <S.ExerciseName>{item.name}</S.ExerciseName>
      <FlatList
        data={item.muscles}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({item: m}) => <S.ExerciseMuscles>{m}</S.ExerciseMuscles>}
      />
    </S.ExerciseContainer>
  );
};

export default memo(Exercise, (prev, nxt) => Object.is(prev, nxt));
