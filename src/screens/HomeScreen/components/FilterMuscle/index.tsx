import React from 'react';

import {muscles} from '@/constants';

import useFilterMuscle from '@/screens/HomeScreen/components/FilterMuscle/useFilterMuscle';
import {Filter} from '@/components';

import {useAppTheme} from '@/hooks';
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
          testID={`filterMuscle-${item}`}
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
