import React, { useCallback, useImperativeHandle } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import * as S from './styles'


const { height } = Dimensions.get('screen')

export type BottomSheetRefProps = {
    scrollTo: (destination: number, duration: number) => void,
    isVisible: () => boolean
}

type Props = {
    children: React.ReactNode
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, Props>(({ children }, ref) => {
    const animatedHeigh = useSharedValue(height)
    const startValue = useSharedValue({ y: 0 })
    const visible = useSharedValue(false)

    const scrollTo = useCallback((destination: number, duration?: number) => {
        'worklet'
        animatedHeigh.value = duration ? withTiming(destination, { duration }) : destination
        visible.value = animatedHeigh.value == height
    }, [])

    const isVisible = useCallback(() => {
        return visible.value
    }, [])

    const gesture = Gesture.Pan()
        .onStart(() => {
            startValue.value = { y: animatedHeigh.value }
        })
        .onUpdate((ev) => {
            if (animatedHeigh.value < 0) {
                scrollTo(0, 500)
            }
            else if (animatedHeigh.value < height) {
                scrollTo((ev.translationY + startValue.value.y))
                scrollTo(Math.max(animatedHeigh.value, -height + 50))
            }
        })
        .onEnd((ev) => {
            if (animatedHeigh.value <= height / 4 || ev.velocityX <= -height / 2) {
                scrollTo(0, 500)
            }
            else if (animatedHeigh.value > height / 3.5 || ev.velocityY > height) {
                scrollTo(height, 500)
            }
        })


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: animatedHeigh.value }]
        }
    })

    useImperativeHandle(ref, () => ({ scrollTo, isVisible }), [scrollTo, isVisible])

    return (
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
            <S.Container>
                <GestureDetector gesture={gesture} >
                    <S.ControllArea>
                        <S.ControllIcon />
                    </S.ControllArea>
                </GestureDetector>

                {
                    children
                }
            </S.Container>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    animatedContainer: {
        height: height,
        width: '100%',
        position: 'absolute',
        zIndex: 5
    }
})

export default BottomSheet;