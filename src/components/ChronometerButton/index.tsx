import React, { useCallback, useContext, useEffect } from 'react';
import { useTimer } from '../../contexts/TimerContext';
import * as S from './styles'
import { useRealm } from '../../contexts/RealmContext';
import { HistoricType } from '../../models/HistoricType';
import { WorkoutSeasonContext } from '../../contexts/WorkooutSeason';
import { WorkoutType } from '../../models/WorkoutType';

type Props = {
    handleFineshWorkout: () => Promise<{
        isFinished: boolean;
        workoutCopy: WorkoutType | undefined;
    }>
}

const ChronometerButton: React.FC<Props> = ({ handleFineshWorkout }) => {
    const { startTimer, timer, stopTimer, setTimer } = useTimer()
    const { realm } = useRealm()

    useEffect(() => {
        if (timer < 0) startTimer()
    }, [])

    const finishWorkout = useCallback((seconds: number, workoutCopy: WorkoutType) => {
        if (realm) {
            realm.write(() => {
                realm.create<HistoricType>('Historic', {
                    workout: JSON.stringify(workoutCopy),
                    date: new Date(),
                    timerInSeconds: seconds,
                    _id: realm.objects('Historic').length + 1
                })
            })
        }
    }, [realm])

    return (
        <S.finishWorkout onPressIn={() => handleFineshWorkout().then(({ isFinished, workoutCopy }) => {
            if (isFinished && workoutCopy) {
                stopTimer()
                setTimer(0)
                finishWorkout(timer, workoutCopy)
            }
        })}>
            <S.FineshText>Terminar treino {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</S.FineshText>
        </S.finishWorkout>
    )
}

export default ChronometerButton;