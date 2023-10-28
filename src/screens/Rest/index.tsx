import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { Vibration } from 'react-native'
import CountDown, { CountDownRef } from '../../components/CountDown';
import { RootStackParamList, TabParamList } from '../../routes/Models';
import * as S from './styles'
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppNavigation } from '@/hooks/useAppNavigation';

type Route = RouteProp<RootStackParamList, 'Rest'>

const Rest: React.FC = () => {
    const { totalSeconds } = useRoute<Route>().params
    const navigation = useAppNavigation()

    const countDownRef = useRef<CountDownRef>(null)

    const increaseSecondsInCountdown = () => {
        countDownRef.current?.addSecond(10)
    }

    const decreaseSecondsInCountdown = () => {
        countDownRef.current?.lessSecond(10)
    }

    const onChronometerFineshed = () => {
        navigation.goBack()
    }
    return (
        <S.Container>
            <CountDown totalSeconds={totalSeconds as number} ref={countDownRef} onFineshed={onChronometerFineshed} />

            <S.ButtonsContainer>
                <S.CountDownButton bg='contrast' onPress={increaseSecondsInCountdown}>
                    <S.CountDownButtonText>{'+ 10s'}</S.CountDownButtonText>
                </S.CountDownButton>

                <S.CountDownButton bg='darkContrast' onPress={decreaseSecondsInCountdown}>
                    <S.CountDownButtonText>{'- 10s'}</S.CountDownButtonText>
                </S.CountDownButton>
            </S.ButtonsContainer>
        </S.Container>
    )
}

export default Rest;