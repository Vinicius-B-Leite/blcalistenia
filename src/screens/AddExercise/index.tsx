import React, {useEffect, useRef, useState} from 'react';

import CreateExercise from './components/CreateExercise';
import FilterExercise from './components/FilterExercise';

import ExercisesList from './components/ExercisesList/ExercisesListe';

import ListHeader from './components/Header/ListHeader';

import {Button, Container} from '@/components';
import BottomSheet from '@gorhom/bottom-sheet';
import {useAppTheme} from '@/hooks';

export type FilterType = {category: string; muscles: string};

export const AddExercise: React.FC = () => {
  const theme = useAppTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [filterExerciseVisible, setFilterExercciseVisible] = useState(false);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
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
      <BottomSheet
        style={{
          padding: theme.spacing[14],
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.contrast,
        }}
        backgroundStyle={{
          backgroundColor: theme.colors.primaryBg,
        }}
        enablePanDownToClose
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['50%', '75%']}>
        <CreateExercise
          closeBottomSheet={() => bottomSheetRef.current?.close()}
        />
      </BottomSheet>
    </>
  );
};
