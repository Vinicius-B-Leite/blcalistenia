import React, { useRef, useState } from 'react';
import { useTheme } from 'styled-components/native';
import CountDown, { CountDownRef } from '../../components/CountDown';
import * as S from './styles'


const WorkoutSeason: React.FC = () => {
    const theme = useTheme()
    const [totalSeconds, setTotalSeconds] = useState(20)
    const countdownRef = useRef<CountDownRef>(null)

    return (
        <S.Container>

            <CountDown ref={countdownRef} totalSeconds={totalSeconds} />

            <S.ButtonsArea>

                <S.Button bg={theme.colors.darkContrast} onPress={() => countdownRef.current?.lessSecond(10)}>
                    <S.ButtonText>- 00:10</S.ButtonText>
                </S.Button>

                <S.Button bg={theme.colors.contrast} onPress={() => countdownRef.current?.addSecond(10)}>
                    <S.ButtonText>+ 00:10</S.ButtonText>
                </S.Button>
            </S.ButtonsArea>
        </S.Container>
    )
}

export default WorkoutSeason;