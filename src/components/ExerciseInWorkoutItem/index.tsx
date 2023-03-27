import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import * as S from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Serie from '../Serie';



type Props = {
    item: ExercisesInWorkoutType,
    showCreateSerie: boolean,
    showRest: boolean,
    showDeleteSerieButton: boolean,
    showSucessButton: boolean,
    createSerieFunction?: (exercise: ExercisesInWorkoutType) => void,
    deleteSerieFunction?: (exercise: ExercisesInWorkoutType, serie: number) => void,
    sucessButtonFunction?: (exercise: ExercisesInWorkoutType, serieNumber: number) => void,
    deleteExerciseFuntion?: (exercise: ExercisesInWorkoutType) => void
}

const ExerciseInWorkoutItem: React.FC<Props> = ({ item, showCreateSerie, createSerieFunction, showRest, showDeleteSerieButton, deleteSerieFunction, showSucessButton, sucessButtonFunction, deleteExerciseFuntion }) => {
    const theme = useTheme()

    return (
        <S.Exercise>
            <S.ExerciseHeader>
                <S.ExerciseName>{item.exercise_id}</S.ExerciseName>
                <TouchableOpacity onPressIn={() => deleteExerciseFuntion && deleteExerciseFuntion(item)}>
                    <FontAwesome name='trash' size={theme.sizes.icons.sm} color={theme.colors.alert} />
                </TouchableOpacity>
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
                    <S.CreateNewSerieButton onPressIn={() => createSerieFunction && createSerieFunction(item)}>
                        <S.CreateNewSerieText>+</S.CreateNewSerieText>
                    </S.CreateNewSerieButton>
                ) : <></>}
            />
        </S.Exercise>
    )
}

export default ExerciseInWorkoutItem;