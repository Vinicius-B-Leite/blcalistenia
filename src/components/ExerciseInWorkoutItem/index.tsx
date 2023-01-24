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
    createSerieType?: 'workout' | 'exerciseInWorkout'
}

const ExerciseInWorkoutItem: React.FC<Props> = ({ item, createSerieType }) => {
    const theme = useTheme()
    const { createSerie } = useContext(WorkoutContext)

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
                removeClippedSubviews={false}
                extraData={item.series}
                ListHeaderComponent={() => (
                    <S.Row>
                        <S.Title>Série</S.Title>
                        <S.Title>Rep</S.Title>
                        <S.Title>Descanso</S.Title>
                    </S.Row>
                )}
                renderItem={({ item: serie }) => <Serie item={serie} exercise={item} />}
                ListFooterComponent={() => (
                    <S.CreateNewSerieButton onPress={() =>  createSerie(item) }>
                        <S.CreateNewSerieText>+</S.CreateNewSerieText>
                    </S.CreateNewSerieButton>
                )}
            />
        </S.Exercise>
    )
}

export default ExerciseInWorkoutItem;