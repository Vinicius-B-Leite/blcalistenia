import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {useTheme} from 'styled-components/native';
import {useDispatch} from 'react-redux';

import {setSearchInput} from '@/features';
import {useAppNavigation, useAppSelector} from '@/hooks';
import {BoxPressable, Box, Input} from '@/components';

const ListHeader: React.FC = () => {
  const navigation = useAppNavigation();
  const theme = useTheme();

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
        <AntDesign
          name="arrowleft"
          size={theme.sizes.icons.md}
          color={theme.colors.text}
        />
      </BoxPressable>

      <Input
        value={searchExerciseInput}
        onChangeText={text => dispatch(setSearchInput(text))}
        placeholder="Pesquisar exercício"
        textAlign="right"
        boxProps={{flex: 1}}
        rightIcon={
          <AntDesign
            name="search1"
            size={theme.sizes.icons.sm}
            color={theme.colors.darkText}
            style={{marginLeft: '5%'}}
          />
        }
      />
    </Box>
  );
};

export default ListHeader;
