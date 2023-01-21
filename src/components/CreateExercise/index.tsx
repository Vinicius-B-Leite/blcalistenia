import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated';
import * as S from './styles'


const { height } = Dimensions.get('screen')

export type CreateExerciseRefProps = {
    scrollTo: (destination: number, duration: number) => void
}
type CreateExerciseProps = {}

const CreateExercise = React.forwardRef<CreateExerciseRefProps, CreateExerciseProps>(({ }, ref) => {

    const animatedHeigh = useSharedValue(height)
    const startValue = useSharedValue({ y: 0 })

    const scrollTo = useCallback((destination: number, duration?: number) => {
        'worklet'
        animatedHeigh.value = duration ? withTiming(destination, { duration }) : destination
    }, [])

    const gesture = Gesture.Pan()
        .onStart(() => {
            startValue.value = { y: animatedHeigh.value }
        })
        .onUpdate((ev) => {
            console.log("🚀 ~ file: index.tsx:30 ~ .onUpdate ~ ev", animatedHeigh.value)
            if (animatedHeigh.value < 0) {
                scrollTo(0)
            }
            else if (animatedHeigh.value < height) {
                scrollTo(ev.translationY + startValue.value.y)
                scrollTo(Math.max(animatedHeigh.value, -height + 50))
            }
        })
        .onEnd(() => {
            if (animatedHeigh.value < 0) {
                scrollTo(0)
            }
            else if (animatedHeigh.value <= height / 3) {
                scrollTo(0, 1000)
            }
            else if (animatedHeigh.value > height / 1.9) {
                scrollTo(height, 1000)
            }
        })


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: animatedHeigh.value }]
        }
    })

    useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])

    return (
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
            <S.Container>
                <GestureDetector gesture={gesture} >
                    <S.ControllArea>
                        <S.ControllIcon/>
                    </S.ControllArea>
                </GestureDetector>
            </S.Container>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    animatedContainer: {
        height: height,
        width: '100%',
        position: 'absolute',
    }
})

export default CreateExercise;