import React from 'react';
import { View } from 'react-native';
import { WorkoutType } from '../../../models/WorkoutType';
import { HistoricType } from '../../../models/HistoricType';
import { FlashList } from '@shopify/flash-list';
import ExerciseInWorkoutItem from '../../../components/ExerciseInWorkoutItem';
import * as S from './styles'



export const HistoricBS = ({ item }: { item: HistoricType }) => {
    const workout: WorkoutType = JSON.parse(item.workout)
    const minutes = String((item.timerInSeconds / 60).toFixed(0)).padStart(2, '0')
    const seconds = String((item.timerInSeconds % 60).toFixed(0)).padStart(2, '0')


    return (
        <S.WorkoutContainer>
            <S.WorkoutHeader>
                <S.WorkoutName>{workout.title}</S.WorkoutName>
                <S.WorkoutTime>{minutes}:{seconds}</S.WorkoutTime>
            </S.WorkoutHeader>
            <S.WorkoutAnotation>{workout.anotation}</S.WorkoutAnotation>
            <FlashList
                data={workout.exercises}
                estimatedItemSize={10}
                nestedScrollEnabled
                renderItem={({ item }) => <ExerciseInWorkoutItem item={item} />}
            />
        </S.WorkoutContainer>
    )

}

