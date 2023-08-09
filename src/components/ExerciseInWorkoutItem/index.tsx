import React, { memo } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import * as S from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Serie from '../Serie';
import { useDispatch, useSelector } from 'react-redux'
import { removeExercise, addSerie, updateAnotation } from '../../features/Workout/workoutSlicer'
import { RootState } from '../../features/store';
import { FlashList } from '@shopify/flash-list';

type Props = {
    item: ExercisesInWorkoutType,
    showCreateSerie?: boolean,
    showDeleteSerieButton?: boolean,
    showDeleteExerciseBtn?: boolean,
}

const ExerciseInWorkoutItem: React.FC<Props> = ({ item, showCreateSerie, showDeleteSerieButton, showDeleteExerciseBtn }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const isWorkingout = useSelector((state: RootState) => state.workout.isWorkingout)
    const exercises = useSelector((state: RootState) => state.workout.workout.exercises)



    return (
        <S.Exercise>
            <S.ExerciseHeader>
                <S.ExerciseName>{item.exercise_id}</S.ExerciseName>
                {
                    showDeleteExerciseBtn &&
                    (
                        <TouchableOpacity onPress={() => dispatch(removeExercise(item))}>
                            <FontAwesome name='trash' size={theme.sizes.icons.sm} color={theme.colors.alert} />
                        </TouchableOpacity>
                    )
                }
            </S.ExerciseHeader>
            <S.ExerciseAnotation
                placeholder='Anotação'
                placeholderTextColor={theme.colors.darkText}
                value={showCreateSerie ? exercises[exercises.findIndex(v => v.exercise_id == item.exercise_id)].anotation : item.anotation}
                onChangeText={(txt) => dispatch(updateAnotation({ exerciseID: item.exercise_id, newAnotation: txt }))}
                editable={showCreateSerie}
            />
            <S.Row>
                <S.Title>Série</S.Title>
                <S.Title>Repetições</S.Title>
                {!isWorkingout && <S.Title>Descanso(s)</S.Title>}
                {isWorkingout && <S.Title>Concluída</S.Title>}
            </S.Row>
            {
                item.series.map(serie => (
                    <Serie
                        key={serie.serie as React.Key}
                        item={serie}
                        exercise={item}
                        deleteSerieButton={showDeleteSerieButton}
                    />
                ))
            }
            {
                showCreateSerie &&
                <S.CreateNewSerieButton onPress={() => dispatch(addSerie(item))}>
                    <S.CreateNewSerieText>+</S.CreateNewSerieText>
                </S.CreateNewSerieButton>
            }

        </S.Exercise >
    )
}

export default memo(ExerciseInWorkoutItem, (p, n) => Object.is(p, n))