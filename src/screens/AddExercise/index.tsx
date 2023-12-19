import React, {useEffect, useRef, useState} from 'react';
import * as S from './styles';
import {useTheme} from 'styled-components';
import {BottomSheetRefProps} from '../../components/BottomSheet';
import BottomSheet from '../../components/BottomSheet';
import CreateExercise from '../../components/CreateExercise';
import FilterExercise from '../../components/FilterExercise';
import {ExerciseType} from '../../models/ExerciseType';
import {initialsExercises} from '../../utils/initialsExercises';
import {useQuery} from '../../services/realm/realm';
import ExercisesList from './components/ExercisesListe';
import {useDispatch} from 'react-redux';
import {setExercises} from '../../features/Exercises/exerciseSlicer';
import ListHeader from './components/ListHeader';
import {exerciseService} from '../../domains/Exercise/exerciseService';

export type FilterType = {category: string; muscles: string};

const AddExercise: React.FC = () => {
  const theme = useTheme();

  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const [filterExerciseVisible, setFilterExercciseVisible] = useState(false);

  return (
    <S.Container>
      <ListHeader />
      <ExercisesList openModal={() => setFilterExercciseVisible(true)} />

      <S.FloatButton
        onPress={() =>
          bottomSheetRef?.current?.scrollTo({
            destination: theme.sizes.vh / 8,
            duration: 1000,
          })
        }>
        <S.FloatButtonIcon>+</S.FloatButtonIcon>
      </S.FloatButton>

      <BottomSheet ref={bottomSheetRef}>
        <CreateExercise />
      </BottomSheet>

      <FilterExercise
        modalProps={{
          visible: filterExerciseVisible,
          transparent: true,
          onRequestClose: () => setFilterExercciseVisible(false),
          animationType: 'fade',
        }}
        closeModal={() => setFilterExercciseVisible(false)}
      />
    </S.Container>
  );
};

export default AddExercise;
