import React, {useEffect, useRef, useState} from 'react';

import CreateExercise from './components/CreateExercise';
import FilterExercise from './components/FilterExercise';

import ExercisesList from './components/ExercisesList/ExercisesListe';

import ListHeader from './components/Header/ListHeader';

import {Button, Container} from '@/components';
import BottomSheet from '@gorhom/bottom-sheet';
import {useAppTheme} from '@/hooks';
import {useForm} from 'react-hook-form';
import {FilterExerciseSchema} from './schema';

export type FilterType = {category: string; muscles: string};

export const AddExercise: React.FC = () => {
  const theme = useAppTheme();
  const {control, watch} = useForm<FilterExerciseSchema>({
    defaultValues: {
      category: '',
      exerciseName: '',
      muscle: '',
    },
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [filterExerciseVisible, setFilterExercciseVisible] = useState(false);
  const [bottomsheetIsVisible, setBottomsheetIsVisible] = useState(false);

  const openBottomSheet = () => {
    setBottomsheetIsVisible(true);
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <Container
        bg={bottomsheetIsVisible ? 'secondBg' : 'thirdBg'}
        opacity={bottomsheetIsVisible ? 0.5 : 1}>
        <ListHeader control={control} />
        <ExercisesList
          exerciseNameSearched={watch('exerciseName')}
          openModal={() => setFilterExercciseVisible(true)}
        />

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
          control={control}
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
          backgroundColor: theme.colors.thirdBg,
        }}
        onClose={() => setBottomsheetIsVisible(false)}
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
