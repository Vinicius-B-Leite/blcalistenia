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
    createSerieFunction: (exercise: exercisesInWorkout) => void,
    showRest: boolean,
    showDeleteSerieButton: boolean,
    deleteSerieFunction: (exercise: exercisesInWorkout, serie: number) => void,
    showSucessButton: boolean,
    sucessButtonFunction: (exercise: exercisesInWorkout, serieNumber: number) => void,
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
            <FlatList
                data={item.series}                  
                extraData={item.series}
                ListHeaderComponent={() => (
                    <S.Row>
                        <S.Title>Série</S.Title>
                        <S.Title>Repetições</S.Title>
                        {showRest ? <S.Title>Descanso(s)</S.Title> : <S.Title>Concluída</S.Title>}
                    </S.Row>
                )}
                renderItem={({ item: serie }) => (
                    <Serie
                        item={serie}
                        exercise={item}
                        deleteSerieButton={showDeleteSerieButton}
                        showRest={showRest}
                        showSucessButton={showSucessButton}
                        sucessButton={() => sucessButtonFunction(item, serie.serie as number)}
                        deleteSerie={(exercise, serie) => deleteSerieFunction(exercise, serie)}
                    />
                )}
                ListFooterComponent={() => showCreateSerie ? (
                    <S.CreateNewSerieButton onPress={() => createSerieFunction(item)}>
                        <S.CreateNewSerieText>+</S.CreateNewSerieText>
                    </S.CreateNewSerieButton>
                ) : <></>}
            />
        </S.Exercise>
    )
}

export default ExerciseInWorkoutItem;