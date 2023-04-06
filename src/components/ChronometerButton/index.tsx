import React, { useCallback, useContext, useEffect } from 'react';
import { useTimer } from '../../contexts/TimerContext';
import * as S from './styles'
import { useRealm } from '../../contexts/RealmContext';
import { HistoricType } from '../../models/HistoricType';
import BackgroundService from 'react-native-background-actions';
import { WorkoutType } from '../../models/WorkoutType';
import { ReturnTypeHandleFineshWorkout } from '../../screens/WorkoutSeason';

type Props = {
    handleFineshWorkout: () => Promise<ReturnTypeHandleFineshWorkout>
}

const ChronometerButton: React.FC<Props> = ({ handleFineshWorkout }) => {
    const { startTimer, timer, setTimer, stopBGTimer } = useTimer()
    const { realm } = useRealm()


    useEffect(() => {
        startTimer()
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
        <S.finishWorkout onPressIn={() => handleFineshWorkout().then(async ({ isFinished, workoutCopy }) => {
            if (isFinished && workoutCopy) {
                finishWorkout(timer, workoutCopy )
                await stopBGTimer()
            }
        })}>
            <S.FineshText>Terminar treino {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</S.FineshText>
        </S.finishWorkout>
    )
}

export default ChronometerButton;