import React, { useCallback, useContext, useEffect } from 'react';
import { useTimer } from '../../contexts/TimerContext';
import * as S from './styles'
import { useRealm } from '../../contexts/RealmContext';
import { HistoricType } from '../../models/HistoricType';
import { WorkoutSeasonContext } from '../../contexts/WorkooutSeason';

type Props = {
    handleFineshWorkout: () => Promise<boolean>
}

const ChronometerButton: React.FC<Props> = ({ handleFineshWorkout }) => {
    const { startTimer, timer, stopTimer } = useTimer()
    const { realm } = useRealm()
    const { workoutCopy, setWorkoutCopy } = useContext(WorkoutSeasonContext)

    useEffect(() => {
        startTimer()
    }, [])

    const finishWorkout = useCallback((seconds: number) => {
        if (realm) {
            realm.write(() => {
                realm.create<HistoricType>('Historic', {
                    workout: JSON.stringify(workoutCopy),
                    date: new Date(),
                    timerInSeconds: seconds,
                    _id: realm.objects('Historic').length + 1
                })
            })

            setWorkoutCopy(undefined)
        }
    }, [realm])

    return (
        <S.finishWorkout onPressIn={() => handleFineshWorkout().then(isFinish => {
            if (isFinish) {
                stopTimer()
                finishWorkout(timer)
            }
        })}>
            <S.FineshText>Terminar treino {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</S.FineshText>
        </S.finishWorkout>
    )
}

export default ChronometerButton;