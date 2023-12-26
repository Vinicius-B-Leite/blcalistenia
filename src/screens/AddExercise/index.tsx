import React, {useEffect, useRef, useState} from 'react';
import * as S from './styles';
import {useTheme} from 'styled-components';
import {BottomSheetRefProps} from '../../components/BottomSheet';
import BottomSheet from '../../components/BottomSheet';
import CreateExercise from '../../components/CreateExercise';
import FilterExercise from './components/FilterExercise';
import {ExerciseType} from '../../models/ExerciseType';
import {initialsExercises} from '../../utils/initialsExercises';

import ExercisesList from './components/ExercisesList/ExercisesListe';
import {useDispatch} from 'react-redux';
import {setExercises} from '../../features/Exercises/exerciseSlicer';
import ListHeader from './components/Header/ListHeader';
import {exerciseService} from '../../domains/Exercise/exerciseService';
import Container from '@/components/Container/Container';
import Button from '@/components/Button/Button';

export type FilterType = {category: string; muscles: string};

const AddExercise: React.FC = () => {
  const theme = useTheme();

  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const [filterExerciseVisible, setFilterExercciseVisible] = useState(false);

  const openBottomSheet = () => {
    bottomSheetRef?.current?.scrollTo({
      destination: theme.sizes.vh / 8,
      duration: 1000,
    });
  };

  return (
    <>
      <Container>
        <ListHeader />
        <ExercisesList openModal={() => setFilterExercciseVisible(true)} />

        <Button
          label="+"
          width={100}
          height={100}
          borderRadius={'full'}
          style={{position: 'absolute', bottom: 10, right: 10}}
          textPreset="primaryTitle"
          onPress={openBottomSheet}
        />

        <FilterExercise
          modalProps={{
            visible: filterExerciseVisible,
            transparent: true,
            onRequestClose: () => setFilterExercciseVisible(false),
            animationType: 'fade',
          }}
          closeModal={() => setFilterExercciseVisible(false)}
        />
      </Container>
      <BottomSheet ref={bottomSheetRef}>
        <CreateExercise />
      </BottomSheet>
    </>
  );
};

export default AddExercise;
