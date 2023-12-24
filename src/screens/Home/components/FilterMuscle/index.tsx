import React from 'react';

import {muscles} from '@/utils/muscles';

import useFilterMuscle from '@/screens/Home/components/FilterMuscle/useFilterMuscle';
import Filter from '@/components/Filter/Filter';

import {useAppTheme} from '@/hooks/useAppTheme';
import {FlatList} from 'react-native';

const FilterMuscle: React.FC = () => {
  const {filterWorkoutsByMuscle, muscleFilterSelected} = useFilterMuscle();
  const theme = useAppTheme();
  return (
    <FlatList
      horizontal
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      data={muscles}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <Filter
          label={item}
          isActive={muscleFilterSelected == item}
          onPress={() => filterWorkoutsByMuscle(item)}
          marginRight={8}
        />
      )}
      style={{marginTop: theme.spacing[14], marginBottom: theme.spacing[24]}}
    />
  );
};

export default FilterMuscle;
