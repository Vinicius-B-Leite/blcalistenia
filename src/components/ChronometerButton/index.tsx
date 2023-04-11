import React from 'react';
import * as S from './styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
    startWorkout: () => Promise<void>,
    finishWorkout: (seconds: number) => void
}

const ChronometerButton: React.FC<Props> = ({ startWorkout, finishWorkout }) => {
    const timer = useSelector((state: RootState) => state.workout.timer)

    return (
        <S.finishWorkout onPressIn={() => timer ? finishWorkout(Number(timer)) : startWorkout()}>
            {
                timer ? (
                    <S.FineshText>Terminar treino {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</S.FineshText>
                )
                    : (
                        <S.FineshText>Iniciar treino</S.FineshText>
                    )
            }
        </S.finishWorkout>
    )
}

export default ChronometerButton;