import React, { useCallback, useImperativeHandle, useLayoutEffect, useState } from 'react';
import { View } from 'react-native'
import { Dimensions } from 'react-native';
import * as S from './styles'
import { Svg, Circle, G, CircleProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useAnimatedProps } from 'react-native-reanimated';



const RADIUS = Dimensions.get('screen').width * 0.10
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type CountDownProps = {
    totalSeconds: number,
    onFineshed?: () => void
}
export type CountDownRef = {
    addSecond: (seconds: number) => void,
    lessSecond: (seconds: number) => void,
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const CountDown = React.forwardRef<CountDownRef, CountDownProps>(({ totalSeconds, onFineshed }, ref) => {
    const theme = useTheme()
    const animatedValue = useSharedValue(0) //0 desc || totalSeconds asc
    const [counter, setCounter] = useState(totalSeconds)
    const [totalTimer, setTotalTimer] = useState(totalSeconds)
    const [forceComponentReRender, setForceComponentReRender] = useState(false)

    const animatedProps = useAnimatedProps((): CircleProps => {
        return {
            strokeDashoffset: animatedValue.value
        }
    })

    const animate = useCallback((timer: number) => {
        const porcentageTimerInTotalSeconds = (timer * 100) / totalSeconds
        const timerPorcentageOfCircumference = (CIRCUMFERENCE * porcentageTimerInTotalSeconds) / 100

        animatedValue.value = withTiming(timerPorcentageOfCircumference, { duration: 1000 })

    }, [])



    useLayoutEffect(() => {
        setTimeout(() => {
            if (counter >= 0) {
                setCounter(old => old - 1)
                animate(totalSeconds - counter)
                setForceComponentReRender(!forceComponentReRender)
            }
            else {
                if (onFineshed) onFineshed()
            }
        }, 1000)


    }, [forceComponentReRender])

    const addSecond = (seconds: number) => {
        setCounter(old => {
            if (old + seconds > totalSeconds) {
                return old
            }
            setTotalTimer(oldT => oldT + seconds)
            return old + seconds
        })

    }

    const lessSecond = (seconds: number) => {
        setCounter(old => {
            setTotalTimer(oldT => oldT - seconds )
            if (old - seconds < 0) {
                return 0
            }
            return old - seconds
        })
    }


    useImperativeHandle(ref, () => ({ addSecond, lessSecond }), [addSecond, lessSecond])

    return (
        <View style={{ position: 'relative', width: '100%', height: '60%' }}>
            <Svg viewBox='0 0 100 80'>
                <G rotation='270' origin={`${RADIUS + 15}, ${RADIUS + 4}`} >
                    <Circle
                        cx='50'
                        cy='40'
                        r={RADIUS}
                        stroke={theme.colors.darkContrast}
                        fill='transparent'
                        strokeWidth={3}
                    />
                    <AnimatedCircle
                        animatedProps={animatedProps}
                        cx='50'
                        cy='40'
                        r={RADIUS}
                        stroke={theme.colors.contrast}
                        fill='transparent'
                        strokeWidth={3}
                        strokeDasharray={CIRCUMFERENCE}
                        strokeLinecap='round'
                    />
                </G>
            </Svg>
            <S.Counter>{String(Math.floor(counter / 60)).padStart(2, '0')}:{String(counter % 60).padStart(2, '0')}</S.Counter>
            <S.TotalTimes>{String(Math.floor(totalTimer / 60)).padStart(2, '0')}:{String(totalTimer % 60).padStart(2, '0')}</S.TotalTimes>
        </View>
    )
})

export default CountDown;