import React, {useEffect, useRef, useState} from 'react';

import {useTheme} from 'styled-components';

import CreateExercise from './components/CreateExercise';
import FilterExercise from './components/FilterExercise';

import ExercisesList from './components/ExercisesList/ExercisesListe';

import ListHeader from './components/Header/ListHeader';

import {Button, Container, BottomSheet, BottomSheetRefProps} from '@/components';

export type FilterType = {category: string; muscles: string};

export const AddExercise: React.FC = () => {
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


