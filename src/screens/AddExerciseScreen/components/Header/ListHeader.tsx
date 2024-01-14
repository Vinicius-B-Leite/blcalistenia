import React from 'react';

import {useDispatch} from 'react-redux';

import {setSearchInput} from '@/features';
import {useAppNavigation, useAppSelector, useAppTheme} from '@/hooks';
import {BoxPressable, Box, Input, Icon, FormInput} from '@/components';
import {Control} from 'react-hook-form';
import {FilterExerciseSchema} from '../../schema';

type ListHeaderProps = {
  control: Control<FilterExerciseSchema>;
};
const ListHeader: React.FC<ListHeaderProps> = ({control}) => {
  const navigation = useAppNavigation();

  const searchExerciseInput = useAppSelector(
    state => state.exercise.searchInput,
  );
  const dispatch = useDispatch();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap={34}>
      <BoxPressable onPress={() => navigation.goBack()}>
        <Icon family="AntDesign" name="arrowleft" size={24} color={'text'} />
      </BoxPressable>

      <FormInput
        // value={searchExerciseInput}
        // onChangeText={text => dispatch(setSearchInput(text))}
        control={control}
        name="exerciseName"
        placeholder="Pesquisar exercício"
        textAlign="right"
        boxProps={{flex: 1}}
        rightIcon={
          <Icon
            family="AntDesign"
            name="search1"
            size={18}
            color={'secondText'}
          />
        }
      />
    </Box>
  );
};

export default ListHeader;
