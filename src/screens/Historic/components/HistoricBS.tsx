import React from 'react';
import { WorkoutType } from '../../../models/WorkoutType';
import { FlashList } from '@shopify/flash-list';
import ExerciseInWorkoutItem from '../../../components/ExerciseInWorkoutItem';
import * as S from './styles'


type HistoricBSProps = {
    workout?: WorkoutType
    timerInSeconds?: number,
} | {
    workout: WorkoutType
    timerInSeconds: number,
}

export const HistoricBS = ({ timerInSeconds, workout }: HistoricBSProps) => {
    if (!timerInSeconds || !workout) return <></>

    const minutes = String((timerInSeconds / 60).toFixed(0)).padStart(2, '0')
    const seconds = String((timerInSeconds % 60).toFixed(0)).padStart(2, '0')


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
                renderItem={({ item }) =>
                    <ExerciseInWorkoutItem item={item} />}
            />
        </S.WorkoutContainer>
    )

}

