import { StackScreenProps } from '@react-navigation/stack';
import React, {  useRef, useEffect } from 'react';
import CountDown, { CountDownRef } from '../../components/CountDown';
import { useTabBar } from '../../contexts/TabBarContext';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'

type NavigationPropsType = StackScreenProps<RootStackParamList, 'Rest'>
const Rest: React.FC<NavigationPropsType> = ({ route, navigation }) => {

    const { hideTabBar, showTabBar } = useTabBar()

    useEffect(() => {
        hideTabBar()

        return () => showTabBar()
    }, [])
    const countDownRef = useRef<CountDownRef>(null)

    const increaseSecondsInCountdown = () => {
        countDownRef.current?.addSecond(10)
    }

    const decreaseSecondsInCountdown = () => {
        countDownRef.current?.lessSecond(10)
    }

    return (
        <S.Container>
            <CountDown totalSeconds={route.params.totalSeconds as number} ref={countDownRef} onFineshed={() => navigation.goBack()} />

            <S.ButtonsContainer>
                <S.CountDownButton bg='contrast' onPressIn={increaseSecondsInCountdown}>
                    <S.CountDownButtonText>{'+ 10s'}</S.CountDownButtonText>
                </S.CountDownButton>

                <S.CountDownButton bg='darkContrast' onPressIn={decreaseSecondsInCountdown}>
                    <S.CountDownButtonText>{'- 10s'}</S.CountDownButtonText>
                </S.CountDownButton>
            </S.ButtonsContainer>
        </S.Container>
    )
}

export default Rest;