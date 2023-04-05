import React, { memo, useCallback } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import * as S from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Serie from '../Serie';
import { SerieType } from '../../models/SerieType';
import FlashList from '@shopify/flash-list/dist/FlashList';



type Props = {
    item: ExercisesInWorkoutType,
    showCreateSerie: boolean,
    showDeleteExerciseBtn?: boolean,
    showRest: boolean,
    showDeleteSerieButton: boolean,
    showSucessButton: boolean,
    createSerieFunction?: (exercise: ExercisesInWorkoutType) => void,
    deleteSerieFunction?: (exercise: ExercisesInWorkoutType, serie: number) => void,
    sucessButtonFunction?: (currentExercise: ExercisesInWorkoutType, serieNumber: number) => boolean,
    deleteExerciseFuntion?: (exercise: ExercisesInWorkoutType) => void,
    updateSerie?: (serieNumber: number, exercise: ExercisesInWorkoutType, newSerie: SerieType) => void,
    changeSerie?: (currentExercise: ExercisesInWorkoutType, serieNumber: number, newSerie: SerieType) => void
}

const ExerciseInWorkoutItem: React.FC<Props> = ({ item, showCreateSerie, createSerieFunction, showRest, showDeleteSerieButton, deleteSerieFunction, showSucessButton, sucessButtonFunction, deleteExerciseFuntion, changeSerie, updateSerie, showDeleteExerciseBtn }) => {
    const theme = useTheme()

    const handleSucessButton = useCallback((serie: number) => {
        let isDone = false
        if (sucessButtonFunction) {
            isDone = sucessButtonFunction(item, serie)
        }
        return isDone
    }, [])

    const handleDeleteSerie = useCallback((e: ExercisesInWorkoutType, serie: number) => {
        if (deleteSerieFunction) {
            deleteSerieFunction(e, serie)
        }
    }, [])


    

    return (
        <S.Exercise>
            <S.ExerciseHeader>
                <S.ExerciseName>{item.exercise_id}</S.ExerciseName>
                {showDeleteExerciseBtn && (<TouchableOpacity onPressIn={() => deleteExerciseFuntion && deleteExerciseFuntion(item)}>
                    <FontAwesome name='trash' size={theme.sizes.icons.sm} color={theme.colors.alert} />
                </TouchableOpacity>)}
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
                nestedScrollEnabled
                renderItem={({ item: serie }) => (
                    <Serie
                        item={serie}
                        exercise={item}
                        deleteSerieButton={showDeleteSerieButton}
                        showRest={showRest}
                        showSucessButton={showSucessButton}
                        sucessButton={handleSucessButton}
                        deleteSerie={handleDeleteSerie}
                        updateSerie={updateSerie}
                        changeSerie={changeSerie}
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

export default memo(ExerciseInWorkoutItem, (p, n) => p?.item?.series?.length !== n?.item?.series?.length)