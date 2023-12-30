import React, {memo} from 'react';
import {ExercisesInWorkoutType} from '@/models';

import Serie from '../Serie';
import {useDispatch} from 'react-redux';
import {updateAnotation} from '@/features';

import {useAppSelector, useAppTheme} from '@/hooks';
import {Box, Text, Input} from '@/components';

type Props = {
  item: ExercisesInWorkoutType;
  showDeleteSerieButton?: boolean;
  deleteExerciseBtn?: React.ReactNode;
  createSerieBtn?: React.ReactNode;
};

const ExerciseInWorkoutItem: React.FC<Props> = ({
  item,
  createSerieBtn,
  showDeleteSerieButton,
  deleteExerciseBtn,
}) => {
  const {exercise_id, series, anotation} = item;

  const theme = useAppTheme();

  const dispatch = useDispatch();
  const isWorkingout = useAppSelector(state => state.workout.isWorkingout);

  return (
    <Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={8}>
        <Text preset="pMedium">{exercise_id}</Text>
        {deleteExerciseBtn}
      </Box>
      <Input
        placeholder="Anotação"
        placeholderTextColor={theme.colors.secondText}
        value={anotation}
        onChangeText={txt =>
          dispatch(
            updateAnotation({exerciseID: exercise_id, newAnotation: txt}),
          )
        }
        editable={!!createSerieBtn}
        textPreset="pSmall"
        boxProps={{
          height: 40,
        }}
      />
      <Box flexDirection="row" justifyContent="space-evenly" mt={8}>
        <Box width={90}>
          <Text preset="pSmall" bold textAlign="center">
            Série
          </Text>
        </Box>
        <Box width={90}>
          <Text preset="pSmall" bold textAlign="center">
            Repetições
          </Text>
        </Box>
        <Box width={90}>
          <Text preset="pSmall" bold textAlign="center">
            {isWorkingout ? 'Concluída' : 'Descanso'}
          </Text>
        </Box>
      </Box>
      {series.map(serie => (
        <Serie
          key={serie.serie as React.Key}
          item={serie}
          exercise={item}
          deleteSerieButton={showDeleteSerieButton}
        />
      ))}
      {createSerieBtn}
    </Box>
  );
};

export default memo(ExerciseInWorkoutItem, (p, n) => Object.is(p, n));
