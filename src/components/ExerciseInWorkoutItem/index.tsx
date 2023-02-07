import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { exercisesInWorkout } from '../../models/exercisesInWorkout';
import * as S from './styles'
import Entypo from 'react-native-vector-icons/Entypo'
import { ExerciseContext } from '../../contexts/ExerciseContext';
import Serie from '../Serie';
import { WorkoutContext } from '../../contexts/WorkoutContext';



type Props = {
    item: exercisesInWorkout,
    showCreateSerie: boolean,
    showRest: boolean,
    showDeleteSerieButton: boolean,
    showSucessButton: boolean,
    createSerieFunction?: (exercise: exercisesInWorkout) => void,
    deleteSerieFunction?: (exercise: exercisesInWorkout, serie: number) => void,
    sucessButtonFunction?: (exercise: exercisesInWorkout, serieNumber: number) => void,
}

const ExerciseInWorkoutItem: React.FC<Props> = ({ item, showCreateSerie, createSerieFunction, showRest, showDeleteSerieButton, deleteSerieFunction, showSucessButton, sucessButtonFunction }) => {
    const theme = useTheme()

    return (
        <S.Exercise>
            <S.ExerciseHeader>
                <S.ExerciseName>{item.exercise_id}</S.ExerciseName>
                <Entypo name='dots-three-vertical' size={theme.sizes.icons.sm} color={theme.colors.text} />
            </S.ExerciseHeader>
            <S.ExerciseAnotation
                placeholder='Anotação'
                placeholderTextColor={theme.colors.darkText}
            />
            <S.Row>
                <S.Title>Série</S.Title>
                <S.Title>Repetições</S.Title>
                {showRest && <S.Title>Descanso(s)</S.Title>} 
                {showSucessButton && <S.Title>Concluída</S.Title>}
            </S.Row>
            <FlatList
                data={item.series}
                extraData={item.series}
                renderItem={({ item: serie }) => (
                    <Serie
                        item={serie}
                        exercise={item}
                        deleteSerieButton={showDeleteSerieButton}
                        showRest={showRest}
                        showSucessButton={showSucessButton}
                        sucessButton={() => sucessButtonFunction && sucessButtonFunction(item, serie.serie as number)}
                        deleteSerie={(exercise, serie) => deleteSerieFunction && deleteSerieFunction(exercise, serie)}
                    />
                )}
                ListFooterComponent={() => showCreateSerie ? (
                    <S.CreateNewSerieButton onPress={() => createSerieFunction && createSerieFunction(item)}>
                        <S.CreateNewSerieText>+</S.CreateNewSerieText>
                    </S.CreateNewSerieButton>
                ) : <></>}
            />
        </S.Exercise>
    )
}

export default ExerciseInWorkoutItem;