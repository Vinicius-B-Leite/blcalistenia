import React from 'react';
import * as S from './styles'
import { HistoricType } from '../../models/HistoricType';
import { WorkoutType } from '../../models/WorkoutType';

type Props = {
    item: HistoricType,
    onClick: (item: HistoricType) => void
}

const HistoricItem: React.FC<Props> = ({ item, onClick }) => {
    const { title, exercises }: WorkoutType = JSON.parse(item.workout)
    const day = String(item.date.getDate()).padStart(2, '0')
    const month = String(item.date.getMonth() + 1).padStart(2, '0')
    const year = item.date.getFullYear()

    const seriesLength = exercises[0]?.series?.length
    const firtsRep = exercises[0]?.series[0]?.rep
    const exerciseName = exercises[0]?.exercise_id

    const minutes = String((item.timerInSeconds / 60).toFixed(0)).padStart(2, '0')
    const seconds = String((item.timerInSeconds % 60).toFixed(0)).padStart(2, '0')

    return (
        <S.Container onPressIn={() => {
            onClick({ ...item })
        }}>
            <S.Header>
                <S.Title>{title}</S.Title>
                <S.Date>{day}/{month}/{year}</S.Date>
            </S.Header>

            <S.Time>{minutes}:{seconds}</S.Time>

            <S.FirstExercise>{`${seriesLength}x${firtsRep} - ${exerciseName}`}</S.FirstExercise>
        </S.Container>
    )
}

export default HistoricItem;