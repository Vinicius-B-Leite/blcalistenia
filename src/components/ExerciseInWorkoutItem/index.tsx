import React, { memo } from 'react';
import { useTheme } from 'styled-components/native';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import * as S from './styles'
import Serie from '../Serie';
import { useDispatch, useSelector } from 'react-redux'
import { updateAnotation } from '../../features/Workout/workoutSlicer'
import { RootState } from '../../features/store';
import { useAppSelector } from '@/hooks/useAppSelector';

type Props = {
    item: ExercisesInWorkoutType,
    showDeleteSerieButton?: boolean,
    deleteExerciseBtn?: React.ReactNode,
    createSerieBtn?: React.ReactNode,
}

const ExerciseInWorkoutItem: React.FC<Props> = ({ item, createSerieBtn, showDeleteSerieButton, deleteExerciseBtn }) => {
    const { exercise_id, series, anotation } = item

    const theme = useTheme()

    const dispatch = useDispatch()
    const isWorkingout = useAppSelector((state) => state.workout.isWorkingout)



    return (
        <S.Exercise>
            <S.ExerciseHeader>
                <S.ExerciseName>{exercise_id}</S.ExerciseName>
                {deleteExerciseBtn}
            </S.ExerciseHeader>
            <S.ExerciseAnotation
                placeholder='Anotação'
                placeholderTextColor={theme.colors.darkText}
                value={anotation}
                onChangeText={(txt) => dispatch(updateAnotation({ exerciseID: exercise_id, newAnotation: txt }))}
                editable={!!createSerieBtn}
            />
            <S.Row>
                <S.Title>Série</S.Title>
                <S.Title>Repetições</S.Title>
                <S.Title>{isWorkingout ? 'Concluída' : 'Descanso(s)'}</S.Title>
            </S.Row>
            {
                series.map(serie => (
                    <Serie
                        key={serie.serie as React.Key}
                        item={serie}
                        exercise={item}
                        deleteSerieButton={showDeleteSerieButton}
                    />
                ))
            }
            {createSerieBtn}

        </S.Exercise >
    )
}

export default memo(ExerciseInWorkoutItem, (p, n) => Object.is(p, n))