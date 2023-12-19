import React, {useState} from 'react';
import * as S from './style';
import {muscles} from '@/utils/muscles';
import Muscle from '@/components/Muscle';
import useFilterMuscle from '@/screens/Home/components/FilterMuscle/useFilterMuscle';

const FilterMuscle: React.FC = () => {
  const {filterWorkoutsByMuscle, muscleFilterSelected} = useFilterMuscle();

  return (
    <S.CategotyList
      horizontal
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      data={muscles}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <Muscle
          muscle={item}
          muscleSelected={muscleFilterSelected}
          onClick={filterWorkoutsByMuscle}
        />
      )}
    />
  );
};

export default FilterMuscle;
