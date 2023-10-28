import React, { memo, useCallback, useImperativeHandle, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { event, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import * as S from './styles'
import { useNavigation } from '@react-navigation/native';
import { useAppNavigation } from '@/hooks/useAppNavigation';


const { height } = Dimensions.get('screen')
const MAX_TRANSLATE_Y = (-height) + 50;


type ScrollToProps = {
    destination: number,
    duration?: number,
    enableEndFuntion?: boolean
}
export type BottomSheetRefProps = {
    scrollTo: ({ destination, duration, enableEndFuntion }: ScrollToProps) => void,
    isVisible: () => boolean,
}

type Props = {
    children: React.ReactNode
    onClose?: () => void
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, Props>(({ children, onClose }, ref) => {
    const animatedHeigh = useSharedValue(height)
    const startValue = useSharedValue({ y: 0 })
    const visible = useSharedValue(false)
    const navigation = useAppNavigation()
    const tab = navigation.getParent('tabBar' as unknown as undefined)


    const scrollTo = useCallback(({ destination, duration, enableEndFuntion }: ScrollToProps) => {
        'worklet'
        animatedHeigh.value = withTiming(destination, { duration: duration || 700 }, (finished) => {
            if (finished) {
                if (onClose && enableEndFuntion) {
                    runOnJS(onClose)()
                }
                if (tab && enableEndFuntion) {
                    runOnJS(tab?.setOptions)({ swipeEnabled: true })
                }
            }
        })
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
            animatedHeigh.value = ev.translationY + startValue.value.y
            animatedHeigh.value = Math.max(animatedHeigh.value, MAX_TRANSLATE_Y)
        })
        .onEnd((ev) => {
            if (animatedHeigh.value > height / 2.5) {
                scrollTo({ destination: height, enableEndFuntion: true })
            }
            else if (animatedHeigh.value < height / 3) {
                scrollTo({ destination: 0 })
            }
        })


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: animatedHeigh.value }]
        }
    })

    useEffect(() => {
        if (visible.value) {
            tab?.setOptions({ swipeEnabled: false })
        }
    }, [visible.value])


    useImperativeHandle(ref, () => ({ scrollTo, isVisible }), [scrollTo, isVisible])

    return (
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
            <S.Container>
                <GestureDetector gesture={gesture}>
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

export default memo(BottomSheet);