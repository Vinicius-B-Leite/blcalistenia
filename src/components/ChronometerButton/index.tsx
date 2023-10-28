import React from 'react';
import * as S from './styles'
import { useAppSelector } from '@/hooks/useAppSelector';
import useChronometer from './useChronometer';




const ChronometerButton: React.FC = ({ }) => {

    const timer = useAppSelector((state) => state.workout.timer)
    const { handleFinishWorkout, startWorkout } = useChronometer()

    return (
        <S.finishWorkout onPress={() => timer ? handleFinishWorkout(timer) : startWorkout()}>
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